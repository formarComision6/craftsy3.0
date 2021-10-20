'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.Cart,{
        as : 'carts',
        foreignKey : 'orderId',
        onDelete : 'cascade'
      })
      Order.belongsTo(models.User,{
        as : 'user',
        foreignKey : 'userId',
      })
    }
  };
  Order.init({
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};