const userModel = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const errMess = "Username or Password is incorrect!!";

// Signup Function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User Already Exists....",
                success: false
            });
        }

        // Create a new user
        const newUser = new userModel({ name, email, password });

        // Hash the password before saving
        newUser.password = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await newUser.save();

        // Return a successful signup response
        res.status(201).json({
            message: "Sign Up Successful",
            success: true
        });
    } catch (err) {
        // Return an internal server error response
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        // If user is not found, return an error
        if (!user) {
            return res.status(403).json({
                message: errMess,
                success: false
            });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPassEqual = await bcrypt.compare(password, user.password);

        // If the passwords do not match, return an error
        if (!isPassEqual) {
            return res.status(403).json({
                message: errMess,
                success: false
            });
        }

        // Create a JWT token with the user's email and id
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your environment variables
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        // Return a successful login response with the JWT token
        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        // Return an internal server error response
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Export the signup and login functions
module.exports = { signup, login };
