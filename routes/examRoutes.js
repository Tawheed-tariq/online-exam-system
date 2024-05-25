const express = require('express');
const { createExam, getExams } = require('../controllers/examController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, createExam);
router.get('/', authenticateJWT, getExams);

module.exports = router;
