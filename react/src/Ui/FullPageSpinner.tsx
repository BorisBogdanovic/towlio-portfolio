import authBg from "../assets/images/auth-bg2.jpg";
import Loader from "./Loader";

function FullPageSpinner() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center w-screen relative z-50"
            style={{ backgroundImage: `url(${authBg})` }}
        >
            <Loader wClass="w-16" hClass="h-16" />
        </div>
    );
}

export default FullPageSpinner;
