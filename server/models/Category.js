const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Category extends Model {}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "category",
    timestamps: false
});

module.exports = Category;