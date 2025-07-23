import { HiOutlineArrowPath, HiTrash } from "react-icons/hi2";
import Button from "../../Ui/Button";
import { User } from "../../types/types";
import { useState } from "react";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import toast from "react-hot-toast";
import Modal from "../../Ui/Modal";
import { useResendInvite } from "../../hooks/useResendInvite";

interface SingleUserProps {
    user: User;
}

function SingleUser({ user }: SingleUserProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: deleteUser, isPending } = useDeleteUser();
    const { mutate: resendInvite, isPending: isResending } = useResendInvite();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDeleteConfirm = () => {
        deleteUser(user.id, {
            onSuccess: () => {
                toast.success("User deleted successfully");
                closeModal();
            },
            onError: (error: any) => {
                toast.error(error.message || "Failed to delete user");
                closeModal();
            },
        });
    };

    const handleResendInvite = () => {
        if (isResending) return; // sigurnosna zaštita
        resendInvite(user.email, {
            onSuccess: () => toast.success("Invitation resent"),
            onError: (error: any) =>
                toast.error(error.message || "Failed to resend invite"),
        });
    };

    return (
        <>
            <div className="border border-disabledBorderGray rounded-md p-4 ">
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`py-1 px-2 rounded-full flex items-center justify-center
                            ${
                                user.status_id === 2
                                    ? "bg-pendingBg text-pendingText"
                                    : ""
                            }
                            ${
                                user.status_id === 1
                                    ? "bg-activeBg text-activeText"
                                    : ""
                            }
                        `}
                    >
                        {user.status?.name}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="small" onClick={openModal}>
                            <HiTrash className="text-textGray" />
                        </Button>

                        {user.status_id === 2 && (
                            <Button
                                type="small"
                                onClick={handleResendInvite}
                                disabled={isResending}
                            >
                                {isResending ? (
                                    <HiOutlineArrowPath className="animate-spin text-textGray" />
                                ) : (
                                    <HiOutlineArrowPath className="text-textGray" />
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 mx-auto">
                    <div className="h-14 w-14 rounded-full">
                        <img
                            src={user.profile_image}
                            className="h-14 w-14 rounded-full object-cover"
                            alt="Profile"
                        />
                    </div>
                    <div className="flex gap-1">
                        <span className="text-lg leading-6 text-textGray font-medium first-letter:uppercase">
                            {user.name}
                        </span>
                        <span className="text-lg leading-6 text-textGray font-medium first-letter:uppercase">
                            {user.last_name}
                        </span>
                    </div>
                    <div className="text-lg leading-6 text-textLightGray">
                        <span>{user.city?.name}</span>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Delete User"
                message={`Are you sure you want to delete ${user.name} ${user.last_name}?`}
                confirmText={isPending ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={handleDeleteConfirm}
                onCancel={closeModal}
            />
        </>
    );
}

export default SingleUser;
