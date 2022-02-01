const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_shopping_cart_db',
    password: 'root'
});

module.exports = pool.promise();