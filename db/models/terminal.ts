interface TerminalAttributes {
    id: number;
    name: string;
    merchant: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  import sequelizeConnection from '../config';
  import { Model, DataTypes } from 'sequelize';
  const sequelize = sequelizeConnection;

  
  class Terminal extends Model<TerminalAttributes> implements TerminalAttributes {
    public id!: number;
    public name!: string;
    public merchant!: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
  }
  
  Terminal.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'terminals', // the name of your database table
    timestamps: true, // whether to include createdAt and updatedAt columns
    underscored: true, // whether to use underscores instead of camelCase for column names
  });

  export default Terminal;