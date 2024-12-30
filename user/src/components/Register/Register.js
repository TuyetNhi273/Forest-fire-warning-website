import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerStart, registerSuccess, registerFailure } from "../../Redux/authSlice";

import "./Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }
    if (password.length < 6) {
      alert("Mật khẩu phải dài ít nhất 6 ký tự!");
      return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }
    
    setLoading(true); // Hiển thị trạng thái đang xử lý

    // Bắt đầu quá trình đăng ký
    dispatch(registerStart());

    // Gửi yêu cầu đăng ký tới API
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
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
        console.log(data);
        setLoading(false);
        if (data.message === "Đăng ký thành công") {
          // Đăng ký thành công
          dispatch(registerSuccess());
          alert("Đăng ký thành công!");
          navigate("/login"); // Điều hướng đến trang đăng nhập
        } else {
          // Đăng ký thất bại
          dispatch(registerFailure());
          alert("Đăng ký thất bại. Vui lòng thử lại!");
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(registerFailure());
        alert(error.message === "Failed to fetch" 
          ? "Không thể kết nối với server. Vui lòng kiểm tra mạng!"
          : error.message
        );
      });
  };

  return (
    <div
      className="mainContainer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          display: "block",
          width: "400px",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2 className="margin" style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
          Đăng ký
        </h2>
        <form onSubmit={handleRegister}>
          <div className="tk">
            <label>Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="tk">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="tk">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="tk">
            <label>Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "5rem",
              height: "2rem",
              position: "relative",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <div className="spinner"></div> : "Đăng ký"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;