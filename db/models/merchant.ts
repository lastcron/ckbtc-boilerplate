interface MerchantAttributes {
    id: number;
    name: string;
    ckbtcaddress: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  import sequelizeConnection from '../config';
  import { Model, DataTypes } from 'sequelize';
  const sequelize = sequelizeConnection;

  
  class Merchant extends Model<MerchantAttributes> implements MerchantAttributes {
    public id!: number;
    public name!: string;
    public ckbtcaddress!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
  }
  
  Merchant.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ckbtcaddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'merchants', // the name of your database table
    timestamps: true, // whether to include createdAt and updatedAt columns
    underscored: true, // whether to use underscores instead of camelCase for column names
  });

  export default Merchant;