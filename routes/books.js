const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController');
const isAuthenticated = require('../middleware/isAuthenticated');
const { validateBook } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validateBook, controller.create);
router.put('/:id', isAuthenticated, validateBook, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
