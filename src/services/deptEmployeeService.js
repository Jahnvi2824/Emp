// const { getManager } = require("typeorm");
// const DeptEmployee = require("../models/DeptEmployee");

// // Department Employee service methods
// // Have to Implement department employee-related business logic here

const { getManager } = require("typeorm");
const DeptEmployee = require("../models/DeptEmployee");

// Get all department employees
const getAllDeptEmployees = async () => {
  const entityManager = getManager();
  const deptEmployees = await entityManager.find(DeptEmployee);
  return deptEmployees;
};

// Get department employees by department number
const getDeptEmployeesByDeptNo = async (deptNo) => {
  const entityManager = getManager();
  const deptEmployees = await entityManager.find(DeptEmployee, {
    dept_no: deptNo,
  });
  return deptEmployees;
};

// Create a new department employee
const createDeptEmployee = async (deptEmployeeData) => {
  const entityManager = getManager();
  const deptEmployee = entityManager.create(DeptEmployee, deptEmployeeData);
  await entityManager.save(deptEmployee);
  return deptEmployee;
};

// Update a department employee
const updateDeptEmployee = async (empNo, deptEmployeeData) => {
  const entityManager = getManager();
  const deptEmployee = await entityManager.findOne(DeptEmployee, {
    emp_no: empNo,
  });
  if (!deptEmployee) {
    throw new Error("Department employee not found");
  }
  entityManager.merge(DeptEmployee, deptEmployee, deptEmployeeData);
  await entityManager.save(deptEmployee);
  return deptEmployee;
};

// Delete a department employee
const deleteDeptEmployee = async (empNo) => {
  const entityManager = getManager();
  const deptEmployee = await entityManager.findOne(DeptEmployee, {
    emp_no: empNo,
  });
  if (!deptEmployee) {
    throw new Error("Department employee not found");
  }
  await entityManager.remove(deptEmployee);
};

module.exports = {
  getAllDeptEmployees,
  getDeptEmployeesByDeptNo,
  createDeptEmployee,
  updateDeptEmployee,
  deleteDeptEmployee,
};
