const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Đăng ký
const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã được sử dụng" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công", user: { name, email, phone } });
  } catch (error) {
    next(error);
  }
};

// Đăng nhập
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Mật khẩu không đúng" });

    const token = jwt.sign(
      { id: user._id, email: user.email, isMaster: user.isMaster }, // Thêm isMaster vào payload
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    const { password: _, ...userInfo } = user._doc;

    res.status(200).json({ message: "Đăng nhập thành công", result: userInfo, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
