import { InputHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    type?: "main" | "delete" | "secondary" | "small" | "refresh";
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    htmlType?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export interface Item {
    id: number | string;
    name: string;
}

export interface DropDownProps {
    array: Item[];
    placeholder: string;
    selectedValue: number | null;
    onSelect: (val: number | null) => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
    inputClassName?: string;
}

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
    icon: string;
    confirmDisabled?: boolean;
};
