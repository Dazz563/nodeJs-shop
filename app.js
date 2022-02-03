const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// IMPORTING MODELS
const User = require('./models/user');

const app = express();

// SETS TEMPLATING ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

//IMPORTING ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { getMaxListeners } = require('process');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('61fb8ca07ead0c42705bc0c3')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// USING ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://darren-user:jpmpNIJHLvEA0UVu@cluster0.2yyh4.mongodb.net/shopping_cart_node?retryWrites=true&w=majority')
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Darren',
                        email: 'test@gmail.com',
                        cart: {
                            items: [],
                        }
                    });
                    user.save();
                }
            })
        app.listen(3000);
    })
    .catch(err => console.log(err));