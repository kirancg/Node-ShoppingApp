const path = require('path');
const mongoose = require('mongoose');


const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://kirancg93:Random@123@shoppingapp-k6pkg.mongodb.net/test?retryWrites=true&w=majority'
,{ useNewUrlParser: true })
.then(result => {
app.listen(3000)
})
.catch(err => {
console.log(err);
});


