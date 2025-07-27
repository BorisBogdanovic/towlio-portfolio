import { User } from "./user";

export interface InvitePayload {
    email: string;
    name: string;
    last_name: string;
    phone: string;
}

export interface InvitedUser {
    id: number;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    token: string;
    created_at: string;
}

export interface InviteResponse {
    message: string;
    status: string;
    data: InvitedUser;
    user: User;
    token: string;
}

export interface InviteCheckResponse {
    message: string;
    status: boolean;
    data?: InvitedUser;
}

export interface ResendInviteResponse {
    message: string;
    data: ResentInviteUserData;
}

export interface ResentInviteUserData {
    id: number;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    token: string;
}

export interface InviteError {
    message: string;
}
