import { ReactNode, useState } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";

type Props = {
    icon: ReactNode;
    label: string;
    children: ReactNode;
};

export default function SidebarAccordion({ icon, label, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                className="flex justify-between items-center py-2 px-3 mb-2 rounded-lg hover:bg-sectionBg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-base leading-6 text-textGray">
                        {label}
                    </span>
                </div>
                <HiMiniChevronDown className="text-iconColor w-6 h-6" />
            </div>
            <div
                className={`overflow-hidden transition-all duration-700 ease ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                {isOpen && children}
            </div>
        </div>
    );
}
