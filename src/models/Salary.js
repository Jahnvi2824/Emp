const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Salary",
  tableName: "salaries",
  columns: {
    emp_no: {
      type: "int",
      primary: true,
      generated: false,
    },
    salary: {
      type: "int",
    },
    from_date: {
      type: "date",
    },
    to_date: {
      type: "date",
    },
  },
});
