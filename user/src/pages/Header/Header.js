import React from "react"; 
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMaster = useSelector((state) => state.auth.isMaster);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!localStorage.getItem("token");

  console.log("User:", user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    alert("Bạn đã đăng xuất.");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>{user?.name|| "DSM"}</h1>
      </div>
      <div className="header-r">
        <nav className="header-nav">
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to={isMaster ? "/home" : "/homeuser"}>Home</Link></li>
            {!isLoggedIn ? (
              <>
                <li><Link to="/login" className="login">Login</Link></li>
                <li><Link to="/register" className="register">Register</Link></li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="logout">Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
