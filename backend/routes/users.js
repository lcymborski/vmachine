const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/users/:id(\\d+)', usersController.getUser);
router.put('/users/:id(\\d+)', usersController.updateUser);
router.delete('/users/:id(\\d+)', usersController.deleteUser);

module.exports = router;
