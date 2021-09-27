const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cafeRoute = require("./routes/cafe");

const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", cafeRoute);
mongoose
  .connect("mongodb://localhost/zenika-backend", { useNewUrlParser: true })
  .then(() => {
    console.log("连接数据库成功!!!");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("连接数据库失败", error);
  });
