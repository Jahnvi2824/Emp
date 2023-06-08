const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Employee routes
router.get("/", employeeController.getAllEmployees);
router.get("/:empNo", employeeController.getEmployeeByEmpNo);
router.post("/", employeeController.createEmployee);
router.put("/:empNo", employeeController.updateEmployee);
router.delete("/:empNo", employeeController.deleteEmployee);

module.exports = router;
