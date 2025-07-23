import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "../features/auth/authSlice";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

const authData = localStorage.getItem("auth");

if (authData) {
    try {
        const parsed = JSON.parse(authData);
        if (parsed?.user && parsed?.token) {
            store.dispatch(setCredentials(parsed));
        }
    } catch (error) {
        console.error("Invalid auth data in localStorage:", error);
        localStorage.removeItem("auth");
    }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
