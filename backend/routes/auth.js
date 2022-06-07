const express = require('express');
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/users', usersController.createUser);
router.post('/auth/login', authController.login);

// enable auth requirement for all subsequent routes
router.use(authMiddleware);

router.post('/auth/logout/all', authController.logoutAll);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.getMe);

module.exports = router;
