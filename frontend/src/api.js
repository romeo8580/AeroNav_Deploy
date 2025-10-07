const API_URL = 'https://aeronav-deploy-27.onrender.com';

export async function fetchFlights() {
    try {
        const res = await fetch(${API_URL}/api/flights);
        if (!res.ok) throw new Error('Failed to fetch flights');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchTerminalMap() {
    try {
        const res = await fetch(${API_URL}/api/terminalMap);
        if (!res.ok) throw new Error('Failed to fetch terminal map');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
