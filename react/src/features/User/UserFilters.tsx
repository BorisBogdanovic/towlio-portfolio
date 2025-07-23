import { HiArrowPath, HiMagnifyingGlass } from "react-icons/hi2";
import Input from "../../Ui/Input";
import DropDown from "../../Ui/DropDown";
import { useCities } from "../../hooks/useCities";
import { useStatuses } from "../../hooks/useStatuses";
import Button from "../../Ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import {
    setCity,
    setStatus,
    setSearch,
    resetFilters,
} from "../../features/User/userSlice";

function UserFilters() {
    const dispatch = useDispatch();
    const { data } = useCities();
    const { data: statusesData } = useStatuses();

    const cities = data?.data ?? [];
    const statuses = statusesData?.data ?? [];

    const city = useSelector((state: RootState) => state.user.city);
    const status = useSelector((state: RootState) => state.user.status);
    const search = useSelector((state: RootState) => state.user.search);

    const handleReset = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="mt-4 flex items-center gap-4 ">
            <div>
                <Input
                    placeholder="Search team members"
                    type="text"
                    icon={<HiMagnifyingGlass color="#667085" size={24} />}
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />
            </div>
            <DropDown
                placeholder="Filter by City"
                array={cities}
                selectedValue={city}
                onSelect={(val) => dispatch(setCity(val))}
            />
            <DropDown
                placeholder="Filter by Status"
                array={statuses}
                selectedValue={status}
                onSelect={(val) => dispatch(setStatus(val))}
            />
            <div>
                <Button onClick={handleReset} aria-label="Reset filters">
                    <HiArrowPath className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}

export default UserFilters;
