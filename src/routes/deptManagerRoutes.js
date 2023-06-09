// const express = require("express");
// const router = express.Router();
// const deptManagerController = require("../controllers/deptManagerController");

// // Department Manager routes
// // Have to Define department manager-related routes here

const express = require("express");
const router = express.Router();
const deptManagerController = require("../controllers/deptManagerController");

// Department Manager routes
router.get("/", deptManagerController.getAllDeptManagers);
router.get("/:deptNo", deptManagerController.getDeptManagersByDeptNo);
router.post("/", deptManagerController.createDeptManager);
router.put("/:deptNo/:empNo", deptManagerController.updateDeptManager);
router.delete("/:deptNo/:empNo", deptManagerController.deleteDeptManager);

module.exports = router;
