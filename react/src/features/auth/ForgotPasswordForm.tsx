import { HiArrowLongLeft, HiEnvelope } from "react-icons/hi2";
import FormDescription from "../../Ui/FormDescription";
import FormName from "../../Ui/FormName";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import Loader from "../../Ui/Loader";

function ForgotPasswordForm() {
    const navigate = useNavigate();
    type FormValues = {
        email: string;
    };
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { mutate: resetPassword, isPending } = useForgotPassword(() => {
        reset();
        navigate("/login");
    });
    const onSubmit = ({ email }: { email: string }) => {
        resetPassword(email);
    };

    return (
        <form
            className="flex flex-col items-center gap-6 "
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center mb-8">
                <FormName>Forgot your password</FormName>
                <FormDescription>
                    Please enter the email address you used during registration
                    so that we can send you instructions to reset your password.
                </FormDescription>
            </div>
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

            <div className="w-full flex flex-col gap-3">
                <Button type="main" htmlType="submit" disabled={isPending}>
                    {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                            <span>Sending...</span>
                            <Loader wClass="w-4" hClass="h-4" />
                        </div>
                    ) : (
                        "Send reset link"
                    )}
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

export default ForgotPasswordForm;
