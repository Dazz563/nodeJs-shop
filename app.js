const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
// IMPORTING MODELS
const User = require('./models/user');

const app = express();

// SETS TEMPLATING ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

//IMPORTING ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ADDING THE USER TO OUR REQUEST OBJECT
app.use((req, res, next) => {
    User.findById('61faab3c681a710f5676f0e7')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

// USING ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})