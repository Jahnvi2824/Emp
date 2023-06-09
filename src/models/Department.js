const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Department",
  tableName: "departments",
  columns: {
    dept_no: {
      type: "char",
      length: 4,
      primary: true,
      generated: false,
    },
    dept_name: {
      type: "varchar",
      length: 40,
    },
  },
});
