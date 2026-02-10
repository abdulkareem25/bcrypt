const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signUpController = async (req, res) => {
    const { name, email, password } = req.body;

    const isExists = await userModel.findOne({ email });

    if (isExists) {
        return res.status(409).json({
            message: "User already exists."
        });
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    });

    const payload = {
        id: user._id
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
};

const signInController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!user || !isValid) {
        return res.status(401).json({
            message: "Invalid Credentials."
        });
    };

    const payload = {
        id: user._id
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET
    );

    res.cookie('jwt_token', token);

    res.status(200).json({
        message: "User logged in Successfully.",
        user,
        token
    });
};

module.exports = { signUpController, signInController };