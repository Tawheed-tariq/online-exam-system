const express = require('express');
const { submitResult, getResults } = require('../controllers/resultController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, submitResult);
router.get('/', authenticateJWT, getResults);

module.exports = router;
