const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session =require('express-session');
const authController = require('./controllers/auth.js')
const methodOverride = require('method-override');
//const formsController= require('./controllers/');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const app = express();
dotenv. config();


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected',() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Form = require('./models/form.js');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get('/', (req, res) => {
    if(req.session.user){
        res.redirect(`users/${req.session.user._id}forms`)
    }else {
        res.render('index.ejs');
    }
  });

app.use('/auth', authController);
app.use(isSignedIn);
 





app.listen(3000, () => {
  console.log('Listening on port 3000');
});
