const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/dotenv");
const Db = require("../models");

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await Db.User.findOne({ email, password });
  if (user) {
    return res.status(400).json({ message: "email đã tồn tại" });
  }
  let newUser = {
    user_id: Db.User.length + 1,
    email,
    password,
    role,
  };
  await Db.User.create(newUser);
  res.json({ message: "Register successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Db.User.findOne({ email, password });
  
  console.log(user);

  if (!user || user.length === 0) {
    return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "8h",
  });

  res.json({ token });
};

const logout = (req, res) => {
  res.json({ message: "Đăng xuat thanh cong" });
};

const getUserInfo = async (req, res) => {
  const token = req.params.token;

  if (!token) {
    return res.status(400).json({ message: "Token không được cung cấp" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: "Giải mã thành công", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ", error: err.message });
  }
}

module.exports = { login, logout, register , getUserInfo};
