import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <h1>Giáo viên hướng dẫn: TS. Nguyễn Ngô Lâm</h1>
      <h1>Sinh viên thực hiện: Võ Minh Thuận, Lê Thị Tuyết Nhi</h1>
      <p>@ {new Date().getFullYear()} Drone Management System. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
