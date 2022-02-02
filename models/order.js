// Actual Sequelize package
const Sequelize = require('sequelize');
// Our DB sequelize instance
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Order;