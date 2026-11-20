const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const hash = await bcrypt.hash(password, 10);
    console.log('hash:', hash);

    res.json({ message: 'register works' });
});

module.exports = router;