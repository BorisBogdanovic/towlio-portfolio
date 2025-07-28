import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
import {
    HiChartPie,
    HiUserPlus,
    HiClipboardDocumentList,
    HiMiniCog8Tooth,
    HiBriefcase,
    HiOutlinePlusSmall,
    HiUserGroup,
} from "react-icons/hi2";
import SidebarSubheading from "./SidebarSubheading";
import SidebarLogo from "./SidebarLogo";
import SidebarAccordion from "./SidebarAccordion";
import SidebarLink from "./SidebarLink";
import SidebarUserInfo from "./SidebarUserInfo";

function Sidebar() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <nav className="w-xs h-screen bg-white fixed py-8 px-4 flex flex-col justify-between shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-r border-r-disabledBorderGray">
            <div>
                <SidebarLogo />
                <SidebarSubheading>MENU</SidebarSubheading>
                <SidebarLink
                    to="/"
                    icon={<HiChartPie className="w-6 h-6 text-iconColor" />}
                    label="Business analytics"
                />
                <SidebarAccordion
                    icon={<HiBriefcase className="w-6 h-6 text-iconColor" />}
                    label="Clients"
                >
                    <SidebarLink
                        to="/create-client"
                        icon={
                            <HiOutlinePlusSmall className="w-6 h-6 text-iconColor" />
                        }
                        label="Create Client"
                        nested
                    />
                    <SidebarLink
                        to="/clients"
                        icon={
                            <HiClipboardDocumentList className="w-6 h-6 text-iconColor" />
                        }
                        label="All Clients"
                        nested
                    />
                </SidebarAccordion>
                {user?.is_admin && (
                    <SidebarAccordion
                        icon={
                            <HiUserGroup className="w-6 h-6 text-iconColor" />
                        }
                        label="Salespeople"
                    >
                        <SidebarLink
                            to="/create-user"
                            icon={
                                <HiUserPlus className="w-6 h-6 text-iconColor" />
                            }
                            label="Add Salesperson"
                            nested
                        />
                        <SidebarLink
                            to="/users"
                            icon={
                                <HiClipboardDocumentList className="w-6 h-6 text-iconColor" />
                            }
                            label="Salespeople List"
                            nested
                        />
                    </SidebarAccordion>
                )}
            </div>
            <div>
                <SidebarSubheading>SETTINGS</SidebarSubheading>
                <SidebarLink
                    to="/settings"
                    icon={
                        <HiMiniCog8Tooth className="w-6 h-6 text-iconColor" />
                    }
                    label="Settings"
                />
                <div className="h-[1px] w-full bg-disabledBorderGray my-6"></div>
                {user && (
                    <SidebarUserInfo
                        name={user.name}
                        last_name={user.last_name}
                        profile_image={user.profile_image}
                    />
                )}
            </div>
        </nav>
    );
}
export default Sidebar;
