const path = require('node:path');

const express = require('express');
const cookieParser = require('cookie-parser');

const dbConnect = require('./config/mongooseConnection');

const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome to Scatch Application");
});

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/owners', ownersRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});