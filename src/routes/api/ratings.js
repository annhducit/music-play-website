const express = require('express');
const router = express.Router();

const ratingController = require('../../app/controllers/RatingController');

// [GET]: /api/ratings
router.get('/', ratingController.index);

// [GET]: /api/ratings:id
router.get('/:id', ratingController.read);

// [POST]: /api/ratings/store
router.post('/create', ratingController.create);

// [PUT]: /api/ratings/:id
router.put('/:id', ratingController.update);

// [DELETE]: /api/ratings/:id
router.delete('/:id', ratingController.delete);

module.exports = router;
