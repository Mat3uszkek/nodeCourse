const path = require('path');

const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

router.get('/', testController.getIndex);

module.exports = router;
