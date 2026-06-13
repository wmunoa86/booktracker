const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewsController');
const isAuthenticated = require('../middleware/isAuthenticated');
const { validateReview } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validateReview, controller.create);
router.put('/:id', isAuthenticated, validateReview, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
