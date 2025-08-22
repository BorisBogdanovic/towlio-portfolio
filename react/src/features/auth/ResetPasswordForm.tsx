import {
    HiArrowLongLeft,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
} from "react-icons/hi2";
import FormDescription from "../../Ui/FormDescription";
import FormName from "../../Ui/FormName";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { validatePassword } from "../../utils/validatePassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetForgotPassword } from "../../hooks/useResetForgotPassword";
import toast from "react-hot-toast";

type FormValues = {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
};

function ResetPasswordForm() {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token") || "";
    const emailFromUrl = params.get("email") || "";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            email: emailFromUrl,
            token: tokenFromUrl,
        },
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate: resetForgotPassword, isPending } = useResetForgotPassword();

    const onSubmit = (data: FormValues) => {
        resetForgotPassword(
            {
                email: data.email,
                password: data.newPassword,
                password_confirmation: data.confirmPassword,
                token: data.token,
            },
            {
                onSuccess: () => {
                    toast.success("Password reset successful! Please login.");
                    navigate("/login");
                },
                onError: (error: any) => {
                    toast.error(error?.message || "Something went wrong");
                },
            }
        );
    };

    return (
        <form
            className="flex flex-col items-center gap-6 max-w-md mx-auto p-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center mb-8 text-center">
                <FormName>New password</FormName>
                <FormDescription>
                    Enter your new password. If you reached this screen by
                    mistake, please return to the login page.
                </FormDescription>
            </div>

            <Input
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                    },
                    validate: (val) =>
                        validatePassword(val) ||
                        "Password does not meet criteria",
                })}
                icon={<HiLockClosed color="#667085" size={24} />}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="focus:outline-none"
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? (
                            <HiEyeSlash color="#667085" size={24} />
                        ) : (
                            <HiEye color="#667085" size={24} />
                        )}
                    </button>
                }
            />
            {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                </p>
            )}

            <Input
                placeholder="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (val) =>
                        val === watch("newPassword") ||
                        "Passwords do not match",
                })}
                icon={<HiLockClosed color="#667085" size={24} />}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="focus:outline-none"
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? (
                            <HiEyeSlash color="#667085" size={24} />
                        ) : (
                            <HiEye color="#667085" size={24} />
                        )}
                    </button>
                }
            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                </p>
            )}

            <div className="w-full flex flex-col gap-3 mt-6">
                <Button type="main" htmlType="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Create a password"}
                </Button>
                <Button
                    type="secondary"
                    onClick={() => navigate("/login")}
                    htmlType="button"
                >
                    <HiArrowLongLeft />
                    Back to login
                </Button>
            </div>
        </form>
    );
}

export default ResetPasswordForm;
