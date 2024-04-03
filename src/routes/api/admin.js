const express = require('express');
const router = express.Router();

const AdminController = require('../../app/controllers/AdminController');

// [GET]: /api/admins
router.get('/', AdminController.index);

// [GET]: /api/admins/:id
router.get('/:id', AdminController.read);

// [POST]: /api/admins/create
router.post('/create', AdminController.create);

// [PUT]: /api/admins/:id
router.put('/:id', AdminController.update);

// [DELETE]: /api/admins/:id
router.delete('/:id', AdminController.delete);

module.exports = router;
