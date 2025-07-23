import { Link } from "react-router-dom";
import alertFill from "../assets/images/alert-fill.png";

function PageNotFoundMessage() {
    return (
        <div className="flex items-center gap-8 w-[768px]">
            <img src={alertFill} alt="Alert icon" />
            <div>
                <h3 className="text-textGray text-2xl leading-8 font-bold">
                    404 - Page Not Found
                </h3>
                <p className="font-medium text-base leading-6 text-textLightGray my-2">
                    The page you are looking for does not exist. This may be due
                    to an incorrect link or the page may have been removed.
                </p>
                <Link
                    className="text-sm font-medium leading-5 text-primary underline"
                    to={"/"}
                >
                    Go back to the homepage
                </Link>
            </div>
        </div>
    );
}

export default PageNotFoundMessage;
