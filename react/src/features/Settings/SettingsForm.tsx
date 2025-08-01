import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RootState } from "../../App/store";
import { useEditUser } from "../../hooks/useEditUser";
import Button from "../../Ui/Button";
import ChangeImageButton from "../../Ui/ChangeImageButton";
import Input from "../../Ui/Input";
import RegisterDropdown from "../../Ui/RegisterDropdown";
import Loader from "../../Ui/Loader";
import PhoneHelerUi from "../../Ui/PhoneHelperUi";
import { SettingsFormValues } from "../../types/user";
import ChangePasswordModal from "../../Ui/ChangePasswordModal";
import passwordImg from "../../assets/images/password.png";

import EditPasswordForm from "./EditPasswordForm";

function SettingsForm() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isPasswordModalOpen, setIsPasswordModalOpen] =
        useState<boolean>(false);
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        user?.profile_image || null
    );

    //////////////////////////////////////////////////////////REACT QUERY
    const { mutate, isPending } = useEditUser();

    //////////////////////////////////////////////////////////REACT FROM HOOK
    const { register, handleSubmit, setValue, watch } =
        useForm<SettingsFormValues>({
            defaultValues: {
                name: user?.name || "",
                last_name: user?.last_name || "",
                phone: user?.phone?.startsWith("+381")
                    ? user.phone.replace("+381", "")
                    : user?.phone || "",
                email: user?.email || "",
                city_id: user?.city_id ? Number(user.city_id) : null,
            },
        });
    //////////////////////////////////////////////////// CHECK IF THE FORM FIELDS AND PROFILE IMAGE REMAIN UNCHANGE
    const watchedName = watch("name");
    const watchedLastName = watch("last_name");
    const watchedPhone = watch("phone");
    const watchedCityId = watch("city_id");

    const normalizePhone = (phone: string) =>
        phone.startsWith("+381") ? phone.replace("+381", "") : phone;

    const isFormUnchanged =
        watchedName === user?.name &&
        watchedLastName === user?.last_name &&
        normalizePhone(watchedPhone || "") ===
            normalizePhone(user?.phone || "") &&
        watchedCityId === (user?.city_id ? Number(user.city_id) : null) &&
        !newProfileImage;

    /////////////////////////////////////////////////////////////////////////////////////////
    const selectedCity = watch("city_id");
    //////////////////////////////////////////////////////////////////////////////SUBMIT FORM

    /////////////////////////////////////////////////////////////////DISPLAY SELECTED IMAGE
    const handleImageSelect = (file: File) => {
        setNewProfileImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const onSubmit = (formValues: SettingsFormValues) => {
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
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <form
                className="flex flex-col w-2xl gap-4 m-4"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                                htmlType="button"
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
                    <Button type="main" disabled={isFormUnchanged}>
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
            <ChangePasswordModal
                onCancel={() => {
                    setIsPasswordModalOpen(false);
                }}
                isOpen={isPasswordModalOpen}
                icon={passwordImg}
                title="Change Password"
                message="Password: min 8 chars, uppercase, lowercase, number & special char."
            >
                <EditPasswordForm
                    onSuccess={() => setIsPasswordModalOpen(false)}
                />
            </ChangePasswordModal>
        </>
    );
}

export default SettingsForm;
