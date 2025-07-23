import { useMutation } from "@tanstack/react-query";
import { login as loginService } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            dispatch(setCredentials({ user: data.data, token: data.token }));

            localStorage.setItem(
                "auth",
                JSON.stringify({ user: data.data, token: data.token })
            );
            navigate("/");

            toast.success(
                `Welcome, ${data.data.name} ${data.data.last_name}! We’re glad to have you here.`
            );
        },
        onError: (err) => {
            toast.error(err.message || "Login failed");
        },
    });
};
