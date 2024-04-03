const UserDAO = require('../app/daos/UserDAO');

// Middleware to get user data for login session
const userAuth = async (req, res, next) => {
    // Check for session
    if (req.session.userId) {
        try {
            const user = await UserDAO.read(req.session.userId);
            req.session.user = user;
        } catch (err) {}
    }

    // Check for remember me cookie
    if (req.cookies.rememberMe) {
        try {
            const userId = req.cookies.rememberMe;
            const user = await UserDAO.read(userId);
            req.session.userId = user._id;
            req.session.user = user;
        } catch (err) {}
    }

    next();
};

module.exports = userAuth;
