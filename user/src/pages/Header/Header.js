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
        <h1>DSM</h1>
      </div>
      <div className="header-r">
        <nav className="header-nav">
          <ul>
            <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}><Link to="/">About</Link></li>
            <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}><Link to={isMaster ? "/home" : "/homeuser"}>Home</Link></li>
            {!isLoggedIn ? (
              <>
                <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}><Link to="/login" className="login">Login</Link></li>
                <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}><Link to="/register" className="register">Register</Link></li>
              </>
            ) : (
              <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}>
                <ul>
                  <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}>
                    <p style={{"padding":"0px", "margin" :"0px", "display" :"flex", "justifyContent" : "center", "textAlign":"center"}}>{user?.name|| "None-User"}</p>
                  </li>
                  <li style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "padding":"0px 8px", "margin":"0px"}}>
                    <button onClick={handleLogout} className="logout">Logout</button>
                  </li>
                </ul>
              </li>
              
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
