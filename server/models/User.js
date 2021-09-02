const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

module.exports = User;