import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authServices";
import { RegisterPayload } from "../types/types";

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterPayload) => registerUser(data),
    });
};
