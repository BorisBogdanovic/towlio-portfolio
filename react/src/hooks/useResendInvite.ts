import { useMutation } from "@tanstack/react-query";
import { resendInvite } from "../services/inviteServices";

export function useResendInvite() {
    return useMutation({
        mutationFn: resendInvite,
    });
}
