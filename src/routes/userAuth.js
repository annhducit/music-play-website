const express = require('express');
const { body } = require('express-validator');

const userAuthController = require('../app/controllers/UserAuthController');

const redirectIfLoggedIn = require('../middlewares/redirectIfLoggedIn');

const router = express.Router();


const loginValidationRules = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

const registerValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be one of ' + ['male', 'female', 'other']),
    body('dateOfBirth')
        .notEmpty()
        .withMessage('Date of Birth is required')
        .isDate()
        .withMessage('Date of Birth is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

router.get('/login', redirectIfLoggedIn, userAuthController.index);
router.post('/login', loginValidationRules, userAuthController.login);
router.post('/register', registerValidationRules, userAuthController.register);
router.get('/logout', userAuthController.logout);

module.exports = router;
