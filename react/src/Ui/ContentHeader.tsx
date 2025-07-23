import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface ContentHeaderProps {
    heading: string;
    icon?: ReactNode;
    button?: ReactNode;
}
function ContentHeader({ heading, icon, button }: ContentHeaderProps) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Button type="small" onClick={() => navigate(-1)}>
                    {icon}
                </Button>
                <h3 className="font-bold text-2xl leading-8 text-textGray">
                    {heading}
                </h3>
            </div>
            <div className="flex items-center gap-3">{button}</div>
        </div>
    );
}

export default ContentHeader;
