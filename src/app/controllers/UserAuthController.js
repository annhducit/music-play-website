const { validationResult } = require('express-validator');

const UserDAO = require('../daos/UserDAO');

class AuthController {
    // [GET]: /login
    index(req, res) {
        res.render('login_register', {
            layout: 'nolayout',
        });
    }

    // [POST]: /login
    async login(req, res) {
        const { email, password, rememberMe } = req.body;
        const info = req.body;

        // Validate info
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login_register', {
                layout: 'nolayout',
                info,
                loginError: errors.array()[0].msg,
            });
        }

        // Handle login
        try {
            const user = await UserDAO.login(email, password);

            // Set session
            req.session.userId = user._id;
            req.session.user = user;

            // Set remember me cookie if checked
            if (rememberMe) {
                res.cookie('rememberMe', user._id, {
                    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
                    secure: false, // Set to true if using HTTPS
                    httpOnly: true, // Prevents client side access to cookie
                });
            }

            res.redirect(303, '/');
        } catch (err) {
            res.render('login_register', {
                layout: 'nolayout',
                info,
                loginError: err.message,
            });
        }
    }

    // [POST]: /register
    async register(req, res) {
        const info = req.body;

        // Validate info
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login_register', {
                layout: 'nolayout',
                register: 'right-panel-active',
                info,
                registerError: errors.array()[0].msg,
            });
        }

        // Create a new user
        try {
            await UserDAO.create(info);
            res.render('login_register', {
                layout: 'nolayout',
                register: 'right-panel-active',
                success: 'Account created successfully! ^^',
            });
        } catch (err) {
            res.render('login_register', {
                layout: 'nolayout',
                register: 'right-panel-active',
                info,
                registerError: err.message,
            });
        }
    }

    // [GET]: /logout
    logout(req, res) {
        req.session.destroy();
        res.clearCookie('rememberMe');
        res.redirect(303, '/');
    }
}

module.exports = new AuthController();
