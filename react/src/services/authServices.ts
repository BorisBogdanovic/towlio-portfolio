import { API_URL } from "../services/apiConfig";
import {
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
} from "../types/types";

///////////////////////////////////////////////////////////////////////// LOGIN

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed.");
    }

    return data;
};
///////////////////////////////////////////////////////////////////////// REGISTER
export async function registerUser({
    token,
    ...registerData
}: RegisterPayload): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/register/${token}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(registerData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
    }
    const data = response.json();

    console.log(data);
    return data;
}
///////////////////////////////////////////////////////////////////////// LOGOUT
export const logoutApi = async (token: string) => {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to logout");
    }
    return response.json();
};
