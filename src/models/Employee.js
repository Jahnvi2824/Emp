const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Employee",
  tableName: "employees",
  columns: {
    emp_no: {
      type: "int",
      primary: true,
      generated: false,
    },
    birth_date: {
      type: "date",
    },
    first_name: {
      type: "varchar",
      length: 14,
    },
    last_name: {
      type: "varchar",
      length: 16,
    },
    gender: {
      type: "enum",
      enum: ["M", "F"],
    },
    hire_date: {
      type: "date",
    },
  },
});
