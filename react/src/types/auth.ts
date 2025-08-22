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

//Forms
export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordData {
    email: string;
    password: string;
    token: string;
    password_confirmation: string;
}
