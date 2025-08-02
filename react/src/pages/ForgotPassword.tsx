import Logo from "../Ui/Logo";

import ForgotPasswordForm from "../features/Auth/ForgotPasswordForm";

function ForgotPassword() {
    return (
        <div className="relative z-10 w-[560px] bg-white  flex-col items-center justify-center rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] py-4 px-20">
            <div className="pt-4 pb-8 px-7">
                <div className="py-8 flex justify-center">
                    <Logo />
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    );
}

export default ForgotPassword;
