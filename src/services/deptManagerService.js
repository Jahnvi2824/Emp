// const { getManager } = require("typeorm");
// const DeptManager = require("../models/DeptManager");

// // Department Manager service methods
// //Have to  Implement department manager-related business logic here

const { getManager } = require("typeorm");
const DeptManager = require("../models/DeptManager");

// Get all department managers
const getAllDeptManagers = async () => {
  const entityManager = getManager();
  const deptManagers = await entityManager.find(DeptManager);
  return deptManagers;
};

// Get department manager by department number
const getDeptManagerByDeptNo = async (deptNo) => {
  const entityManager = getManager();
  const deptManager = await entityManager.findOne(DeptManager, {
    dept_no: deptNo,
  });
  return deptManager;
};

// Create a new department manager
const createDeptManager = async (deptManagerData) => {
  const entityManager = getManager();
  const deptManager = entityManager.create(DeptManager, deptManagerData);
  await entityManager.save(deptManager);
  return deptManager;
};

// Update a department manager
const updateDeptManager = async (deptNo, deptManagerData) => {
  const entityManager = getManager();
  const deptManager = await entityManager.findOne(DeptManager, {
    dept_no: deptNo,
  });
  if (!deptManager) {
    throw new Error("Department manager not found");
  }
  entityManager.merge(DeptManager, deptManager, deptManagerData);
  await entityManager.save(deptManager);
  return deptManager;
};

// Delete a department manager
const deleteDeptManager = async (deptNo) => {
  const entityManager = getManager();
  const deptManager = await entityManager.findOne(DeptManager, {
    dept_no: deptNo,
  });
  if (!deptManager) {
    throw new Error("Department manager not found");
  }
  await entityManager.remove(deptManager);
};

module.exports = {
  getAllDeptManagers,
  getDeptManagerByDeptNo,
  createDeptManager,
  updateDeptManager,
  deleteDeptManager,
};
