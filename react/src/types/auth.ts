import { User } from "./user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
    city: number;
}

// Responses
export interface LoginResponse {
    token: string;
    data: User;
}

export interface RegisterResponse {
    message: string;
    user: User;
}
