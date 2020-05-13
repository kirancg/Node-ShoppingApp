const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5ebae927d252f154f8ebfefe')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//connecting to the database
mongoose
.connect('mongodb+srv://kirancg93:Random@123@shoppingapp-k6pkg.mongodb.net/test?retryWrites=true&w=majority'
    , { useNewUrlParser: true })
    
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Kiran',
                    email: 'kiran@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    });