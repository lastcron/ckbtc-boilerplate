interface UserAttributes {
    id: number;
    username: string;
    merchant: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  import sequelizeConnection from '../config';
  import { Model, DataTypes } from 'sequelize';
  const sequelize = sequelizeConnection;

  
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public merchant!: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchant: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'posts', // the name of your database table
    timestamps: true, // whether to include createdAt and updatedAt columns
    underscored: true, // whether to use underscores instead of camelCase for column names
  });

  export default User;