import { useRef } from "react";
import Button from "./Button";

function ChangeImageButton({
    onFileSelect,
}: {
    onFileSelect: (file: File) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <>
            <Button type="main" onClick={handleButtonClick}>
                Change image
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </>
    );
}

export default ChangeImageButton;
