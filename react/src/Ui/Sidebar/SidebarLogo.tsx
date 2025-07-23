import { Link } from "react-router-dom";
import Logo from "../Logo";

function SidebarLogo() {
    return (
        <Link to="/">
            <div className="px-12 flex justify-center">
                <Logo />
            </div>
        </Link>
    );
}

export default SidebarLogo;
