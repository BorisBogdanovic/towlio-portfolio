import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};
function Container({ children }: ContainerProps) {
    return <div className="relative w-[96rem] mx-auto">{children}</div>;
}

export default Container;
