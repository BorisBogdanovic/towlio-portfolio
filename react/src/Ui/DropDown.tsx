import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { DropDownProps, Item } from "../types";

function DropDown({
    array,
    placeholder,
    selectedValue,
    onSelect,
}: DropDownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (item: Item) => {
        onSelect(Number(item.id));
        setIsOpen(false);
    };
    const selectedItem = array.find((item) => item.id === selectedValue);
    return (
        <div className="relative">
            <button
                className="h-[50px] flex items-center justify-between p-4 border border-disabledBorderGray rounded-lg text-textGray cursor-pointer w-[250px]"
                onClick={toggleDropdown}
            >
                {selectedItem ? selectedItem.name : placeholder}
                <HiChevronDown />
            </button>

            {isOpen && (
                <ul className="absolute left-0 right-0 mt-2 p-2 bg-white border border-disabledBorderGray rounded-lg max-h-60 overflow-y-auto w-[250px]">
                    <li
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            onSelect(null);
                            setIsOpen(false);
                        }}
                    >
                        Clear selection
                    </li>
                    {array.map((item) => (
                        <li
                            key={item.id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropDown;
