import { useQuery } from "@tanstack/react-query";
import { checkInviteToken } from "../services/inviteServices";

export const useCheckInviteToken = (token: string) => {
    return useQuery({
        queryKey: ["checkInviteToken", token],
        queryFn: () => checkInviteToken(token),
        retry: false,
    });
};
