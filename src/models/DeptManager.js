const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "DeptManager",
  tableName: "dept_manager",
  columns: {
    dept_no: {
      type: "char",
      length: 4,
      primary: true,
      generated: false,
    },
    emp_no: {
      type: "int",
      primary: true,
      generated: false,
    },
    from_date: {
      type: "date",
    },
    to_date: {
      type: "date",
    },
  },
});
