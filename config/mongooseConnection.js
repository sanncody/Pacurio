const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose'); // Setting debugger

mongoose.connect(`${config.get('MONGODB_URI')}/scatch`)
.then(() => {
    dbgr("Connected to DB successfully ✅");
})
.catch((err) => {
    dbgr("Error connecting to Database❌", err);
})

module.exports = mongoose.connection;