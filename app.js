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
const { Console } = require('console');
const Product = require('./models/product');
const User = require('./models/user');
const { getMaxListeners } = require('process');

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

// A USER CREATES A PRODUCT - MANY-TO-ONE
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// INVERSE ONE-TO-MANY
User.hasMany(Product);

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
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });