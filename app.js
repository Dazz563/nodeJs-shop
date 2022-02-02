const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

// SETS TEMPLATING ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

//IMPORTING ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { Console } = require('console'); // ???

// IMPORTING MODELS
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');

const { getMaxListeners } = require('process');
const { getProducts } = require('./controllers/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ADDING THE USER TO OUR REQUEST OBJECT
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// ASSOCIATIONS --------------------------------------------------------------

// A USER CREATES A PRODUCT - MANY-TO-ONE
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// INVERSE ONE-TO-MANY
User.hasMany(Product);

// A USER HAVE ONE CART - ONE-TO-ONE
User.hasOne(Cart);
// INVERSE - ONE-TO-ONE
Cart.belongsTo(User);

// CARTS BELONG TO MANY PRODUCTS - MANY-TO-MANY
Cart.belongsToMany(Product, { through: CartItem });
// PRODUCTS BELONG TO MANY CART - MANY-TO-MANY
Product.belongsToMany(Cart, { through: CartItem });

// AN ORDER BELONGS TO A USER - ONE-TO-ONE
Order.belongsTo(User);
// USER MAY HAVE MANY ORDERS - ONE-TO-MANY
User.hasMany(Order);
// ORDERS CAN BELONG TO MANY PRODUCTS - MANY-TO-MANY
Order.belongsToMany(Product, { through: OrderItem });

// sequelize.sync({ force: true })
sequelize.sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Darren', email: 'test@gmail.com' })
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });