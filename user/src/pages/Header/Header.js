import React from "react"; 
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const isMaster = localStorage.getItem("isMaster") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    alert("Bạn đã đăng xuất.");
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>DMS</h1>
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
