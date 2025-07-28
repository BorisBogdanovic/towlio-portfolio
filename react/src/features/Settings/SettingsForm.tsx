import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { RootState } from "../../App/store";
import { useEditUser } from "../../hooks/useEditUser";
import { useUpdatePassword } from "../../hooks/useEditPassword";
import Button from "../../Ui/Button";
import ChangeImageButton from "../../Ui/ChangeImageButton";
import Input from "../../Ui/Input";
import RegisterDropdown from "../../Ui/RegisterDropdown";
import Modal from "../../Ui/Modal";
import Loader from "../../Ui/Loader";
import PhoneHelerUi from "../../Ui/PhoneHelperUi";
import passwordImg from "../../assets/images/password.png";
import { validatePassword } from "../../utils/validatePassword";
import { SettingsFormValues } from "../../types/user";

function SettingsForm() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [showCurrentPassword, setShowCurrentPassword] =
        useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] =
        useState<boolean>(false);
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        user?.profile_image || null
    );

    //////////////////////////////////////////////////////////REACT QUERY
    const { mutate, isPending } = useEditUser();
    const { mutate: editPassword, isPending: isChangingPassword } =
        useUpdatePassword();

    //////////////////////////////////////////////////////////REACT FROM HOOK
    const { register, handleSubmit, setValue, watch, getValues, reset } =
        useForm<SettingsFormValues>({
            defaultValues: {
                name: user?.name || "",
                last_name: user?.last_name || "",
                phone: user?.phone || "",
                email: user?.email || "",
                city_id: user?.city_id ? Number(user.city_id) : null,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
        });

    const currentPassword = watch("currentPassword");
    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    const isChangePasswordDisabled =
        !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword ||
        !validatePassword(newPassword);

    //////////////////////////////////////////////////// CHECK IF THE FORM FIELDS AND PROFILE IMAGE REMAIN UNCHANGE
    const watchedName = watch("name");
    const watchedLastName = watch("last_name");
    const watchedPhone = watch("phone");
    const watchedCityId = watch("city_id");

    const isFormUnchanged =
        watchedName === user?.name &&
        watchedLastName === user?.last_name &&
        watchedPhone === user?.phone &&
        watchedCityId === (user?.city_id ? Number(user.city_id) : null) &&
        !newProfileImage;

    /////////////////////////////////////////////////////////////////////////////////////////
    const selectedCity = watch("city_id");
    //////////////////////////////////////////////////////////////////////////////SUBMIT FORM
    const onSubmit = handleSubmit((formValues) => {
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("last_name", formValues.last_name);
        formData.append("phone", formValues.phone);
        formData.append("city_id", String(formValues.city_id));
        formData.append("_method", "PATCH");
        if (newProfileImage) {
            formData.append("profile_image", newProfileImage);
        }
        mutate(formData, {
            onSuccess: () => {
                setNewProfileImage(null);
                toast.success("Profile updated successfully!");
            },
            onError: (error) => {
                toast.error("Failed to update profile. Please try again.");
                console.error(error);
            },
        });
    });
    /////////////////////////////////////////////////////////////////DISPLAY SELECTED IMAGE
    const handleImageSelect = (file: File) => {
        setNewProfileImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    ////////////////////////////////////////////////////////////////EDITING PASSWORD

    const handlePasswordChange = () => {
        const { currentPassword, newPassword, confirmPassword } = getValues();

        if (!currentPassword || !newPassword || !confirmPassword) return;
        if (newPassword !== confirmPassword) return;
        if (!validatePassword(newPassword)) return;

        editPassword(
            {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            },
            {
                onSuccess: () => {
                    setIsPasswordModalOpen(false);
                    reset({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                },
            }
        );
    };
    /////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <form className="flex flex-col w-2xl gap-4 m-4" onSubmit={onSubmit}>
                {/* //////////////////////////////////////////////////////////////IMAGE */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Profile Image
                    </span>
                    <div className="flex justify-between items-center gap-2 w-sm">
                        <div className="w-16 h-16 shrink-0 rounded-full border-2 border-[#ECECEC] overflow-hidden">
                            <img
                                src={previewUrl ?? ""}
                                alt="profile"
                                className="w-full h-full object-cover aspect-square"
                            />
                        </div>
                        <div>
                            <ChangeImageButton
                                onFileSelect={handleImageSelect}
                            />
                        </div>
                    </div>
                </div>

                {/* //////////////////////////////////////////////////////////////CITY */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        City
                    </span>
                    <div className="w-sm">
                        <RegisterDropdown
                            selectedValue={selectedCity}
                            onSelect={(id) => setValue("city_id", id)}
                        />
                    </div>
                </div>
                {/* //////////////////////////////////////////////////////////////NAME */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Name
                    </span>
                    <div>
                        <Input className="w-sm" {...register("name")} />
                    </div>
                </div>
                {/* //////////////////////////////////////////////////////////////LAST NAME */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Last Name
                    </span>
                    <div>
                        <Input className="w-sm" {...register("last_name")} />
                    </div>
                </div>
                {/* //////////////////////////////////////////////////////////////PHONE */}

                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Phone
                    </span>
                    <div>
                        <Input
                            icon={<PhoneHelerUi />}
                            className="w-sm"
                            {...register("phone")}
                        />
                    </div>
                </div>
                {/* //////////////////////////////////////////////////////////////EMAIl */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Email
                    </span>
                    <div>
                        <Input
                            className="w-sm"
                            {...register("email")}
                            inputClassName="bg-secondaryHover text-textLightGray border-iconColor focus:outline-none focus:ring-0 focus:border-iconColor"
                            readOnly
                        />
                    </div>
                </div>
                {/* //////////////////////////////////////////////////////////////PASSWORD */}
                <div className="flex justify-between">
                    <span className="text-sm text-textGray leading-5">
                        Password
                    </span>
                    <div className="flex items-center gap-2 w-sm">
                        <Input
                            value={"****************"}
                            readOnly
                            inputClassName="text-textLightGray border-disabledBorderGray focus:outline-none focus:ring-0 focus:border-disabledBorderGray"
                        />
                        <div>
                            <Button
                                type="main"
                                onClick={() => {
                                    setIsPasswordModalOpen(true);
                                }}
                            >
                                Change
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-[150px]">
                    <Button
                        type="main"
                        htmlType="submit"
                        disabled={isPending || isFormUnchanged}
                    >
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader wClass="w-4" hClass="h-4" />
                                <span> Saving...</span>
                            </div>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                </div>
            </form>
            {/* //////////////////////////////////////////////////////////////MODAL*/}
            <Modal
                isOpen={isPasswordModalOpen}
                title="Change Password"
                confirmText={
                    isChangingPassword ? (
                        <div className="flex items-center gap-2">
                            <Loader wClass="w-4" hClass="h-4" />
                            <span> ...changing </span>
                        </div>
                    ) : (
                        "Change Password"
                    )
                }
                icon={passwordImg}
                cancelText="Cancel"
                message="Password: min 8 chars, uppercase, lowercase, number & special char."
                onConfirm={handlePasswordChange}
                onCancel={() => {
                    setIsPasswordModalOpen(false);
                    reset({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                }}
                type="main"
                confirmDisabled={isChangePasswordDisabled}
            >
                <Input
                    placeholder="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
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
                    id="newPassword"
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
                    id="confirmPassword"
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
            </Modal>
        </>
    );
}

export default SettingsForm;
