// const { getManager } = require("typeorm");
// const DeptManager = require("../models/DeptManager");

// // Department Manager controller methods
// // Have to Implement your department manager-related operations here

const DeptManager = require("../models/DeptManager");
const AppDataSource = require("../../connection1");

// Get all department managers
const getAllDeptManagers = async (req, res) => {
  try {
    const deptManagerRepository = AppDataSource.getRepository(DeptManager);
    const deptManagers = await deptManagerRepository.find();
    res.json(deptManagers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get department manager by dept_no
const getDeptManagerByDeptNo = async (req, res) => {
  try {
    const { deptNo } = req.params;
    const deptManagerRepository = AppDataSource.getRepository(DeptManager);
    const deptManager = await deptManagerRepository.findOne(deptNo);

    if (deptManager) {
      res.json(deptManager);
    } else {
      res.status(404).json({ error: "Department Manager not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new department manager
const createDeptManager = async (req, res) => {
  try {
    const { deptNo, empNo, fromDate, toDate } = req.body;

    const deptManagerRepository = AppDataSource.getRepository(DeptManager);

    // Check if department manager with the same deptNo already exists
    const existingDeptManager = await deptManagerRepository.findOne(deptNo);
    if (existingDeptManager) {
      return res.status(400).json({
        error: "Department Manager for the same deptNo already exists",
      });
    }

    const newDeptManager = deptManagerRepository.create({
      dept_no: deptNo,
      emp_no: empNo,
      from_date: fromDate,
      to_date: toDate,
    });

    await deptManagerRepository.save(newDeptManager);
    res
      .status(201)
      .json({ message: "Department Manager created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing department manager
const updateDeptManager = async (req, res) => {
  try {
    const { deptNo } = req.params;
    const { empNo, fromDate, toDate } = req.body;

    const deptManagerRepository = AppDataSource.getRepository(DeptManager);
    const deptManager = await deptManagerRepository.findOne(deptNo);

    if (deptManager) {
      deptManager.emp_no = empNo;
      deptManager.from_date = fromDate;
      deptManager.to_date = toDate;

      await deptManagerRepository.save(deptManager);
      res.json({ message: "Department Manager updated successfully" });
    } else {
      res.status(404).json({ error: "Department Manager not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a department manager
const deleteDeptManager = async (req, res) => {
  try {
    const { deptNo } = req.params;

    const deptManagerRepository = AppDataSource.getRepository(DeptManager);
    const deptManager = await deptManagerRepository.findOne(deptNo);

    if (deptManager) {
      await deptManagerRepository.remove(deptManager);
      res.json({ message: "Department Manager deleted successfully" });
    } else {
      res.status(404).json({ error: "Department Manager not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDeptManagers,
  getDeptManagerByDeptNo,
  createDeptManager,
  updateDeptManager,
  deleteDeptManager,
};
