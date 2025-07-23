import { ReactNode } from "react";

type ContentProps = {
    children: ReactNode;
};
function Content({ children }: ContentProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
            {children}
        </div>
    );
}

export default Content;
