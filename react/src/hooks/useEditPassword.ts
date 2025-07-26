import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/userServices";
import { UpdatePasswordInput, UpdatePasswordResponse } from "../types/types";
import toast from "react-hot-toast";

export function useUpdatePassword() {
    return useMutation<UpdatePasswordResponse, Error, UpdatePasswordInput>({
        mutationFn: updatePassword,
        onSuccess: (data) => {
            toast.success(data.message || "Password updated successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update password");
        },
    });
}
