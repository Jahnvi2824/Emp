// const { getManager } = require("typeorm");
// const Salary = require("../models/Salary");

// // Salary service methods
// // Have to Implement salary-related business logic here

const { getManager } = require("typeorm");
const Salary = require("../models/Salary");

// Get all salaries
const getAllSalaries = async () => {
  const entityManager = getManager();
  const salaries = await entityManager.find(Salary);
  return salaries;
};

// Get salary by employee number
const getSalaryByEmpNo = async (empNo) => {
  const entityManager = getManager();
  const salary = await entityManager.findOne(Salary, { emp_no: empNo });
  return salary;
};

// Create a new salary
const createSalary = async (salaryData) => {
  const entityManager = getManager();
  const salary = entityManager.create(Salary, salaryData);
  await entityManager.save(salary);
  return salary;
};

// Update a salary
const updateSalary = async (empNo, salaryData) => {
  const entityManager = getManager();
  const salary = await entityManager.findOne(Salary, { emp_no: empNo });
  if (!salary) {
    throw new Error("Salary not found");
  }
  entityManager.merge(Salary, salary, salaryData);
  await entityManager.save(salary);
  return salary;
};

// Delete a salary
const deleteSalary = async (empNo) => {
  const entityManager = getManager();
  const salary = await entityManager.findOne(Salary, { emp_no: empNo });
  if (!salary) {
    throw new Error("Salary not found");
  }
  await entityManager.remove(salary);
};

module.exports = {
  getAllSalaries,
  getSalaryByEmpNo,
  createSalary,
  updateSalary,
  deleteSalary,
};
