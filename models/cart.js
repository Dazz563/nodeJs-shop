// Actual Sequelize package
const Sequelize = require('sequelize');
// Our DB sequelize instance
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Cart;