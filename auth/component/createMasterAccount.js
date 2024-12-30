const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User"); // Đảm bảo đường dẫn tới mô hình User là chính xác

dotenv.config(); // Đọc file .env để lấy biến môi trường

// Kết nối đến MongoDB
mongoose
    .connect("mongodb+srv://user:user@iot-da2.7yuep.mongodb.net/?retryWrites=true&w=majority&appName=iot-da2", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
    console.log("Đã kết nối đến MongoDB");

    // Kiểm tra nếu tài khoản master đã tồn tại
    const existingMaster = await User.findOne({ email: "tuyetnhiattthcs@gmail.com" });
    if (existingMaster) {
      console.log("Tài khoản master đã tồn tại");
      process.exit();
    }

    // Hash mật khẩu cho tài khoản master
    const hashedPassword = await bcrypt.hash("hashedPassword", 12);

    // Tạo tài khoản master
    const masterUser = new User({
      name: "Nhi",
      email: "tuyetnhiattthcs@gmail.com",
      password: hashedPassword,
      phone: "0346011602",
      isMaster: true, // Đánh dấu tài khoản là master
    });

    await masterUser.save(); // Lưu tài khoản vào database
    console.log("Tài khoản master đã được tạo thành công");
    process.exit();
  })
  .catch((err) => {
    console.error("Lỗi khi kết nối MongoDB:", err.message);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  });

  
