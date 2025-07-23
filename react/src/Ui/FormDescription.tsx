import { ReactNode } from "react";

type FormDescriptionProps = {
    children: ReactNode;
};

function FormDescription({ children }: FormDescriptionProps) {
    return (
        <p className="text-base leading-6 font-normal text-center text-textGray">
            {children}
        </p>
    );
}

export default FormDescription;
