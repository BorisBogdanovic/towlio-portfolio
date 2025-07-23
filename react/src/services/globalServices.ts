import { API_URL } from "../services/apiConfig";
///////////////////////////////////////////////////////////////////////// GET CITIES
export const fetchCities = async () => {
    const response = await fetch(`${API_URL}/cities`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch cities");
    }
    const data = await response.json();

    return data;
};
///////////////////////////////////////////////////////////////////////// GET STATUSES
export const fetchStatuses = async () => {
    const response = await fetch(`${API_URL}/statuses`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch statuses");
    }
    const data = await response.json();
    return data;
};
