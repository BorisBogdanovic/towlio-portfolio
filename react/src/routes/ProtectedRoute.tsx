import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../App/store";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
