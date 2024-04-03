const express = require('express');
const  router = express.Router();

const BookmarkController = require('../../app/controllers/BookmarkController');
// [GET]: /api/bookmarks
router.get('/', BookmarkController.index);

// [GET]: /api/bookmarks/:userId
router.get('/:userId', BookmarkController.readByUserId);

// [POST]: /api/bookmarks
router.post('/', BookmarkController.create);

// [DELETE]: /api/bookmarks
router.delete('/', BookmarkController.delete);


module.exports = router;