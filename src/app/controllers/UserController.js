const UserDAO = require('../daos/UserDAO');
const StringUtils = require('../utils/StringUtils');

class UserController {
    // [GET]: /api/users
    async index(req, res) {
        // Read all users
        try {
            const users = await UserDAO.readAll();
            res.json({
                message: 'List of users read successfully',
                data: users,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/users/:id
    async read(req, res) {
        // Get request data
        const id = req.params.id;

        // Read user
        try {
            const user = await UserDAO.read(id);
            res.json({
                message: 'User read successfully',
                data: user,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: /api/users/create
    async create(req, res) {
        // Get request data
        const {
            email = '',
            password = '',
            name = '',
            gender = '',
            dateOfBirth = '',
            imageLink = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (email.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidEmail(email)) {
            isValid = false;
        } else if (password.length === 0) {
            isValid = false;
        } else if (name.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidGender(gender)) {
            isValid = false;
        } else if (!StringUtils.isValidDate(dateOfBirth)) {
            isValid = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Create user
        try {
            const user = await UserDAO.create({
                email,
                password,
                name,
                gender,
                dateOfBirth,
                imageLink,
            });
            res.status(201).json({
                message: 'User created successfully',
                data: user,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [PUT]: /api/users/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const {
            email = '',
            password = '',
            name = '',
            gender = '',
            dateOfBirth = '',
            imageLink = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (email.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidEmail(email)) {
            isValid = false;
        } else if (password.length === 0) {
            isValid = false;
        } else if (name.length === 0) {
            isValid = false;
        } else if (!StringUtils.isValidGender(gender)) {
            isValid = false;
        } else if (!StringUtils.isValidDate(dateOfBirth)) {
            isValid = false;
        } else if (imageLink.length === 0) {
            isValid = false;
        }
        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update user
        try {
            const user = await UserDAO.update(id, {
                email,
                password,
                name,
                gender,
                dateOfBirth,
                imageLink,
            });
            res.json({
                message: 'User updated successfully',
                data: user,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /api/users/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete user
        try {
            const user = await UserDAO.delete(id);
            res.json({
                message: 'User deleted successfully',
                data: user,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new UserController();
