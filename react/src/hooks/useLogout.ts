import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../services/authServices";
import { logout } from "../features/Auth/authSlice";
import { RootState } from "../App/store";

export const useLogout = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    return useMutation({
        mutationFn: () => logoutApi(token!),
        onSuccess: () => {
            dispatch(logout());
        },
        onError: (error) => {
            console.error("Logout failed:", error);
            dispatch(logout());
        },
    });
};
