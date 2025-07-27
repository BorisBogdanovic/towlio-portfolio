import { API_URL } from "../services/apiConfig";
import {
    InviteCheckResponse,
    InvitePayload,
    InviteResponse,
    ResendInviteResponse,
} from "../types/invite";
import { getAuthToken } from "../utils/auth";
///////////////////////////////////////////////////////////////////////// SEND INVITE
export const inviteUser = async (
    payload: InvitePayload
): Promise<InviteResponse> => {
    const authToken = getAuthToken();

    const response = await fetch(`${API_URL}/invite-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("Server error: Invalid JSON response.");
    }
    if (!response.ok) {
        throw new Error(data?.message || "Failed to send invite.");
    }
    return data;
};
///////////////////////////////////////////////////////////////////////// CHECK INVITE
export const checkInviteToken = async (
    token: string
): Promise<InviteCheckResponse> => {
    try {
        const response = await fetch(`${API_URL}/check-invite/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to check invite token.");
        }
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(
                err.message || "Unexpected error checking invite token"
            );
        }
        throw new Error("Unknown error checking invite token");
    }
};
///////////////////////////////////////////////////////////////////////// RESEND INVITE
export async function resendInvite(
    email: string
): Promise<ResendInviteResponse> {
    const authToken = getAuthToken();
    if (!authToken) throw new Error("User not authenticated");
    try {
        const response = await fetch(`${API_URL}/invite-resend/${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to resend invite");
        }

        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message || "Unexpected error resending invite");
        }
        throw new Error("Unknown error resending invite");
    }
}
