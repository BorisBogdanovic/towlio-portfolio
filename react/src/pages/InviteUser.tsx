import { HiArrowLongLeft } from "react-icons/hi2";
import InviteForm from "../features/Invite/InviteForm";
import ContentHeader from "../Ui/ContentHeader";
import ContentHeading from "../Ui/ContentHeading";
import Button from "../Ui/Button";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const navigate = useNavigate();
    return (
        <>
            <ContentHeader
                heading="Create User"
                icon={<HiArrowLongLeft className="h-4 w-4" />}
                button={
                    <Button onClick={() => navigate("/")} type="secondary">
                        {" "}
                        Cancel{" "}
                    </Button>
                }
            />
            <div className=" border border-disabledBorderGray mt-4 rounded-xl overflow-hidden min-h-[500px]">
                <ContentHeading>Basic information</ContentHeading>
                <InviteForm />
            </div>
        </>
    );
}

export default CreateUser;
