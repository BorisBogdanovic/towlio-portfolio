import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import Logo from "../../Ui/Logo";
import Button from "../../Ui/Button";
import Input from "../../Ui/Input";
import Loader from "../../Ui/Loader";
import FormName from "../../Ui/FormName";
import FormDescription from "../../Ui/FormDescription";
import { useLogin } from "../../hooks/useLogin";
import { LoginFormInputs } from "../../types/auth";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const { mutate: login, isPending } = useLogin();

    const onSubmit = (data: LoginFormInputs) => {
        login(data);
    };

    return (
        <div className="w-[560px] relative z-10 bg-white flex-col items-center justify-center rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] py-4 px-20">
            <div className="pt-4 pb-8 px-7">
                <div className="py-8 flex justify-center">
                    <Logo />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center gap-2 w-full"
                >
                    <div className="flex flex-col items-center mb-8">
                        <FormName>Log in</FormName>
                        <FormDescription>
                            Welcome back! Please enter your credentials.
                        </FormDescription>
                    </div>

                    <div className="w-full">
                        <Input
                            placeholder="Email"
                            type="email"
                            id="email"
                            icon={<HiEnvelope color="#667085" size={24} />}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter valid Email",
                                },
                            })}
                        />
                        <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                            {errors.email?.message || "\u00A0"}
                        </span>
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            icon={<HiLockClosed color="#667085" size={24} />}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="focus:outline-none cursor-pointer"
                                >
                                    {showPassword ? (
                                        <HiEyeSlash color="#667085" size={24} />
                                    ) : (
                                        <HiEye color="#667085" size={24} />
                                    )}
                                </button>
                            }
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                            {errors.password?.message || "\u00A0"}
                        </span>
                    </div>

                    <Link
                        className="ml-auto text-sm leading-5 font-medium text-textGray mb-2 hover:underline transition duration-300"
                        to="/forgot-password"
                    >
                        Forgot password?
                    </Link>

                    <Button htmlType="submit" type="main" disabled={isPending}>
                        {isPending ? (
                            <div className="flex items-center justify-center gap-2">
                                <span>Signing in...</span>
                                <Loader wClass="w-4" hClass="h-4" />
                            </div>
                        ) : (
                            "Log in"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
