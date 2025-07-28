import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        },
        updateUser(state, action) {
            state.user = action.payload;
            const auth = JSON.parse(localStorage.getItem("auth") || "{}");
            auth.user = action.payload;
            localStorage.setItem("auth", JSON.stringify(auth));
        },
    },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
