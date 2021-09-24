const express = require("express");

const app = express();
const mongoose = require("mongoose");
const employeeRoute = require("./routes/employee");

const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/employee", employeeRoute);
mongoose
  .connect("mongodb://localhost/zenika", { useNewUrlParser: true })
  .then(() => {
    console.log("连接数据库成功!!!");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("连接数据库失败", error);
  });
