const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.json({ message: 'register works' });
});

module.exports = router;