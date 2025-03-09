const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/dotenv.config");

// Dữ liệu giả lập
const users = [{ id: 1, username: "admin", password: "password123" }];

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};

// const logout = (req, res) => {
//   res.json({ message: "Đăng xuat thanh cong" });
// }
;

module.exports = { login, logout };
