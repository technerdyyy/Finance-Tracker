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

}, { timeseries: true }
);

const userModel = mongoose.model("users", userSchema)
module.exports = userModel