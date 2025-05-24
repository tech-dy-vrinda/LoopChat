const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,  // Ensure the username is unique
      trim: true,  // Trim any spaces from the username
      minlength: [3, 'Username must be at least 3 characters long'], // Minimum length validation
      maxlength: [50, 'Username can\'t be longer than 50 characters'], // Maximum length validation
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure the email is unique
      lowercase: true,  // Convert email to lowercase before saving
      validate: {
        validator: function (value) {
          // Basic email format validation
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'], // Minimum length validation
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
