const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/employee");

// create new
router.post("/add", (req, res) => {
  const { firstName, lastName, email, phone, gender } = req.body;
  EmployeeModel.findOne({ email })
    .then((employee) => {
      if (employee) {
        res.send({ status: 201, msg: "The employee already exists!" });
        return new Promise(() => {});
      } else {
        return EmployeeModel.create({ ...req.body });
      }
    })
    .then((employee) => {
      res.send({ status: 200, data: employee });
    })
    .catch((error) => {
      console.error("Add employee error", error);
      res.send({ status: 201, msg: "Add employee error, please try again!" });
    });
});
// patch
router.post("/edit", (req, res) => {
  const employee = req.body;
  console.log(employee);
  EmployeeModel.findOneAndUpdate({ _id: employee._id }, employee)
    .then((pre) => {
      const data = Object.assign(pre, employee);
      res.send({ status: 200, data });
    })
    .catch((error) => {
      console.error("Update employee detail error", error);
      res.send({
        status: 201,
        msg: "Update employee detail error, please try again!",
      });
    });
});

// delete
router.post("/delete", (req, res) => {
  console.log("看看有没有成功 req.body:", req.body);
  const _id = req.body.id;
  console.log("看看有没有成功 _id:", _id);
  EmployeeModel.findByIdAndDelete({ _id })
    .then(() => {
      console.log("res 看看", res);
      res.send({ status: 200 });
    })
    .catch((error) => {
      console.error("故障原因", "Delete employee error", error);
      res.send({ status: 201, msg: "Delete employee error,please try again!" });
    });
});
// get all
router.get("/list", (req, res) => {
  console.log("req", req.body);
  EmployeeModel.find({})
    .then((employees) => {
      res.send({ status: 200, data: employees });
    })
    .catch((error) => {
      console.error("Get employees list error", error);
      res.send({
        status: 201,
        msg: "Get employees list error,  please try again!",
      });
    });
});

module.exports = router;
