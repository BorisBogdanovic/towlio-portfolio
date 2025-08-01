import { ButtonProps } from "../types";

const buttonClasses: Record<NonNullable<ButtonProps["type"]>, string> = {
    main: "disabled:bg-[#BCCAF1] w-full text-sm font-medium flex items-center justify-center leading-5 bg-primary text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-primaryHover transition duration-300 ease",
    delete: "text-sm w-full font-medium leading-5 bg-bdoRed text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-bdoRedHover transition duration-300 ease",
    secondary:
        "w-full flex items-center justify-center text-sm font-medium leading-5 gap-2 bg-secondary text-textGray rounded-lg px-4 py-3 cursor-pointer hover:bg-secondaryHover transition duration-300 ease",
    small: "text-sm font-medium leading-5 bg-secondary text-textGray rounded-lg px-2.5 py-2.5 cursor-pointer hover:bg-secondaryHover transition duration-300 ease",
    refresh:
        "w-[50px] h-[50px] flex items-center justify-center leading-5 bg-primary text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-primaryHover transition duration-300 ease",
};

function Button({
    children,
    type = "main",
    onClick,
    disabled = false,
    htmlType = "submit",
}: ButtonProps) {
    const className = buttonClasses[type] || "";

    return (
        <button
            type={htmlType}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
}

export default Button;
