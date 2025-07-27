import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Registration successful!");
            navigate("/login");
        },
        onError: (err) => {
            toast.error(err.message || "Registration failed");
        },
    });
};
