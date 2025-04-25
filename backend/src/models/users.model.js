const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    companies: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Company'
    }]
});
/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
