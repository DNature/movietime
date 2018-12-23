const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  }
});

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
  bookingCode: {
    type: String,
    required: true
  },
  prefferedDate: {
    type: String,
    required: true
  },
  prefferedTime: {
    type: String,
    required: true
  },
  tickets: {
    type: Number,
    required: true
  },
  movieId: {
    type: Number
  },
  reference: {
    type: String,
    required: false
  },
  seats: [seatSchema]
});

UserSchema.plugin(timestamps)

module.exports = User = mongoose.model("users", UserSchema);
