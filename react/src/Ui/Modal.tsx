import { ModalProps } from "../types";
import Button from "./Button";
import warning from "../assets/images/warning.svg";

function Modal({
    isOpen,
    title,
    message = "",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    type = "delete",
    children,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center h-screen w-screen  backdrop-blur-xs ">
            <div className="w-lg bg-white rounded-lg overflow-hidden border border-disabledBorderGray shadow-lg">
                <div className="px-4 py-3  bg-sectionBg border-b border-disabledBorderGray">
                    <span className="font-semibold text-lg leading-6 text-textGray">
                        {title}
                    </span>
                </div>
                <div className="py-6 px-6 flex flex-col items-center justify-center gap-4">
                    {message && (
                        <>
                            <img className="mb-4" src={warning} alt="" />
                            <p className="font-medium text-4 leading-6 text-textLightGray text-center">
                                {message}
                            </p>
                        </>
                    )}
                    <div className="w-sm flex flex-col gap-4"> {children}</div>
                </div>
                <div className="px-4 py-3 flex items-center justify-end gap-3 bg-sectionBg border-t border-disabledBorderGray">
                    <div className="w-[150px]">
                        <Button type="secondary" onClick={onCancel}>
                            {cancelText}
                        </Button>
                    </div>
                    <div className="w-[150px]">
                        <Button type={type} onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
