import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { useLogout } from "../../hooks/useLogout";
import Loader from "../Loader";

type SidebarUserInfoProps = {
    name: string;
    profile_image: string;
    last_name: string;
};

function SidebarUserInfo({
    name,

    last_name,
    profile_image,
}: SidebarUserInfoProps) {
    const { mutate: logout, isPending } = useLogout();

    return (
        <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                    <img
                        src={profile_image}
                        alt="profile"
                        className="w-full h-full object-cover aspect-square"
                    />
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#344054] text-sm leading-5">
                        {name}
                    </span>
                    <span className="text-[#344054] text-sm leading-5">
                        {last_name}
                    </span>
                </div>
            </div>
            <button
                className="cursor-pointer flex items-center gap-2"
                onClick={() => logout()}
                disabled={isPending}
                aria-busy={isPending}
            >
                {isPending ? (
                    <Loader wClass="w-4" hClass="h-4" />
                ) : (
                    <HiArrowRightStartOnRectangle className="text-iconColor w-6 h-6" />
                )}
            </button>
        </div>
    );
}

export default SidebarUserInfo;
