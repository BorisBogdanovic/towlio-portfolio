import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../services/authServices";
import { ResetPasswordData } from "../types/auth";

type ResetPasswordResponse = {
    message: string;
};

export function useResetForgotPassword() {
    return useMutation<ResetPasswordResponse, Error, ResetPasswordData>({
        mutationFn: (data) => resetForgotPassword(data),
    });
}
