// const express = require("express");
// const router = express.Router();
// const titleController = require("../controllers/titleController");

// // Title routes
// // Have to Define title-related routes here

const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");

// Title routes
router.get("/", titleController.getAllTitles);
router.get("/:empNo", titleController.getTitleByEmpNo);
router.post("/", titleController.createTitle);
router.put("/:empNo", titleController.updateTitle);
router.delete("/:empNo", titleController.deleteTitle);

module.exports = router;
