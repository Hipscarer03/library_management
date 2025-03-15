const express = require("express");
require("dotenv").config();
const authRouter = require("./routes/auth.routes");
const bookRouter = require("./routes/book.routes");
const borrowInfoRouter = require("./routes/borrowInfo.route");

const Db = require("./models");
// Khai baos 1 số thông tin liên quan dến server
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//Tạo server
const server = express();
server.use(express.json()); 

server.use("/auth", authRouter); 
server.use("/book", bookRouter);
server.use("/borrowInfo", borrowInfoRouter);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  Db.connectDB();
});
