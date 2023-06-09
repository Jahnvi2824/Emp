// const { getManager } = require("typeorm");
// const Department = require("../models/Department");

// // Department service methods
// // Have to Implement department-related business logic here

const { getManager } = require("typeorm");
const Department = require("../models/Department");

// Get all departments
const getAllDepartments = async () => {
  const entityManager = getManager();
  const departments = await entityManager.find(Department);
  return departments;
};

// Get department by department number
const getDepartmentByDeptNo = async (deptNo) => {
  const entityManager = getManager();
  const department = await entityManager.findOne(Department, {
    dept_no: deptNo,
  });
  return department;
};

// Create a new department
const createDepartment = async (departmentData) => {
  const entityManager = getManager();
  const department = entityManager.create(Department, departmentData);
  await entityManager.save(department);
  return department;
};

// Update a department
const updateDepartment = async (deptNo, departmentData) => {
  const entityManager = getManager();
  const department = await entityManager.findOne(Department, {
    dept_no: deptNo,
  });
  if (!department) {
    throw new Error("Department not found");
  }
  entityManager.merge(Department, department, departmentData);
  await entityManager.save(department);
  return department;
};

// Delete a department
const deleteDepartment = async (deptNo) => {
  const entityManager = getManager();
  const department = await entityManager.findOne(Department, {
    dept_no: deptNo,
  });
  if (!department) {
    throw new Error("Department not found");
  }
  await entityManager.remove(department);
};

module.exports = {
  getAllDepartments,
  getDepartmentByDeptNo,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
