const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Title",
  tableName: "titles",
  columns: {
    emp_no: {
      type: "int",
      primary: true,
      generated: false,
    },
    title: {
      type: "varchar",
      length: 50,
    },
    from_date: {
      type: "date",
    },
    to_date: {
      type: "date",
    },
  },
});
