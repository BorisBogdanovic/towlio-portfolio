import { HiOutlineBell } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";

function NotificationBar() {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="w-[360px] flex justify-end items-center gap-2.5">
            <HiOutlineBell className="h-5 w-5 text-iconColor" />
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-[#ECECEC]">
                {user && (
                    <img
                        src={user.profile_image}
                        alt="profile"
                        className="w-full h-full object-cover aspect-square"
                    />
                )}
            </div>
        </div>
    );
}

export default NotificationBar;
