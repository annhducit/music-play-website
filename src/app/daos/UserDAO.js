const bcrypt = require('bcrypt');

const User = require('../models/User');
const CustomError = require('../utils/CustomError');
const MongooseParser = require('../utils/MongooseParser');

class UserDAO {
    async create(info) {
        try {
            // Check email already exists
            const isEmailExists = await this.isEmailExists(info.email);
            if (isEmailExists) {
                throw new CustomError(409, 'Email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(info.password, 10);

            // Create data
            const user = new User({
                ...info,
                password: hashedPassword,
            });
            await user.save();
            return user.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, 'Internal server error');
        }
    }

    async read(id) {
        try {
            // Read data
            const user = await User.findById(id);
            if (!user) {
                throw new CustomError(404, 'User not found');
            }
            return user.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading user by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const users = await User.find();
            return MongooseParser.toArray(users);
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all users: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Check user already exists
            const tmp = await User.findById(id);
            if (!tmp) {
                throw new CustomError(404, 'User not found');
            }

            // Check email already exists
            const isEmailExists = await this.isEmailExists(info.email);
            if (isEmailExists && tmp.email !== info.email) {
                throw new CustomError(409, 'Email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(info.password, 10);

            // Update data
            const user = await User.findByIdAndUpdate(id, {
                ...info,
                password: hashedPassword,
            });
            return user.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating user: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            // Delete data
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new CustomError(404, 'User not found');
            }
            return user.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting user: ${err.message}`);
        }
    }

    async login(email, password) {
        try {
            // Get data by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new CustomError(
                    404,
                    'Username or password is not correct',
                );
            }

            // Get stored password
            const hashedPassword = user.password;
            const isMatched = await bcrypt.compare(password, hashedPassword);
            if (!isMatched) {
                throw new CustomError(
                    404,
                    'Username or password is not correct',
                );
            }

            return user.toObject();
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, 'Internal server error');
        }
    }

    async isEmailExists(email) {
        try {
            const user = await User.findOne({ email });
            return !!user;
        } catch (err) {
            throw new CustomError(
                500,
                `Error checking if email exists: ${err.message}`,
            );
        }
    }
}

module.exports = new UserDAO();
