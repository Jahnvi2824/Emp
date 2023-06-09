// const { getManager } = require("typeorm");
// const Department = require("../models/Department");

// // Department controller methods
// // have to Implement  department-related operations here

const Department = require("../models/Department");
const AppDataSource = require("../../connection1");

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const departments = await departmentRepository.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get department by dept_no
const getDepartmentByDeptNo = async (req, res) => {
  try {
    const { deptNo } = req.params;
    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne(deptNo);

    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { deptNo, deptName } = req.body;

    const departmentRepository = AppDataSource.getRepository(Department);

    // Check if department with the same deptNo already exists
    const existingDepartment = await departmentRepository.findOne(deptNo);
    if (existingDepartment) {
      return res
        .status(400)
        .json({ error: "Department with the same deptNo already exists" });
    }

    const newDepartment = departmentRepository.create({
      dept_no: deptNo,
      dept_name: deptName,
    });

    await departmentRepository.save(newDepartment);
    res.status(201).json({ message: "Department created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing department
const updateDepartment = async (req, res) => {
  try {
    const { deptNo } = req.params;
    const { deptName } = req.body;

    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne(deptNo);

    if (department) {
      department.dept_name = deptName;

      await departmentRepository.save(department);
      res.json({ message: "Department updated successfully" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const { deptNo } = req.params;

    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne(deptNo);

    if (department) {
      await departmentRepository.remove(department);
      res.json({ message: "Department deleted successfully" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentByDeptNo,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
