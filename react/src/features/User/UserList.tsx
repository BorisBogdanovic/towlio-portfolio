import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUser";
import { setPage } from "../User/userSlice";
import { User } from "../../types";
import Loader from "../../Ui/Loader";
import SingleUser from "./SingleUser";
import UserListHeader from "./UserListHeader";
import UserFilters from "./UserFilters";
import Pagination from "../../Ui/Pagination";

function UserList() {
    const dispatch = useDispatch();

    const { data, isLoading, error } = useUsers();

    if (error) return <p>Error loading users</p>;

    const users = data?.data || [];

    return (
        <>
            <UserListHeader />
            <UserFilters />

            {isLoading ? (
                <div className="w-full flex justify-center items-center h-[692px]">
                    <Loader />
                </div>
            ) : users.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                    <p>No users found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {users.map((user: User) => (
                            <SingleUser user={user} key={user.id} />
                        ))}
                    </div>

                    <div className="h-[80px] flex items-center justify-center absolute bottom-0 left-0 right-0 mx-auto">
                        <Pagination
                            currentPage={data.current_page}
                            lastPage={data.last_page}
                            onPageChange={(newPage) =>
                                dispatch(setPage(newPage))
                            }
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default UserList;
