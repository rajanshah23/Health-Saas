import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "user",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM(
      "admin",
      "doctor",
      "staff",
      "pharmacist",
      "lab",
      "receptionist"
    ),

    defaultValue: "admin", // default role admin
  })
  declare role: string;
}

export default User;
