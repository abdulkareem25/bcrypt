const express = require('express');
const { signUpController, signInController } = require('../controllers/auth.controllers');

const authRouter = express.Router();


authRouter.post('/sign-up', signUpController);

authRouter.post('/sign-in', signInController);


module.exports = authRouter;