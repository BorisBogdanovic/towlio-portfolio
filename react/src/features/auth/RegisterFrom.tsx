import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { RegisterFormData } from "../../types/types";
import { useRegister } from "../../hooks/useRegister";
////////////////////////////////////////////////////////////////////////////////
import Button from "../../Ui/Button";
import RegisterDropdown from "../../Ui/RegisterDropdown";
import FormDescription from "../../Ui/FormDescription";
import FormName from "../../Ui/FormName";
import Input from "../../Ui/Input";
import Logo from "../../Ui/Logo";
import Loader from "../../Ui/Loader";
import { useCheckInviteToken } from "../../hooks/useCheckInviteToken";
import { HiEnvelope, HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import FullPageSpinner from "../../Ui/FullPageSpinner";
////////////////////////////////////////////////////////////////////////////////
function RegisterFrom() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [cityError, setCityError] = useState<string | null>(null);
    const [checkboxError, setCheckboxError] = useState<string | null>(null);
    const { email, name, last_name, token } = useParams();
    const navigate = useNavigate();
    const registerMutation = useRegister();
    const isLoading = registerMutation.isPending;

    const {
        register,
        watch,
        formState: { errors },
        trigger,
        handleSubmit,
    } = useForm<RegisterFormData>();

    const passwordValue = watch("password");
    const confirmPasswordValue = watch("password_confirmation");

    useEffect(() => {
        if (confirmPasswordValue) {
            trigger("password_confirmation");
        }
    }, [passwordValue, confirmPasswordValue, trigger]);

    const { data, error, isPending } = useCheckInviteToken(token ?? "");

    if (!token) {
        return <Navigate to="/link-expired" replace />;
    }

    if (isPending) return <FullPageSpinner />;

    if (!data?.status || error) {
        return <Navigate to="/link-expired" replace />;
    }

    const onSubmit = (data: RegisterFormData) => {
        let isValid = true;

        if (!selectedCity) {
            setCityError("Please select a city");
            isValid = false;
        } else {
            setCityError(null);
        }

        if (!isChecked) {
            setCheckboxError("You must agree to the Legal & Privacy terms");
            isValid = false;
        } else {
            setCheckboxError(null);
        }

        if (!isValid || !token) return;

        registerMutation.mutate(
            {
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                city: selectedCity!,
                token,
            },
            {
                onSuccess: () => navigate("/login"),
            }
        );
    };

    return (
        <div className="w-[560px] relative z-10 bg-white flex-col items-center justify-center rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] py-4 px-20">
            <div className="pt-4 pb-8 px-7">
                <div className="py-8 flex justify-center">
                    <Logo />
                </div>

                <form
                    className="flex flex-col items-center gap-2 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormName>Welcome to Towlio</FormName>
                    <FormDescription>
                        Welcome to the Towlio platform,{" "}
                        <span className="font-bold">
                            {name} {last_name}
                        </span>
                        ! Please create your password to access your account.
                    </FormDescription>
                    <div className="w-full mt-10">
                        <Input
                            placeholder="Email"
                            type="email"
                            id="email"
                            value={email}
                            disabled
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
                        <div className="w-full ">
                            <Input
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                icon={
                                    <HiLockClosed color="#667085" size={24} />
                                }
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <HiEyeSlash
                                                color="#667085"
                                                size={24}
                                            />
                                        ) : (
                                            <HiEye color="#667085" size={24} />
                                        )}
                                    </button>
                                }
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                                {errors.password?.message || "\u00A0"}
                            </span>
                        </div>
                        <div className="w-full">
                            <Input
                                placeholder="Confirm password"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                icon={
                                    <HiLockClosed color="#667085" size={24} />
                                }
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="focus:outline-none"
                                    >
                                        {showConfirmPassword ? (
                                            <HiEyeSlash
                                                color="#667085"
                                                size={24}
                                            />
                                        ) : (
                                            <HiEye color="#667085" size={24} />
                                        )}
                                    </button>
                                }
                                {...register("password_confirmation", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === passwordValue ||
                                        "Passwords do not match",
                                })}
                            />
                            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                                {errors.password_confirmation?.message ||
                                    "\u00A0"}
                            </span>

                            <RegisterDropdown
                                selectedValue={selectedCity}
                                onSelect={(id) => {
                                    setSelectedCity(id);
                                    setCityError(null);
                                }}
                            />
                            {cityError && (
                                <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                                    {cityError}
                                </span>
                            )}
                            <div className="w-full mt-4">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={isChecked}
                                        onChange={() => {
                                            setIsChecked(!isChecked);
                                            setCheckboxError(null);
                                        }}
                                    />
                                    <p className="text-[14px] font-regular leading-[20px] text-[#344054] mb-[20px]">
                                        <span>
                                            Slazem se sa svim izjavama navedenim
                                            u
                                        </span>
                                        {/* <Link to={"/privacy-policy"}>
                                            <span className="text-primary hover:underline ml-[5px]">
                                                Legal & Privacy
                                            </span>
                                        </Link> */}
                                        <a
                                            href="/privacy-policy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="text-primary hover:underline ml-[5px]">
                                                Legal & Privacy
                                            </span>
                                        </a>
                                    </p>
                                </div>
                                {checkboxError && (
                                    <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
                                        {checkboxError}
                                    </span>
                                )}
                            </div>

                            <Button htmlType="submit" type="main">
                                <span className="flex items-center gap-2 whitespace-nowrap">
                                    {isLoading ? (
                                        <Loader wClass="w-4" hClass="h-4" />
                                    ) : null}
                                    {isLoading
                                        ? "Creating account..."
                                        : "Register"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterFrom;
