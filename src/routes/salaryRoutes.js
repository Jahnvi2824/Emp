// const express = require("express");
// const router = express.Router();
// const salaryController = require("../controllers/salaryController");

// // Salary routes
// // Have to Define salary-related routes here

const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");

// Salary routes
router.get("/", salaryController.getAllSalaries);
router.get("/:empNo", salaryController.getSalaryByEmpNo);
router.post("/", salaryController.createSalary);
router.put("/:empNo", salaryController.updateSalary);
router.delete("/:empNo", salaryController.deleteSalary);

module.exports = router;
