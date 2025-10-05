name: EAS Build & Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install -g eas-cli jq
      - name: Authenticate with EAS
        env:
          EAS_TOKEN: ${{ secrets.EAS_TOKEN }}
        run: |
          eas whoami || echo "$EAS_TOKEN" | eas login --token
      - name: Start EAS build (Android & iOS)
        id: start_build
        run: |
          eas build --platform all --profile production --non-interactive --json > build.json
          cat build.json
          echo "BUILD_ID=$(jq -r '.id // .buildId // .build.id' build.json)" >> $GITHUB_ENV
      - name: Wait for build to finish
        run: |
          eas build:view --non-interactive $BUILD_ID --wait --json > build_info.json
          cat build_info.json
      - name: Download artifact
        run: |
          ART_URL=$(jq -r '.artifacts[0].url // .artifacts.android[0].url // .artifacts.ios[0].url' build_info.json)
          echo "Downloading: $ART_URL"
          curl -L -o app-release "$ART_URL"
      - name: Create GitHub Release
        id: create_release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ github.ref_name }}
          name: AeroNav ${{ github.ref_name }}
          body: "Automatic build from EAS Cloud."
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Upload artifact to release
        uses: actions/upload-release-asset@v1
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./app-release
          asset_name: aeronav-${{ github.ref_name }}.apk
          asset_content_type: application/vnd.android.package-archive
