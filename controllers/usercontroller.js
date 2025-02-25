const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });

        await newUser.save();

        console.log("✅ User successfully saved:", newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(400).json({
            success: false,
            message: "Registration failed",
            error: error.message, // Return error message to frontend
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

module.exports = { loginController, registerController };
