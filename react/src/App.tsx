import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullPageSpinner from "./Ui/FullPageSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Register = lazy(() => import("./pages/Register"));
const AuthLayout = lazy(() => import("./pages/layouts/AuthLayout"));
const MainLayout = lazy(() => import("./pages/layouts/MainLayout"));
const Settings = lazy(() => import("./pages/Settings"));
const CreateClient = lazy(() => import("./pages/CreateClient"));
const Client = lazy(() => import("./pages/Client"));
const CreateUser = lazy(() => import("./pages/InviteUser"));
const UserList = lazy(() => import("./pages/Users"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ExpiredPage = lazy(() => import("./pages/ExpiredPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster
                position="bottom-right"
                gutter={12}
                toastOptions={{
                    duration: 4000,
                    style: {
                        fontFamily: "inter",
                        fontSize: "14px",
                        padding: "16px",
                        borderRadius: "4px",
                        border: "1px solid #EAECF0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff",
                        color: "#344054",
                        width: "300px",
                        position: "relative",
                    },
                    success: {
                        duration: 3000,
                        icon: <HiCheckCircle size={48} color="#027A48" />,
                        style: {
                            backgroundColor: "#fff",
                            border: "1px solid #EAECF0",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            color: "#344054",
                            fontWeight: "500",
                        },
                    },
                    error: {
                        duration: 5000,
                        icon: <HiXCircle size={24} color="#d92d20" />,
                        style: {
                            background: "#fff",
                            color: "#d92d20",
                            border: "1px solid #EAECF0",
                        },
                    },
                }}
            />

            <BrowserRouter>
                <Suspense fallback={<FullPageSpinner />}>
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <PublicRoute>
                                    <AuthLayout />
                                </PublicRoute>
                            }
                        >
                            <Route index element={<Login />} />
                        </Route>
                        <Route
                            path="register/:email/:token/:name/:last_name"
                            element={
                                <PublicRoute>
                                    <AuthLayout />
                                </PublicRoute>
                            }
                        >
                            <Route index element={<Register />} />
                        </Route>
                        <Route
                            path="forgot-password"
                            element={
                                <PublicRoute>
                                    <AuthLayout />
                                </PublicRoute>
                            }
                        >
                            <Route index element={<ForgotPassword />} />
                        </Route>
                        <Route
                            path="reset-password"
                            element={
                                <PublicRoute>
                                    <AuthLayout />
                                </PublicRoute>
                            }
                        >
                            <Route index element={<ResetPassword />} />
                        </Route>

                        <Route path="link-expired" element={<ExpiredPage />} />
                        <Route
                            path="privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="settings" element={<Settings />} />
                            <Route
                                path="create-client"
                                element={<CreateClient />}
                            />
                            <Route path="clients" element={<Client />} />
                            <Route
                                path="create-user"
                                element={<CreateUser />}
                            />
                            <Route path="users" element={<UserList />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
