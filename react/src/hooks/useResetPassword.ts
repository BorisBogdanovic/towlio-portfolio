import { useMutation } from "@tanstack/react-query";
import { sendResetLink } from "../services/authServices";
import toast from "react-hot-toast";

export function useResetPassword(onSuccessCallback?: () => void) {
    return useMutation({
        mutationFn: (email: string) => sendResetLink(email),
        onSuccess: () => {
            toast.success(
                "We've sent you an email with instructions to reset your password.",
                {
                    duration: 5000,
                }
            );
            onSuccessCallback?.();
        },
        onError: (error: unknown) => {
            const err = error as Error;
            toast.error(
                err.message || "Something went wrong. Please try again."
            );
        },
    });
}
