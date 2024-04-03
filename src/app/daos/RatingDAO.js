const bcrypt = require('bcrypt');

const Rating = require('../models/Rating');
const CustomError = require('../utils/CustomError');

class RatingDAO {
    async create(info) {
        try {
            // Create data
            const rating = new Rating(info);

            await rating.save();
            return rating;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error creating rating: ${err.message}`);
        }
    }

    async read(id) {
        try {
            // Read data
            const rating = await Rating.findById(id);
            if (!rating) {
                throw new CustomError(404, 'Rating not found');
            }
            return rating;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading rating by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            // Read all data
            const ratings = await Rating.find();
            return ratings;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all ratings: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            // Check user already exists
            const tmp = await Rating.findById(id);
            if (!tmp) {
                throw new CustomError(404, 'Rating not found');
            }

            // Update data
            const rating = await Rating.findByIdAndUpdate(id, info);

            return rating;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating rating: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            // Delete data
            const rating = await Rating.findByIdAndDelete(id);
            if (!rating) {
                throw new CustomError(404, 'Rating not found');
            }
            return rating;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting rating: ${err.message}`);
        }
    }
}

module.exports = new RatingDAO();
