const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const supabase = require('../db/supabaseDbClient');

// Sign-up API
router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Check if user already exists
        const { data: existingUser, error: existingUserError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists, please try with different email' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const { data, error } = await supabase
            .from('users')
            .insert([{ first_name, last_name, email, password: hashedPassword }]);

        if (error) throw error;

        res.status(201).json({ msg: `User registered successfully! login to access your account` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error, Please try again');
    }
});

// Sign-in API
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(400).json({ msg: 'Invalid credentials pleasae check email' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials please check your password' });
        }

        res.json({ msg: `Login successful! Welcome ${user.first_name} ${user.last_name}`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error, Please try again');
    }
});

module.exports = router;
