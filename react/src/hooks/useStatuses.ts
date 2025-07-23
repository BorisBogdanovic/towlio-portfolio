import { useQuery } from "@tanstack/react-query";
import { fetchStatuses } from "../services/globalServices";

export const useStatuses = () => {
    return useQuery({
        queryKey: ["statuses"],
        queryFn: () => fetchStatuses(),
    });
};
