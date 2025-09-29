const path = require('node:path');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');
const indexRouter = require('./routes/index');

const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./config/mongooseConnection');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    resave: false, // Don't save again and again if something is not changing
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/owners', ownersRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});