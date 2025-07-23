import { ReactNode } from "react";

export interface Status {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    phone: string;
    profile_image: string;
    status_id: number;
    city_id: number;
    created_at: string;
    updated_at: string;
}

export interface InvitePayload {
    email: string;
    name: string;
    last_name: string;
    phone: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    data: User;
}

export interface RegisterPayload {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
    city: number;
}

export type RegisterResponse = {
    message: string;
    user: User;
};

export interface InviteResponse {
    message: string;
    status: string;
    data: {
        id: number;
        email: string;
        name: string;
        last_name: string;
        phone: string;
        token: string;
        created_at: string;
    };
    User: User;
    Token: string;
}

export interface Filters {
    city?: number | null;
    status?: number | null;
    search?: string;
    page?: number;
}

export type LoginFormInputs = {
    email: string;
    password: string;
};

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface InviteData {
    id: number;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    token: string;
}

export interface InviteCheckResponse {
    message: string;
    status: boolean;
    data?: InviteData;
}

export type ModalProps = {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: "main" | "delete" | "secondary" | "small" | "refresh";
    children?: ReactNode;
};

export type UpdateUserResponse = {
    status: boolean;
    data: User;
    message: string;
    user: User;
};
