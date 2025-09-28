const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://peednascooldude:12345@cluster0.qqajo.mongodb.net/scatch")
.then(() => {
    console.log("Connected to DB successfully ✅");
})
.catch((err) => {
    console.log("Error connecting to Database❌", err);
})

module.exports = mongoose.connection;