import { API_URL } from "./constants";

export const fetchPatientRecords = async () => {
    const response = await fetch(`${API_URL}/api-v2/fetchPatientRecords`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data;
}