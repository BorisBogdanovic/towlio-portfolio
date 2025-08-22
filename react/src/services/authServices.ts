import { API_URL } from "../services/apiConfig";
import {
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
    ResetPasswordData,
} from "../types/auth";

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
////////////////////////////////////////////////////////////////////// REGISTER
export async function registerUser({
    token,
    ...registerData
}: RegisterPayload): Promise<RegisterResponse> {
    try {
        const response = await fetch(`${API_URL}/register/${token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Unexpected registration error");
        } else {
            throw new Error("An unknown error occurred during registration.");
        }
    }
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

    return await response.json();
};
///////////////////////////////////////////////////////////////////////// FORGOT PASSWORD
export const sendResetLink = async (
    email: string
): Promise<{ status: string }> => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.status || "Unable to send reset link.");
    }

    return data;
};
///////////////////////////////////////////////////////////////////////// RESET PASSWORD
export async function resetForgotPassword(data: ResetPasswordData) {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                password_confirmation: data.password,
                token: data.token,
            }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Password reset failed");
        }
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Network error");
        }
    }
}
