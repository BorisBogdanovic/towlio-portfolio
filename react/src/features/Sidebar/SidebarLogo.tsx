import { Link } from "react-router-dom";
import Logo from "../../Ui/Logo";

function SidebarLogo() {
    return (
        <Link to="/">
            <div className="w-35 mx-auto px-0">
                <Logo />
            </div>
        </Link>
    );
}

export default SidebarLogo;
