const express = require('express');
const router = express.Router();

const CategoryController = require('../../app/controllers/CategoriesController');

router.get('/', CategoryController.index);

router.get('/:id', CategoryController.read);

router.post('/create', CategoryController.create);

router.put('/:id', CategoryController.update);

router.delete('/:id', CategoryController.delete);

module.exports = router;    