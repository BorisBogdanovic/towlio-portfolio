import { HiOutlinePlusSmall } from "react-icons/hi2";
import Button from "../../Ui/Button";
import { useNavigate } from "react-router-dom";

function UserListHeader() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-2xl leading-8 text-textGray">
                Salespeople List
            </h3>
            <div>
                <Button type="main" onClick={() => navigate("/create-user")}>
                    <HiOutlinePlusSmall className="w-5 h-5" /> Invite User
                </Button>
            </div>
        </div>
    );
}

export default UserListHeader;
