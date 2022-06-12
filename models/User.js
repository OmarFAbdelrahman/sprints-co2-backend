const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true , "Email is required"],
    unique: [true, "Email is already in use"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true , "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  FirstName: {
    type: String,
    required: [true , "FirstName is required"],
    minlength: 2,
  },
  lastName: {
    type: String,
    required: [true , "LastName is required"],
    minlength: 2,
  },
  phone: {
    type: String,
    required: [true , "Phone is required"],
    minlength: 10,
    maxlength: 10,
  },
  shipping_address: {
    type: String,
    required: [true , "Shipping Address is required"],
    minlength: 2,
  },
  billing_address: {
    type: String,
    required: true,
    minlength: 2,
  },
  gender: {
    type: Boolean,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  role:{
      type: Boolean,
      default: false
  }
  ,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
});

userSchema.pre("save", async function(next) { 

    const salt = await bcrypt.genSaltSync();
    // console.log("this is about to be saved" , this);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const User = mongoose.model("User", userSchema);
module.exports = User;