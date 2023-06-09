// const express = require("express");
// const router = express.Router();
// const departmentController = require("../controllers/departmentController");

// // Department routes
// // have to Define department-related routes here

const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Department routes
router.get("/", departmentController.getAllDepartments);
router.get("/:deptNo", departmentController.getDepartmentByDeptNo);
router.post("/", departmentController.createDepartment);
router.put("/:deptNo", departmentController.updateDepartment);
router.delete("/:deptNo", departmentController.deleteDepartment);

module.exports = router;
