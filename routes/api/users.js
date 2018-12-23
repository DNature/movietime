const express = require("express");
const router = express.Router();
const uuid = require("uuidv4");
// Load User model
const User = require("../../models/User");

const totalSeats = 500;
let currentSeat = 1;

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/create", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    prefferedDate,
    prefferedTime,
    tickets,
    movieId
  } = req.body;

  const bookingCode = String(uuid()).split("-")[0];

  const user = new User({
    firstname,
    lastname,
    email,
    phone,
    bookingCode,
    prefferedDate,
    prefferedTime,
    tickets,
    movieId
  });

  user.save().then(user => {
    res.status(201).json({
      status: "ok",
      success: true,
      message: "User Created",
      user
    });
  }).catch(err => {
    res.status(400).json({
      status: 'not ok',
      success: false,
      message: "User not Created",
      err
    });
  })
});

router.patch("/update/:id", (req, res) => {
  const { reference } = req.body;
  User.findByIdAndUpdate(req.params.id, {reference}, {new: true})
    .then(user => {
      res.status(201).json({
        status: "ok",
        success: true,
        message: "User Updated",
        user
      });
    })
    .catch(err => {
      res.status(400).json({
        status: 'not ok',
        success: false,
        message: "User not Updated",
        err
      });
    })
});

module.exports = router;
