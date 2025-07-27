import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUser as updateUserAction } from "../features/auth/authSlice";
import { updateUser as updateUserService } from "../services/userServices";
import { UpdateUserResponse } from "../types/user";

export const useEditUser = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<UpdateUserResponse, Error, FormData>({
        mutationFn: (formData) => updateUserService(formData),

        onSuccess: (data) => {
            if (data && data.user) {
                dispatch(updateUserAction(data.user));
            }

            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: (error) => {
            console.error("Failed to update user", error.message);
        },
    });
};
