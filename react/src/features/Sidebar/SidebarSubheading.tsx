import { ReactNode } from "react";

type SidebarSubheadingProps = {
    children: ReactNode;
};

function SidebarSubheading({ children }: SidebarSubheadingProps) {
    return (
        <p className="text-textLightGray uppercase tracking-[2px] mb-4 mt-8">
            {children}
        </p>
    );
}

export default SidebarSubheading;
