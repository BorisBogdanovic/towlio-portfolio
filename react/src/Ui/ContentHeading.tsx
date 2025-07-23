import { ReactNode } from "react";

type ContentHeadingProps = {
    children: ReactNode;
};

function ContentHeading({ children }: ContentHeadingProps) {
    return (
        <div className="p-4 bg-sectionBg border-b border-b-disabledBorderGray rounded-t-2xl">
            <span className="text-base leading-6 font-semibold text-textGray ">
                {children}
            </span>
        </div>
    );
}

export default ContentHeading;
