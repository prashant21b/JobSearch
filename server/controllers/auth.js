const User=require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Manual validation
    if (!name || !email || !password) {
        return res.status(400).json({ errors: [{ msg: 'All fields are required' }] });
    }
    if (password.length < 6) {
        return res.status(400).json({ errors: [{ msg: 'Password must be at least 6 characters' }] });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ errors: [{ msg: 'Please include a valid email' }] });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Manual validation
        if (!email || !password) {
            return res.status(400).json({ errors: [{ msg: 'All fields are required' }] });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ errors: [{ msg: 'Please include a valid email' }] });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        // Check if the password matches
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send("Incorrect Password");
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
       
        // Remove sensitive data before sending the response
        user.password = undefined;

        res.status(200).json({
             success:true,
            token,
            user
        });
    } catch (error) {
        console.log("Error in Login", error);
        return res.status(400).send("Error! Try again");
    }
};
