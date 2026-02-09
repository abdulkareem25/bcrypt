const userModel = require('../models/user.model');
const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();


authRouter.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    const isExists = await userModel.findOne({ email });

    if(isExists) {
        return res.status(400).json({
            message: "User already exists."
        });
    };

    const user = await userModel.create({
        name, 
        email,
        password
    });

    const payload = {
        id: user._id,
        email: user.email
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
    );

    res.cookie('jwt_token', token);

    res.status(201).json({
        message: "User registered successfully.",
        user,
        token
    });
});


module.exports = authRouter;