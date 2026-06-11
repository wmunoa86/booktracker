const express = require('express');
const router = express.Router();
const controller = require('../controllers/authorsController');
const isAuthenticated = require('../middleware/isAuthenticated');
const { validateAuthor } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validateAuthor, controller.create);
router.put('/:id', isAuthenticated, validateAuthor, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
