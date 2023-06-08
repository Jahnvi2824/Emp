const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity({ schema: "Employee" })
class Emp {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;
}

module.exports = Emp;
