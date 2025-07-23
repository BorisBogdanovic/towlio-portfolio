import { useState, useEffect } from "react";
import { HiCalendarDays } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import { formatDate, getCurrentTime } from "../utils/dateUtils";
function DateAndTime() {
    const [formattedDate, setFormattedDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const now = new Date();
        setFormattedDate(formatDate(now));
    }, []);

    useEffect(() => {
        setCurrentTime(getCurrentTime());

        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className=" text-sm leading-5 text-white flex justify-center items-center gap-8">
            <div className="flex gap-[4px]">
                <HiCalendarDays className="w-5 h-5" />
                <span>{formattedDate}</span>
            </div>
            <div className="flex gap-1">
                <HiOutlineClock className="w-5 h-5" />
                <span>{currentTime}</span>
            </div>
        </div>
    );
}

export default DateAndTime;
