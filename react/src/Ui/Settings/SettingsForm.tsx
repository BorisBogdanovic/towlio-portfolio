import { useState } from "react";
import Button from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
// import { useForm } from "react-hook-form";
import { useEditUser } from "../../hooks/useEditUser";
import ChangeImageButton from "../ChangeImageButton";
import toast from "react-hot-toast";
import Input from "../Input";
import { useForm } from "react-hook-form";
import RegisterDropdown from "../RegisterDropdown";
import Modal from "../Modal";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";

function SettingsForm() {
    const user = useSelector((state: RootState) => state.auth.user);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] =
        useState<boolean>(false);
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        user?.profile_image || null
    );

    const { mutate, isPending } = useEditUser();
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            name: user?.name || "",
            last_name: user?.last_name || "",
            phone: user?.phone || "",
            email: user?.email || "",
            city_id: user?.city_id ? Number(user.city_id) : null,
        },
    });
    const selectedCity = watch("city_id");
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

    const handleImageSelect = (file: File) => {
        setNewProfileImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <>
            {" "}
            <form className="flex flex-col w-2xl gap-4 m-4" onSubmit={onSubmit}>
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
                            onSelect={(id) => setValue("city_id", id as number)}
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
                        <Input className="w-sm" {...register("phone")} />
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
                    <Button type="main" htmlType="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save changes"}
                    </Button>
                </div>
            </form>
            <Modal
                isOpen={isPasswordModalOpen}
                title="Change Password"
                message="Change Password"
                confirmText="Change Password"
                cancelText="Cancel"
                onConfirm={() => {
                    console.log("Nova lozinka:", newPassword);
                    console.log("Potvrda lozinke:", confirmPassword);
                }}
                onCancel={() => {
                    setIsPasswordModalOpen(false);
                    setConfirmPassword("");
                    setNewPassword("");
                }}
                type="main"
            >
                <Input
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
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
