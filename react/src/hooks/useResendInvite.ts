import { useMutation } from "@tanstack/react-query";
import { resendInvite } from "../services/inviteServices";

import toast from "react-hot-toast";

export function useResendInvite() {
    return useMutation({
        mutationFn: resendInvite,
        onSuccess: () => {
            toast.success("Invite resent successfully!");
        },
        onError: (error: unknown) => {
            const err = error as Error;
            toast.error(err.message || "Failed to resend invite");
        },
    });
}
