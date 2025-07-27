import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { inviteUser } from "../services/inviteServices";
import { InviteError } from "../types/invite";

export const useSendInvite = () => {
    return useMutation({
        mutationFn: inviteUser,
        retry: false,
        onSuccess: () => {
            toast.success("Invite sent successfully!");
        },
        onError: (error: unknown) => {
            const err = error as InviteError;
            toast.error(err.message || "Failed to send invite");
        },
    });
};
