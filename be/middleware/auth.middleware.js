const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/dotenv");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log (decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", token: token });
  }
};
const vertifyRole = (role) => {
  return (req, res, next) => {
    // console.log(role + " " + req.user.role);
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Forbidden: Only ${role} can perform this action` });
    }
    next();
  };
};

module.exports = { authenticateToken, vertifyRole };
