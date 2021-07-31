const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Server has up and running");
});

module.exports = router;