const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Movement extends Model {}
Movement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize,
    modelName: "movement",
    timestamps: false,
});

module.exports = Movement;