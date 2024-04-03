const CategoriesDAO = require('../daos/CategoriesDAO');

class CategoriesController {

    async index(req, res) {
        try {
            const categories = await CategoriesDAO.readAll();
            res.json({
                message: 'List of categories read successfully',
                data: categories,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async read(req, res) {
        const id = req.params.id;
        try {
            const category = await CategoriesDAO.read(id)
            res.json({
                message: 'Categories read successfully',
                data: category,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async create(req, res) {
        const {
            name = '',
        } = req.body;

        let isValue = true;
        if (name.length == 0) {
            isValue = false;
        }
        if (!isValid) {
            return res.status(422).json({
                message: 'Invalid information'
            });
        }

        try {
            const category = await CategoriesDAO.create({
                name,
            });
            res.status(201).json({
                message: 'categories created successfully',
                data: category,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async update(req, res) {
        let id = req.params.id;
        const {
            name = '',
        } = req.body;

        let isValue = true;
        if (name.length == 0) {
            isValue = false;
        }
        if (!isValid) {
            return res.status(422).json({
                message: 'Invalid information'
            });
        }

        try {
            const category = await CategoriesDAO.update(id, {
                name,
            });
            res.status(201).json({
                message: 'Categories update successfully',
                data: category,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            const category = await CategoriesDAO.delete(id);
            res.json({
                message: 'Categories deleted successfully',
                data: category,
            });
        } catch (err) {
            res.status(err.code).json({
                message: err.message
            });
        }
    }
}

module.exports = new CategoriesController();