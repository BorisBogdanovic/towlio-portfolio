import { PawsordModalProps } from "../types";
import warning from "../assets/images/warning.svg";
import { useEffect } from "react";

function ChangePasswordModal({
    isOpen,
    title,
    message = "",
    onCancel,
    children,
    icon = warning,
}: PawsordModalProps) {
    ////////////////////////////////////////////CLOSING MODAL ON ESCAPE
    useEffect(() => {
        if (!isOpen) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onCancel?.();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center h-screen w-screen  backdrop-blur-xs "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-lg bg-white rounded-lg overflow-hidden border border-disabledBorderGray shadow-lg"
            >
                <div className="px-4 py-3  bg-sectionBg border-b border-disabledBorderGray">
                    <span className="font-semibold text-lg leading-6 text-textGray">
                        {title}
                    </span>
                </div>
                <div className=" flex flex-col items-center justify-center gap-2">
                    {message && (
                        <>
                            <img className="mb-4 mt-6" src={icon} alt="" />
                            <p className="font-medium text-4 leading-6 text-textGray text-center w-sm">
                                {message}
                            </p>
                        </>
                    )}
                    <div className="w-full flex flex-col gap-4">
                        {" "}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;
