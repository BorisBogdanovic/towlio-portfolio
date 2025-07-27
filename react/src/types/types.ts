import { ReactNode } from "react";

export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
}

export type LoginFormInputs = {
    email: string;
    password: string;
};

export type ModalProps = {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: ReactNode;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: "main" | "delete" | "secondary" | "small" | "refresh";
    children?: ReactNode;
};
