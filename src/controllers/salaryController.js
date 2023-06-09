// const { AppDataSource } = require("typeorm");
// const Salary = require("../models/Salary");

// // Salary controller methods
// // have to Implement salary-related operations here

const Salary = require("../models/Salary");
const AppDataSource = require("../../connection1");

// Get all salaries
const getAllSalaries = async (req, res) => {
  try {
    const salaryRepository = AppDataSource.getRepository(Salary);
    const salaries = await salaryRepository.find();
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get salary by emp_no
const getSalaryByEmpNo = async (req, res) => {
  try {
    const { empNo } = req.params;
    const salaryRepository = AppDataSource.getRepository(Salary);
    const salary = await salaryRepository.findOne(empNo);

    if (salary) {
      res.json(salary);
    } else {
      res.status(404).json({ error: "Salary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new salary
const createSalary = async (req, res) => {
  try {
    const { empNo, salary, fromDate, toDate } = req.body;

    const salaryRepository = AppDataSource.getRepository(Salary);

    // Check if salary for the same empNo already exists
    const existingSalary = await salaryRepository.findOne(empNo);
    if (existingSalary) {
      return res
        .status(400)
        .json({ error: "Salary for the same empNo already exists" });
    }

    const newSalary = salaryRepository.create({
      emp_no: empNo,
      salary: salary,
      from_date: fromDate,
      to_date: toDate,
    });

    await salaryRepository.save(newSalary);
    res.status(201).json({ message: "Salary created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing salary
const updateSalary = async (req, res) => {
  try {
    const { empNo } = req.params;
    const { Salary, fromDate, toDate } = req.body;

    const salaryRepository = AppDataSource.getRepository(Salary);
    const salary = await salaryRepository.findOne(empNo);

    if (salary) {
      salary.salary = salary;
      salary.from_date = fromDate;
      salary.to_date = toDate;

      await salaryRepository.save(salary);
      res.json({ message: "Salary updated successfully" });
    } else {
      res.status(404).json({ error: "Salary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a salary
const deleteSalary = async (req, res) => {
  try {
    const { empNo } = req.params;

    const salaryRepository = AppDataSource.getRepository(Salary);
    const salary = await salaryRepository.findOne(empNo);

    if (salary) {
      await salaryRepository.remove(salary);
      res.json({ message: "Salary deleted successfully" });
    } else {
      res.status(404).json({ error: "Salary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllSalaries,
  getSalaryByEmpNo,
  createSalary,
  updateSalary,
  deleteSalary,
};
