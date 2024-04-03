// Middle to redirect if logged in
const redirectIfLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect(303, '/login');
    } else {
        next();
    }
};

module.exports = redirectIfLoggedIn;
