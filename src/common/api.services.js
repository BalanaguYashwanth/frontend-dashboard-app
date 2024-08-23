import { API_URL } from "./constants";

export const fetchPatientRecords = async () => {
    const response = await fetch(`${API_URL}/fetchPatientRecords`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data;
}