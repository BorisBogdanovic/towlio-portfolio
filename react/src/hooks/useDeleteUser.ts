import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/userServices";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.error("Failed to delete user:", error.message);
            } else {
                console.error("Failed to delete user:", error);
            }
        },
    });
};
