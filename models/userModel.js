const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "a unique email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }

}, { timestamps: true }
);

const userModel = mongoose.model("User", userSchema)
module.exports = userModel