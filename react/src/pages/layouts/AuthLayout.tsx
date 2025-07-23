import { Outlet } from "react-router-dom";
import authBg from "../../assets/images/auth-bg2.jpg";
import up from "../../assets/images/up.png";
import down from "../../assets/images/down.png";

function AuthLayout() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${authBg})` }}
        >
            <Outlet />
            <img
                className="absolute -top-15
             left-175"
                src={up}
                alt=""
            />
            <img className="absolute -bottom-15 left-175" src={down} alt="" />
        </div>
    );
}

export default AuthLayout;
