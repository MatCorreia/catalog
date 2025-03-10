import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const PrivateRoute = () => {
    const { loggedUser } = useAuthStore();

    if (!loggedUser) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};