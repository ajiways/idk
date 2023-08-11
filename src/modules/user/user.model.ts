import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ name: { plural: 'users', singular: 'user' } })
export class User extends Model {
  @Column({ allowNull: true, type: DataType.STRING, unique: true })
  phone: string;

  @Column({ allowNull: true, type: DataType.STRING, unique: true })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;
}
