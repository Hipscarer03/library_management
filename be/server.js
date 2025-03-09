const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");


// Khai baos 1 số thông tin liên quan dến server
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//Tạo server
const server = express();
server.use(express.json()); 

server.use("/auth", authRoutes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
