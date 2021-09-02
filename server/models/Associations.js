const User = require('../models/User');
const Movement = require('../models/Movement');
const Category = require('../models/Category');

User.hasMany(Movement);
Movement.belongsTo(User);
Movement.belongsTo(Category, {
    as: 'category',
    foreignKey: 'categoryId',
    targetKey: 'id'
});

