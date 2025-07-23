import { ReactNode } from "react";

type FormNameProps = {
    children: ReactNode;
};

function FormName({ children }: FormNameProps) {
    return (
        <h3 className="text-2xl leading-10 font-bold text-textGray mb-3">
            {children}
        </h3>
    );
}

export default FormName;
