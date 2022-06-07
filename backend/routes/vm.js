const express = require('express');
const vmController = require('../controllers/vm');

const router = express.Router();

router.post('/deposit', vmController.deposit);
router.post('/buy', vmController.buy);
router.post('/reset', vmController.reset);

module.exports = router;
