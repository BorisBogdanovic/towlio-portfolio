// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchUsers } from "../services/userServices";
import { RootState } from "../App/store";

export const useUsers = () => {
    const { page, city, status, search } = useSelector(
        (state: RootState) => state.user
    );

    return useQuery({
        queryKey: ["users", { page, city, status, search }],
        queryFn: () => fetchUsers({ page, city, status, search }),
    });
};
