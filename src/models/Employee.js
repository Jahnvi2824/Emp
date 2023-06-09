// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//   name: "Employee",
//   tableName: "employees",
//   columns: {
//     emp_no: {
//       type: "int",
//       primary: true,
//       generated: false,
//     },
//     birth_date: {
//       type: "date",
//     },
//     first_name: {
//       type: "varchar",
//       length: 14,
//     },
//     last_name: {
//       type: "varchar",
//       length: 16,
//     },
//     gender: {
//       type: "enum",
//       enum: ["M", "F"],
//     },
//     hire_date: {
//       type: "date",
//     },
//   },
// });

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
      type: "varchar",
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
      type: "varchar",
    },
  },
  relations: {
    salaries: {
      target: "Salary",
      type: "one-to-many",
      inverseSide: "employee",
      joinColumn: {
        name: "emp_no",
        referencedColumnName: "emp_no",
      },
    },
    titles: {
      target: "Title",
      type: "one-to-many",
      inverseSide: "employee",
      joinColumn: {
        name: "emp_no",
        referencedColumnName: "emp_no",
      },
    },
    deptEmployees: {
      target: "DeptEmployee",
      type: "one-to-many",
      inverseSide: "employee",
      joinColumn: {
        name: "emp_no",
        referencedColumnName: "emp_no",
      },
    },
    deptManagers: {
      target: "DeptManager",
      type: "one-to-many",
      inverseSide: "employee",
      joinColumn: {
        name: "emp_no",
        referencedColumnName: "emp_no",
      },
    },
  },
});
