import { useForm } from "react-hook-form";
import { InvitePayload } from "../../types/types";
import { useSendInvite } from "../../hooks/useSendInvite";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import Loader from "../../Ui/Loader";
import PhoneHelerUi from "../../Ui/PhoneHelerUi";

function InviteForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InvitePayload>();

    const { mutate: sendInvite, isPending: isLoading } = useSendInvite();

    const onSubmit = (data: InvitePayload) => {
        sendInvite(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-2xl gap-2 m-4"
        >
            <div className="flex justify-between">
                <span className="text-sm text-textGray leading-5">Name*</span>
                <div>
                    <Input
                        placeholder="Enter new member's name"
                        className="w-sm"
                        {...register("name", { required: "Name is required" })}
                    />
                    <div className="text-sm text-bdoRed mt-1">
                        {errors.name ? errors.name.message : "\u00A0"}
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-textGray leading-5">
                    Last Name*
                </span>
                <div>
                    <Input
                        placeholder="Enter new member's last name"
                        className="w-sm"
                        {...register("last_name", {
                            required: "Last name is required",
                        })}
                    />

                    <div className="text-sm text-bdoRed mt-1">
                        {errors.last_name ? errors.last_name.message : "\u00A0"}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <span className="text-sm text-textGray leading-5">
                    Email Addres*
                </span>
                <div>
                    <Input
                        placeholder="Enter new member's email address"
                        className="w-sm"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />

                    <div className="text-sm text-bdoRed mt-1">
                        {errors.email ? errors.email.message : "\u00A0"}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <span className="text-sm text-textGray leading-5">
                    Phone Number*
                </span>
                <div>
                    <Input
                        placeholder="Enter new member's phone number"
                        className="w-sm "
                        icon={<PhoneHelerUi />}
                        {...register("phone", {
                            required: "Phone number is required",
                        })}
                    />
                    <div className="text-sm text-bdoRed mt-1">
                        {errors.phone ? errors.phone.message : "\u00A0"}
                    </div>
                </div>
            </div>

            <div className="w-[200px]">
                <Button htmlType="submit" type="main">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                        {isLoading ? (
                            <Loader wClass="w-4" hClass="h-4" />
                        ) : (
                            <HiOutlinePlusSmall className="w-5 h-5" />
                        )}
                        {isLoading ? "Sending invite..." : "Send invite"}
                    </span>
                </Button>
            </div>
        </form>
    );
}

export default InviteForm;
