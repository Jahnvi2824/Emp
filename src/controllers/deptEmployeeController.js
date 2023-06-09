// const { getManager } = require("typeorm");
// const DeptEmployee = require("../models/DeptEmployee");

// // Department Employee controller methods
// // Have to  Implement department employee-related operations here

const DeptEmployee = require("../models/DeptEmployee");
const AppDataSource = require("../../connection1");

// Get all department employees
const getAllDeptEmployees = async (req, res) => {
  try {
    const deptEmployeeRepository = AppDataSource.getRepository(DeptEmployee);
    const deptEmployees = await deptEmployeeRepository.find();
    res.json(deptEmployees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get department employee by emp_no
const getDeptEmployeeByEmpNo = async (req, res) => {
  try {
    const { empNo } = req.params;
    const deptEmployeeRepository = AppDataSource.getRepository(DeptEmployee);
    const deptEmployee = await deptEmployeeRepository.findOne(empNo);

    if (deptEmployee) {
      res.json(deptEmployee);
    } else {
      res.status(404).json({ error: "Department Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new department employee
const createDeptEmployee = async (req, res) => {
  try {
    const { empNo, deptNo, fromDate, toDate } = req.body;

    const deptEmployeeRepository = AppDataSource.getRepository(DeptEmployee);

    // Check if department employee with the same empNo already exists
    const existingDeptEmployee = await deptEmployeeRepository.findOne(empNo);
    if (existingDeptEmployee) {
      return res.status(400).json({
        error: "Department Employee for the same empNo already exists",
      });
    }

    const newDeptEmployee = deptEmployeeRepository.create({
      emp_no: empNo,
      dept_no: deptNo,
      from_date: fromDate,
      to_date: toDate,
    });

    await deptEmployeeRepository.save(newDeptEmployee);
    res
      .status(201)
      .json({ message: "Department Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing department employee
const updateDeptEmployee = async (req, res) => {
  try {
    const { empNo } = req.params;
    const { deptNo, fromDate, toDate } = req.body;

    const deptEmployeeRepository = AppDataSource.getRepository(DeptEmployee);
    const deptEmployee = await deptEmployeeRepository.findOne(empNo);

    if (deptEmployee) {
      deptEmployee.dept_no = deptNo;
      deptEmployee.from_date = fromDate;
      deptEmployee.to_date = toDate;

      await deptEmployeeRepository.save(deptEmployee);
      res.json({ message: "Department Employee updated successfully" });
    } else {
      res.status(404).json({ error: "Department Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a department employee
const deleteDeptEmployee = async (req, res) => {
  try {
    const { empNo } = req.params;

    const deptEmployeeRepository = AppDataSource.getRepository(DeptEmployee);
    const deptEmployee = await deptEmployeeRepository.findOne(empNo);

    if (deptEmployee) {
      await deptEmployeeRepository.remove(deptEmployee);
      res.json({ message: "Department Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Department Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDeptEmployees,
  getDeptEmployeeByEmpNo,
  createDeptEmployee,
  updateDeptEmployee,
  deleteDeptEmployee,
};
