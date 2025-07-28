import { forwardRef } from "react";
import { InputProps } from "../types";

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            placeholder,
            type,
            id,
            icon,
            rightIcon,
            className,
            inputClassName,
            ...rest
        },
        ref
    ) => {
        return (
            <div className={`relative ${className ?? "w-full"}`}>
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    className={`
                        w-full py-3 rounded-lg border border-disabledBorderGray 
                        placeholder:text-sm placeholder:leading-5 
                        text-textGray
                        ${icon ? "pl-16" : "pl-4"} 
                        ${rightIcon ? "pr-12" : "pr-4"} 
                        ${inputClassName ?? ""}
                    `}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...rest}
                />

                {rightIcon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer flex items-center">
                        {rightIcon}
                    </div>
                )}
            </div>
        );
    }
);

export default Input;
