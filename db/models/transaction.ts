export interface TransactionAttributes {
    id: number;
    userid: number;
    terminal: number;
    amount: number;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  import sequelizeConnection from '../config';
  import { Model, DataTypes } from 'sequelize';
  const sequelize = sequelizeConnection;

  
  class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
    public id!: number;
    public userid!: number;
    public terminal!: number;
    public amount!: number;
    public status!: boolean;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
  }
  
  Transaction.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    terminal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'transactions', // the name of your database table
    timestamps: true, // whether to include createdAt and updatedAt columns
    underscored: true, // whether to use underscores instead of camelCase for column names
  });

  export default Transaction;