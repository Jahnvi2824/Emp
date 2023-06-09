// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//   name: "DeptEmployee",
//   tableName: "dept_emp",
//   columns: {
//     emp_no: {
//       type: "int",
//       primary: true,
//       generated: false,
//     },
//     dept_no: {
//       type: "char",
//       length: 4,
//       primary: true,
//       generated: false,
//     },
//     from_date: {
//       type: "date",
//     },
//     to_date: {
//       type: "date",
//     },
//   },
// });

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "DeptEmployee",
  tableName: "dept_emp",
  columns: {
    emp_no: {
      type: "int",
      primary: true,
      generated: false,
    },
    dept_no: {
      type: "char",
      length: 4,
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
  relations: {
    employee: {
      target: "Employee",
      type: "many-to-one",
      joinColumn: {
        name: "emp_no",
        referencedColumnName: "emp_no",
      },
    },
    department: {
      target: "Department",
      type: "many-to-one",
      joinColumn: {
        name: "dept_no",
        referencedColumnName: "dept_no",
      },
    },
  },
});
