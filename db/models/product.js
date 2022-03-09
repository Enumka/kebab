const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'courId', as: 'cour' });
      this.belongsTo(models.User, { foreignKey: 'custId', as: 'cust' });
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      geo: DataTypes.STRING,
      img: DataTypes.TEXT,
      courId: DataTypes.INTEGER,
      custId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
