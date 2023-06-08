const express = require("express");
const app = express();

// Importing route files
const employeeRoutes = require("./src/routes/employeeRoutes");
const salaryRoutes = require("./src/routes/salaryRoutes");
const titleRoutes = require("./src/routes/titleRoutes");
const deptManagerRoutes = require("./src/routes/deptManagerRoutes");
const deptEmployeeRoutes = require("./src/routes/deptEmployeeRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");

// Configure routes
app.use("/employees", employeeRoutes);
app.use("/salaries", salaryRoutes);
app.use("/titles", titleRoutes);
app.use("/deptManagers", deptManagerRoutes);
app.use("/deptEmployees", deptEmployeeRoutes);
app.use("/departments", departmentRoutes);

// Starting  the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
