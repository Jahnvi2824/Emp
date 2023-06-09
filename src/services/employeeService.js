// const { getManager } = require("typeorm");
// const Employee = require("../models/Employee");

// // Employee service methods
// // Have to Implement employee-related business logic here

const { getManager } = require("typeorm");
const Employee = require("../models/Employee");

// Get all employees
const getAllEmployees = async () => {
  const entityManager = getManager();
  const employees = await entityManager.find(Employee);
  return employees;
};

// Get employee by employee number
const getEmployeeByEmpNo = async (empNo) => {
  const entityManager = getManager();
  const employee = await entityManager.findOne(Employee, { emp_no: empNo });
  return employee;
};

// Create a new employee
const createEmployee = async (employeeData) => {
  const entityManager = getManager();
  const employee = entityManager.create(Employee, employeeData);
  await entityManager.save(employee);
  return employee;
};

// Update an employee
const updateEmployee = async (empNo, employeeData) => {
  const entityManager = getManager();
  const employee = await entityManager.findOne(Employee, { emp_no: empNo });
  if (!employee) {
    throw new Error("Employee not found");
  }
  entityManager.merge(Employee, employee, employeeData);
  await entityManager.save(employee);
  return employee;
};

// Delete an employee
const deleteEmployee = async (empNo) => {
  const entityManager = getManager();
  const employee = await entityManager.findOne(Employee, { emp_no: empNo });
  if (!employee) {
    throw new Error("Employee not found");
  }
  await entityManager.remove(employee);
};

module.exports = {
  getAllEmployees,
  getEmployeeByEmpNo,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
