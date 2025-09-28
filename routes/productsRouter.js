const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to Product's Endpoint");
});

module.exports = router;