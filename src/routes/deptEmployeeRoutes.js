// const express = require("express");
// const router = express.Router();
// const deptEmployeeController = require("../controllers/deptEmployeeController");

// // Department Employee routes
// // Have to Define department employee-related routes here

const express = require("express");
const router = express.Router();
const deptEmployeeController = require("../controllers/deptEmployeeController");

// Department Employee routes
router.get("/", deptEmployeeController.getAllDeptEmployees);
router.get("/:deptNo", deptEmployeeController.getDeptEmployeesByDeptNo);
router.get("/employee/:empNo", deptEmployeeController.getDeptEmployeesByEmpNo);
router.post("/", deptEmployeeController.createDeptEmployee);
router.put("/:deptNo/:empNo", deptEmployeeController.updateDeptEmployee);
router.delete("/:deptNo/:empNo", deptEmployeeController.deleteDeptEmployee);

module.exports = router;
