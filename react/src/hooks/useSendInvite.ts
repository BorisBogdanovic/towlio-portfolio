import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { inviteUser } from "../services/inviteServices";

interface InviteError {
    message: string;
}

export const useSendInvite = () => {
    return useMutation({
        mutationFn: inviteUser,
        onSuccess: () => {
            toast.success("Invite sent successfully!");
        },
        onError: (error: InviteError) => {
            toast.error(error.message || "Failed to send invite");
        },
    });
};
