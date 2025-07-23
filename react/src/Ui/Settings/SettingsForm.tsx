import { useState } from "react";
import Button from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
// import { useForm } from "react-hook-form";
import { useEditUser } from "../../hooks/useEditUser";
import ChangeImageButton from "../ChangeImageButton";
import toast from "react-hot-toast";

function SettingsForm() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        user?.profile_image || null
    );

    // const { handleSubmit } = useForm();

    const { mutate, isPending } = useEditUser();

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!newProfileImage) return;

        const formData = new FormData();
        formData.append("profile_image", newProfileImage);

        mutate(formData, {
            onSuccess: () => {
                setNewProfileImage(null);
                toast.success("Profile image updated successfully!");
            },
            onError: (error) => {
                toast.error(
                    "Failed to update profile image. Please try again."
                );

                console.error(error);
            },
        });
    };

    const handleImageSelect = (file: File) => {
        setNewProfileImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
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
                        <ChangeImageButton onFileSelect={handleImageSelect} />
                    </div>
                </div>
            </div>

            <div className="w-[150px]">
                <Button type="main" htmlType="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save changes"}
                </Button>
            </div>
        </form>
    );
}

export default SettingsForm;
