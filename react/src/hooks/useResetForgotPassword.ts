import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../services/authServices";
import { ResetPasswordData } from "../types/auth";

export function useResetForgotPassword() {
    return useMutation<any, Error, ResetPasswordData>({
        mutationFn: (data) => resetForgotPassword(data),
    });
}
