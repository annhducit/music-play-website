const express = require('express');
const router = express.Router();

const commentController = require('../../app/controllers/CommentController');

// [GET]: /api/comments
router.get('/', commentController.index);

// [GET]: /api/comments/:id
router.get('/:id', commentController.read);

// [POST]: /api/comments/store
router.post('/create', commentController.create);

// [PUT]: /api/comments/:id
router.put('/:id', commentController.update);

// [DELETE]: /api/comments/:id
router.delete('/:id', commentController.delete);

module.exports = router;
