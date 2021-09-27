const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/employee");
const CafeModel = require("../models/cafe");

// create new employee
router.post("/cafe/employee", (req, res) => {
  const { name } = req.query;
  console.log("----------------data--------", req.query);
  EmployeeModel.findOne({ name })
    .then((employee) => {
      if (employee) {
        res.send({ status: 201, msg: "The employee already exists!" });
      } else {
        return EmployeeModel.create({ ...req.query });
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
// get all employee
router.get("/cafe/employees", (req, res) => {
  EmployeeModel.find({})
    .then((employees) => {
      const data = employees.map((employee) => ({
        name: employee.name,
        days_worked: parseInt(employee.days_worked),
        id: "UI" + `${employee._id}`.substring(17, 24),
      }));
      console.log(data);
      data.sort((a, b) => {
        return b.days_worked - a.days_worked;
      });
      // res.send({ status: 200, data: employees });
      res.send({ status: 200, data });
    })
    .catch((error) => {
      console.error("Get employees list error", error);
      res.send({
        status: 201,
        msg: "Get employees list error,  please try again!",
      });
    });
});
// create new cafe
router.post("/cafe", (req, res) => {
  const { name } = req.query;
  CafeModel.findOne({ name })
    .then((cafe) => {
      if (cafe) {
        res.send({ status: 201, msg: "The cafe already exists!" });
      } else {
        return CafeModel.create({ ...req.query });
      }
    })
    .then((cafe) => {
      res.send({ status: 200, data: cafe });
    })
    .catch((error) => {
      console.error("Add cafe error", error);
      res.send({ status: 201, msg: "Add cafe error, please try again!" });
    });
});
// get all/none cafe
router.get("/cafes", (req, res) => {
  const location = req.query.location ? req.query.location : "";
  if ((location && location !== null, location !== "")) {
    CafeModel.find({ location })
      .then((cafes) => {
        res.send({ status: 200, data: cafes });
      })
      .catch((error) => {
        console.error(`Get ${location}cafes list error`, error);
        res.send({
          status: 201,
          msg: `Get ${location}cafes list error,  please try again!`,
        });
      });
  } else {
    CafeModel.find({})
      .then((cafes) => {
        res.send({ status: 200, data: cafes });
      })
      .catch((error) => {
        console.error("Get all cafes list error", error);
        res.send({
          status: 201,
          msg: "Get all cafes list error,  please try again!",
        });
      });
  }
});

module.exports = router;
