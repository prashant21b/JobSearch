

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        minlength: 6 
    },
    googleId:{
        type:String,
        unique:true,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
