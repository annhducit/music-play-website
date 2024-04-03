const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');
const CustomError = require('../utils/CustomError');

class AdminDAO {
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
            const admin = new Admin({
                ...info,
                password: hashedPassword,
            });
            await admin.save();
            return admin;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error creating admin: ${err.message}`);
        }
    }

    async read(id) {
        try {
            // Read data
            const admin = await Admin.findById(id);
            if (!admin) {
                throw new CustomError(404, 'Admin not found');
            }
            return admin;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading admin by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const admins = await Admin.find();
            return admins;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all admins: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Check admin already exists
            const tmp = await Admin.findById(id);
            if (!tmp) {
                throw new CustomError(404, 'Admin not found');
            }

            // Check email already exists
            const isEmailExists = await this.isEmailExists(info.email);
            if (isEmailExists && tmp.email !== info.email) {
                throw new CustomError(409, 'Email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(info.password, 10);

            // Update data
            const admin = await Admin.findByIdAndUpdate(id, {
                ...info,
                password: hashedPassword,
            });
            return admin;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating admin: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            // Delete data
            const admin = await Admin.findByIdAndDelete(id);
            if (!admin) {
                throw new CustomError(404, 'Admin not found');
            }
            return admin;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting admin: ${err.message}`);
        }
    }

    async isEmailExists(email) {
        try {
            const admin = await Admin.findOne({ email });
            return !!admin;
        } catch (err) {
            throw new CustomError(
                500,
                `Error checking if email exists: ${err.message}`,
            );
        }
    }
}

module.exports = new AdminDAO();
