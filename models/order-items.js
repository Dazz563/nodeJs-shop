// Actual Sequelize package
const Sequelize = require('sequelize');
// Our DB sequelize instance
const sequelize = require('../util/database');

const OrderItem = sequelize.define('order_item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;