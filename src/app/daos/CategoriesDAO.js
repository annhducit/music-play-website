const Category = require('../models/Categories');
const CustomError = require('../utils/CustomError');

class CategoryDAO {
    async create(info) {
        try {
            const category = new Category({
                ...info
            });
            await category.save();
            return category;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error creating category: ${err.message}`);
        }
    }

    async read(id) {
        try {
            const category = await Category.findById(id);
            if (!category) {
                throw new CustomError(500, 'Category not found');
            }
            return category;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(
                500,
                `Error reading category by id: ${err.message}`,
            );
        }
    }

    async readAll() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (err) {
            throw new CustomError(
                500,
                `Error reading all category: ${err.message}`,
            );
        }
    }

    async update(id, info) {
        try {
            const tmp = await Category.find(id);
            if (!tmp) {
                throw new CustomError(404, 'Category not found');
            }
            const category = await Category.findByIdAndUpdate(id, {
                ...info
            });
            return category;
        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error updating category: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                throw new Error(404, 'Category not found');
            }
            return category;

        } catch (err) {
            if (err.code) throw err;
            throw new CustomError(500, `Error deleting category: ${err.message}`);
        }
    }
}

module.exports = new CategoryDAO();