const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', isAuthenticated, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
