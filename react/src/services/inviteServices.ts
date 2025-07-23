import { API_URL } from "../services/apiConfig";
import {
    InviteCheckResponse,
    InvitePayload,
    InviteResponse,
} from "../types/types";
import { getAuthToken } from "../utils/auth";

const authToken = getAuthToken();
///////////////////////////////////////////////////////////////////////// SEND INVITE
export const inviteUser = async (
    payload: InvitePayload
): Promise<InviteResponse> => {
    const response = await fetch(`${API_URL}/invite-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to send invite.");
    }

    return data;
};

///////////////////////////////////////////////////////////////////////// CHECK INVITE
export const checkInviteToken = async (
    token: string
): Promise<InviteCheckResponse> => {
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
};

///////////////////////////////////////////////////////////////////////// RESEND INVITE
export async function resendInvite(email: string) {
    const authToken = getAuthToken();
    if (!authToken) throw new Error("User not authenticated");
    const response = await fetch(`${API_URL}/invite-resend/${email}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to resend invite");
    }
    const data = await response.json();

    return data;
}
