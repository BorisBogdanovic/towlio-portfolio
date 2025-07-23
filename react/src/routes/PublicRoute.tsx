import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { JSX } from "react";
import { RootState } from "../App/store";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
