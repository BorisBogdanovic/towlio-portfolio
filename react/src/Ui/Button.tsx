import { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
    type?: "main" | "delete" | "secondary" | "small" | "refresh";
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    htmlType?: "button" | "submit" | "reset";
    disabled?: boolean;
};

function Button({
    children,
    type = "main",
    onClick,
    htmlType = "button",
}: ButtonProps) {
    if (type === "main") {
        return (
            <button
                type={htmlType}
                onClick={onClick}
                className="w-full text-sm font-medium flex items-center justify-center leading-5 bg-primary text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-primaryHover transition duration-300 ease"
            >
                {children}
            </button>
        );
    }

    if (type === "delete") {
        return (
            <button
                type={htmlType}
                onClick={onClick}
                className="text-sm w-full font-medium leading-5 bg-bdoRed text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-bdoRedHover transition duration-300 ease"
            >
                {children}
            </button>
        );
    }

    if (type === "secondary") {
        return (
            <button
                type={htmlType}
                onClick={onClick}
                className="w-full flex items-center justify-center text-sm font-medium leading-5 gap-2 bg-secondary text-textGray rounded-lg px-4 py-3 cursor-pointer hover:bg-secondaryHover transition duration-300 ease"
            >
                {children}
            </button>
        );
    }

    if (type === "small") {
        return (
            <button
                type={htmlType}
                onClick={onClick}
                className="text-sm font-medium leading-5 bg-secondary text-textGray rounded-lg px-2.5 py-2.5 cursor-pointer hover:bg-secondaryHover transition duration-300 ease"
            >
                {children}
            </button>
        );
    }
    if (type === "refresh") {
        return (
            <button
                type={htmlType}
                onClick={onClick}
                className="w-[50px] h-[50px] flex items-center justify-center leading-5 bg-primary text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-primaryHover transition duration-300 ease"
            >
                {children}
            </button>
        );
    }

    return null;
}

export default Button;
