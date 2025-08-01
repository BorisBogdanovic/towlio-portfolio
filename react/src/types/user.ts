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

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface Filters {
    city?: number | null;
    status?: number | null;
    search?: string;
    page?: number;
}

export type UpdateUserResponse = {
    status: boolean;
    data: User;
    message: string;
    user: User;
};

export interface UpdatePasswordInput {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface UpdatePasswordResponse {
    status: boolean;
    message: string;
}

export interface DeleteUserResponse {
    message: string;
}

export interface SettingsFormValues {
    name: string;
    last_name: string;
    phone: string;
    email: string;
    city_id: number | null;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
