const RatingDAO = require('../daos/RatingDAO');
const UserDAO = require('../daos/UserDAO');
const SongDAO = require('../daos/SongDAO');

const User = require('../models/User');
const Song = require('../models/Song');
const StringUtils = require('../utils/StringUtils');

class RatingController {
    // [GET]: /api/ratings
    async index(req, res) {
        // Read all ratings
        try {
            const ratings = await RatingDAO.readAll();
            res.json({
                message: 'List of ratings read successfully',
                data: ratings,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [GET]: /api/ratings/:id
    async read(req, res) {
        // Get request data
        const id = req.params.id;

        // Read rating
        try {
            const rating = await RatingDAO.read(id);
            res.json({
                message: 'Rating read successfully',
                data: rating,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [POST]: api/ratings/create
    async create(req, res) {
        // Get request data
        const {
            rate = '',
            lastUpdate = '',
            songId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (rate < 0 || !Number.isInteger(rate)) {
            isValid = false;
        } else if (!isNaN(lastUpdate)) {
            isValid = false;
        } else if (!Song.findOne({ songId })) {
            isValid = false;
        }

        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Create rating
        try {
            const rating = await RatingDAO.create({
                rate,
                lastUpdate,
                songId,
            });
            res.status(201).json({
                message: 'Rating created successfully',
                data: rating,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [PUT]: /ratings/:id
    async update(req, res) {
        // Get request data
        const id = req.params.id;
        const {
            rate = '',
            lastUpdate = '',
            songId = '',
        } = req.body;

        // Validate invalid info
        let isValid = true;
        if (rate < 0 || !Number.isInteger(rate)) {
            isValid = false;
        } else if (!isNaN(lastUpdate)) {
            isValid = false;
        } else if (!Song.findOne({ songId })) {
            isValid = false;
        }

        if (!isValid) {
            return res.status(422).json({ message: 'Invalid information' });
        }

        // Update rating
        try {
            const rating = await RatingDAO.update(id, {
                rate,
                lastUpdate,
                songId,
            });
            res.json({
                message: 'Rating updated successfully',
                data: rating,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }

    // [DELETE]: /ratings/:id
    async delete(req, res) {
        // Get request data
        const id = req.params.id;

        // Delete rating
        try {
            const rating = await RatingDAO.delete(id);
            res.json({
                message: 'Rating deleted successfully',
                data: rating,
            });
        } catch (err) {
            res.status(err.code).json({ message: err.message });
        }
    }
}

module.exports = new RatingController();
