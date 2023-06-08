const { EntityManager } = require("typeorm");
const Employee = require("../models/Employee");

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employeeRepository = EntityManager().getRepository(Employee);
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
  try {
    const { empNo, birthDate, firstName, lastName, gender, hireDate } =
      req.body;

    const employeeRepository = EntityManager().getRepository(Employee);

    // Check if employee with the same empNo already exists
    const existingEmployee = await employeeRepository.findOne(empNo);
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with the same empNo already exists" });
    }

    const newEmployee = employeeRepository.create({
      emp_no: empNo,
      birth_date: birthDate,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      hire_date: hireDate,
    });

    await employeeRepository.save(newEmployee);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
