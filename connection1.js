const { DataSource } = require("typeorm");
const Employee = require("./src/models/Employee");
// const Emp = require("./src/models/dummy");
const Department = require("./src/models/Department");
const DeptEmployee = require("./src/models/DeptEmployee");
const DeptManager = require("./src/models/DeptManager");
const Salary = require("./src/models/Salary");
const Title = require("./src/models/Title");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Jahnvi@28",
  database: "employees",
  synchronize: true,
  logging: true,
  entities: [Employee, Salary, DeptManager, DeptEmployee, Department, Title],
  extra: {
    trustServerCertificate: true,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
