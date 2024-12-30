import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    setLoading(true);
  
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || "Lỗi không xác định");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Login response:", data);
        setLoading(false);
      
        if (data.token) {
          alert("Đăng nhập thành công!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("isMaster", data.result.isMaster); // Lưu trạng thái isMaster
          console.log("isMaster stored:", data.result.isMaster);
      
          if (data.result.isMaster) {
            navigate("/home");
          } else {
            navigate("/homeuser");
          }
        }
      })
      
      .catch((error) => {
        setLoading(false);
        alert(
          error.message === "Failed to fetch"
            ? "Không thể kết nối với server. Vui lòng kiểm tra mạng!"
            : error.message
        );
      });
  };  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="button-container">
            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? "loading" : ""}`}
            >
              {loading ? <div className="spinner"></div> : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
