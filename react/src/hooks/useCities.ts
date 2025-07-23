import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../services/globalServices";

export const useCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: () => fetchCities(),
    });
};
