const { EntityManager } = require("typeorm");
const Employee = require("../models/Employee");
const AppDataSource = require("../../connection1");

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get employee by emp_no
const getEmployeeByEmpNo = async (req, res) => {
  try {
    const { empNo } = req.params;
    const employeeRepository = EntityManager().getRepository(Employee);
    const employee = await employeeRepository.findOne(empNo);

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  console.log("post request");
  try {
    // res.json({ body: req.body });
    console.log("what");
    const { emp_no, birth_date, first_name, last_name, gender, hire_date } =
      req.body;
    console.log(req.body);
    const employeeRepository = await AppDataSource.getRepository(Employee);
    // console.log(empNo);
    // Check if employee with the same empNo already exists
    // const existingEmployee = await employeeRepository.findOne(empNo);
    // if (existingEmployee) {
    //   return res
    //     .status(400)
    //     .json({ error: "Employee with the same empNo already exists" });
    // }
    // console.log(empNo + " " + gender);
    const newEmployee = employeeRepository.create({
      emp_no: emp_no,
      birth_date: birth_date,
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      hire_date: hire_date,
    });
    console.log(newEmployee);
    await employeeRepository.save(newEmployee);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update an existing employee
const updateEmployee = async (req, res) => {
  try {
    const { empNo } = req.params;
    const { birthDate, firstName, lastName, gender, hireDate } = req.body;

    const employeeRepository = EntityManager().getRepository(Employee);
    const employee = await employeeRepository.findOne(empNo);

    if (employee) {
      employee.birth_date = birthDate;
      employee.first_name = firstName;
      employee.last_name = lastName;
      employee.gender = gender;
      employee.hire_date = hireDate;

      await employeeRepository.save(employee);
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { empNo } = req.params;

    const employeeRepository = EntityManager().getRepository(Employee);
    const employee = await employeeRepository.findOne(empNo);

    if (employee) {
      await employeeRepository.remove(employee);
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeByEmpNo,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
