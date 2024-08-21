const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Make sure firstName is provided
    trim: true
  },
  lastName: {
    type: String,
    required: true, // Make sure lastName is provided
    trim: true
  },
  email: {
    type: String,
    required: true, // Make sure email is provided
    unique: true,   // Ensure email is unique
    trim: true
  },
  password: {
    type: String,
    required: true, // Make sure password is provided
    minlength: 6    // Ensure password is at least 6 characters
  },
  followings: { 
    type: Number, 
    default: 0 
  },
  followers: { 
    type: Number, 
    default: 0 
  },
  followersList: [{ 
    type: mongoose.Schema.Types.ObjectId, // Change to ObjectId if storing user references
    ref: 'User',
    default: []
  }]
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);