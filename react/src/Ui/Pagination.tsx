import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-secondary rounded-md disabled:opacity-50 cursor-pointer"
            >
                <HiChevronLeft />
            </button>
            <span className="text-sm text-gray-700">{`Page ${currentPage} of ${lastPage}`}</span>
            <button
                onClick={handleNext}
                disabled={currentPage === lastPage}
                className="px-4 py-2 bg-secondary rounded-md disabled:opacity-50 cursor-pointer"
            >
                <HiChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
