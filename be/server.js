const express = require("express");
require("dotenv").config();
const authRouter = require("./routes/auth.routes");
const bookRouter = require("./routes/book.routes");
const borrowInfoRouter = require("./routes/borrowInfo.route");
const fine = require("./routes/fine.routes");
const requestRouter = require("./routes/request.routes");
const staffActionRouter = require("./routes/staffAction.routes");
const categoryRouter = require("./routes/category.routes");

const Db = require("./models");
// Khai baos 1 số thông tin liên quan dến server
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const cors = require('cors');
//Tạo server
const server = express();
server.use(express.json()); 
server.use(cors());

server.use("/auth", authRouter); 
server.use("/book", bookRouter);
server.use("/borrowInfo", borrowInfoRouter);
server.use("/category", categoryRouter);
server.use("/fine", fine);
server.use("/request", requestRouter);
server.use("/staff", staffActionRouter);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  Db.connectDB();
});
