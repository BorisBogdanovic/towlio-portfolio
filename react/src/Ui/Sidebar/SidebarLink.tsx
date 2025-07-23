import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    icon: ReactNode;
    label: string;
    nested?: boolean;
};

export default function SidebarLink({ to, icon, label, nested }: Props) {
    return (
        <NavLink to={to}>
            <div
                className={`flex items-center py-2 ${
                    nested ? "pl-10" : "pl-3"
                } mb-2 rounded-lg hover:bg-sectionBg cursor-pointer`}
            >
                {icon}
                <span className="text-base leading-6 text-textGray ml-2">
                    {label}
                </span>
            </div>
        </NavLink>
    );
}
