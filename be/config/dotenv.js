require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "default_secret",
};
