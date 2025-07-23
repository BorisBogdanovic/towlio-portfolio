export function getAuthToken(): string | null {
    const auth = localStorage.getItem("auth");

    if (!auth) return null;

    try {
        const parsed = JSON.parse(auth);
        return parsed?.token || null;
    } catch (error) {
        console.error("Invalid auth object in localStorage:", error);
        return null;
    }
}
