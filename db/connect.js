const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect("mongodb+srv://Sprints:XZCkxJ23gTbJ5arZ@sprintsecommercedb.smrvb.mongodb.net/eCommerceDB?retryWrites=true&w=majority");
};

module.exports = connectDB;
