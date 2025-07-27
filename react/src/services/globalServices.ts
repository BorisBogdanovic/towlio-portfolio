import { API_URL } from "../services/apiConfig";
///////////////////////////////////////////////////////////////////////// GET CITIES
export const fetchCities = async () => {
    try {
        const response = await fetch(`${API_URL}/cities`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch cities");
        }
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message || "Unexpected error fetching cities");
        }
        throw new Error("Unknown error fetching cities");
    }
};
///////////////////////////////////////////////////////////////////////// GET STATUSES
export const fetchStatuses = async () => {
    try {
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(
                err.message || "Unexpected error fetching statuses"
            );
        }
        throw new Error("Unknown error fetching statuses");
    }
};
