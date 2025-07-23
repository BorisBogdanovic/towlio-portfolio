import { HiEnvelope } from "react-icons/hi2";
import { HiArrowLongLeft } from "react-icons/hi2";
import FormDescription from "../Ui/FormDescription";
import FormName from "../Ui/FormName";
import Input from "../Ui/Input";
import Logo from "../Ui/Logo";
import Button from "../Ui/Button";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <div className="relative z-10 w-[560px] bg-white  flex-col items-center justify-center rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] py-4 px-20">
            <div className="pt-4 pb-8 px-7">
                <div className="py-8 flex justify-center">
                    <Logo />
                </div>
                <form className="flex flex-col items-center gap-6 ">
                    <div className="flex flex-col items-center mb-8">
                        <FormName>Forgot your password</FormName>
                        <FormDescription>
                            Please enter the email address you used during
                            registration so that we can send you instructions to
                            reset your password.
                        </FormDescription>
                    </div>
                    <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        icon={<HiEnvelope color="#667085" size={24} />}
                    />

                    <div className="w-full flex flex-col gap-3">
                        <Button type="main">Reset password</Button>
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
            </div>
        </div>
    );
}

export default ForgotPassword;
