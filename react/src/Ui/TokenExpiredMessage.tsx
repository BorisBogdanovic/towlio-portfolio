import Container from "./Container";
import { Link } from "react-router-dom";
import alertFill from "../assets/images/alert-fill.png";

function TokenExpiredMessage() {
    return (
        <Container>
            <div className="flex items-center gap-8 w-[768px]">
                <img src={alertFill} alt="Alert icon" />
                <div>
                    <h3 className="text-textGray text-2xl leading-8 font-bold">
                        410 - Link Expired or Used
                    </h3>
                    <p className="font-medium text-base leading-6 text-textLightGray my-2">
                        The invitation link has expired or has already been
                        used. Please request a new one or contact the person who
                        invited you.
                    </p>
                    <Link
                        className="text-sm font-medium leading-5 text-primary underline"
                        to={"/login"}
                    >
                        Go back to the login
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default TokenExpiredMessage;
