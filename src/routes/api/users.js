const express = require('express');
const router = express.Router();

const UserController = require('../../app/controllers/UserController');

// [GET]: /api/users
router.get('/', UserController.index);

// [GET]: /api/users/:id
router.get('/:id', UserController.read);

// [POST]: /api/users/create
router.post('/create', UserController.create);

// [PUT]: /api/users/:id
router.put('/:id', UserController.update);

// [DELETE]: /api/users/:id
router.delete('/:id', UserController.delete);

module.exports = router;
