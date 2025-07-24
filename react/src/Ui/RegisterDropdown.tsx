import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useCities } from "../hooks/useCities";

interface City {
    id: number;
    name: string;
}

interface RegisterDropdownProps {
    selectedValue: number | null;
    onSelect: (id: number | null) => void;
}

function RegisterDropdown({ selectedValue, onSelect }: RegisterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const { data } = useCities();
    const cities: City[] = data?.data || [];

    const handleSelect = (item: City) => {
        onSelect(item.id);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    console.log(selectedValue);
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="h-[50px] flex items-center justify-between p-4 border border-disabledBorderGray rounded-lg text-textGray cursor-pointer w-full"
                onClick={toggleDropdown}
            >
                {selectedValue
                    ? cities.find((item) => item.id === selectedValue)?.name
                    : "Choose city"}
                <HiChevronDown />
            </button>

            {isOpen && (
                <ul className="absolute left-0 mt-2 p-2 bg-white border border-disabledBorderGray rounded-lg max-h-60 overflow-y-auto w-full z-10">
                    {cities.map((item) => (
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

export default RegisterDropdown;
