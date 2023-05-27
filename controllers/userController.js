const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are required.");
    }
    const userAvail = await User.findOne({email});
    if (userAvail) {
        res.status(400);
        throw new Error("User already exists");
    }
    //hash password giving the raw password and salt rounds
    const hashedpassword = await bcrypt.hash(password, 5);
    console.log("hashed password: ", hashedpassword);
    const user = await User.create({
        userName: userName,
        email: email,
        password: hashedpassword
    });
    console.log('User created: ', user);
    if (user) {
        res.status(201).json({id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User data is not available or valid");
    }
    res.json({message: 'User registration completed successfully'});
});

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email, !password) {
        res.status(403);
        throw new Error ('Email and password are not valid');
    }
    const user = await User.findOne({email: email});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({accessToken});
    }
    res.json({message: 'User logged in successfully'});
});

//@desc Current user
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json({message: 'Current user information'});
});

module.exports = { registerUser, loginUser, currentUser };