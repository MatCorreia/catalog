import { Link, useNavigate } from "react-router-dom";
import { UserName } from "../../utils/UserName";
import { useAuthStore } from "../../store/useAuthStore";

import LogoutIcon from "../../assets/icon/logout.png";

import "./Header.css";

export const Header = () => {
    const navigate = useNavigate();
    const { loggedUser, logoutUser } = useAuthStore();

    function handleLogout() {
        logoutUser();
        navigate("/");
    } 

    return (
        <header className="bg-header">
            <div className="header-content container">
                <Link to={"/dashboard"} className="logo">Catalog</Link>

                <ul>
                    <li className="user">
                        <small>Logado</small>
                        <p><b>{loggedUser && UserName(loggedUser.name)}</b></p>
                    </li>
                    <li className="bg-header-logout" onClick={handleLogout}>
                        <img src={LogoutIcon} alt="Logout Icon" />
                    </li>
                </ul>
            </div>
        </header>
    )
} 