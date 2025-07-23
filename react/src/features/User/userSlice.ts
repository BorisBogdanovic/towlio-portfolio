import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserFilterState {
    city: number | null;
    status: number | null;
    search: string;
    page: number;
}

const initialState: UserFilterState = {
    city: null,
    status: null,
    search: "",
    page: 1,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<number | null>) {
            state.city = action.payload;
            state.page = 1;
        },
        setStatus(state, action: PayloadAction<number | null>) {
            state.status = action.payload;
            state.page = 1;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        resetFilters(state) {
            state.city = null;
            state.status = null;
            state.search = "";
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
});

export const { setCity, setPage, setStatus, setSearch, resetFilters } =
    userSlice.actions;
export default userSlice.reducer;
