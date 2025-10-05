# AeroNav Deployment Instructions

## Render Deployment
1. Go to https://render.com → New → Web Service.
2. Connect your GitHub repo.
3. Root directory: `/`
4. Build Command: `cd server && npm install`
5. Start Command: `node server/server.js`
6. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=4000`
   - `REVENUECAT_API_KEY=<your_key>`
   - `REVENUECAT_WEBHOOK_SECRET=<your_secret>`
7. Deploy and use the URL in RevenueCat webhooks.

## Heroku Deployment
1. `heroku create aeronav-server`
2. `heroku config:set NODE_ENV=production PORT=4000 REVENUECAT_API_KEY="<your_key>" REVENUECAT_WEBHOOK_SECRET="<your_secret>"`
3. Push repo: `git push heroku main`

## GitHub Actions + EAS Build
1. Push a tag `v1.0.0` to trigger workflow.
2. Make sure GitHub Secrets are set:
   - `EAS_TOKEN`
   - `EAS_PROJECT_ID`
3. Workflow will build Android & iOS apps and attach APK/IPA to GitHub Release.