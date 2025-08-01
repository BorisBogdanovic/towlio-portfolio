import { useState } from "react";
import Input from "../../Ui/Input";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { validatePassword } from "../../utils/validatePassword";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../hooks/useEditPassword";
import Button from "../../Ui/Button";
import Loader from "../../Ui/Loader";
import { PasswordFormData } from "../../types/user";

function EditPasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const [showCurrentPassword, setShowCurrentPassword] =
        useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const { register, handleSubmit, watch, reset } =
        useForm<PasswordFormData>();
    const { mutate: editPassword, isPending: isChangingPassword } =
        useUpdatePassword();

    const onSubmit = (data: PasswordFormData) => {
        if (data.newPassword !== data.confirmPassword) return;
        if (!validatePassword(data.newPassword)) return;

        editPassword(
            {
                current_password: data.currentPassword,
                password: data.newPassword,
                password_confirmation: data.confirmPassword,
            },
            {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            }
        );
    };

    /////////////////////////////////////////////////////////
    const currentPassword = watch("currentPassword");
    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    const isChangePasswordDisabled =
        !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword ||
        !validatePassword(newPassword);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 w-sm mx-auto">
                <Input
                    placeholder="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    {...register("currentPassword", { required: true })}
                    icon={<HiLockClosed color="#667085" size={24} />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() =>
                                setShowCurrentPassword((prev) => !prev)
                            }
                            className="focus:outline-none"
                        >
                            {showCurrentPassword ? (
                                <HiEyeSlash color="#667085" size={24} />
                            ) : (
                                <HiEye color="#667085" size={24} />
                            )}
                        </button>
                    }
                />
                <Input
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword", {
                        required: true,
                        minLength: 8,
                        validate: (val) => validatePassword(val),
                    })}
                    icon={<HiLockClosed color="#667085" size={24} />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="focus:outline-none"
                        >
                            {showPassword ? (
                                <HiEyeSlash color="#667085" size={24} />
                            ) : (
                                <HiEye color="#667085" size={24} />
                            )}
                        </button>
                    }
                />
                <Input
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                        required: true,
                        validate: (val) =>
                            val === watch("newPassword") ||
                            "Passwords do not match",
                    })}
                    icon={<HiLockClosed color="#667085" size={24} />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            className="focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <HiEyeSlash color="#667085" size={24} />
                            ) : (
                                <HiEye color="#667085" size={24} />
                            )}
                        </button>
                    }
                />
            </div>

            <div className="px-4 py-3 flex items-center justify-end gap-3 bg-sectionBg border-t border-disabledBorderGray mt-6">
                <div className="w-[150px]">
                    <Button
                        type="secondary"
                        onClick={() => {
                            reset();
                            onSuccess();
                        }}
                    >
                        Cancel
                    </Button>
                </div>

                <div className="w-[150px]">
                    <Button
                        type="main"
                        htmlType="submit"
                        disabled={isChangePasswordDisabled}
                    >
                        {isChangingPassword ? (
                            <div className="flex items-center gap-2">
                                <Loader wClass="w-4" hClass="h-4" />
                                <span>...changing</span>
                            </div>
                        ) : (
                            "Change Password"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default EditPasswordForm;
