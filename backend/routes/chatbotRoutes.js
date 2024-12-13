const express = require('express');
const { startSession, nextQuestion } = require('../controllers/chatbotController');

const router = express.Router();

// Chatbot routes
router.post('/start-session', startSession);
router.post('/next-question', nextQuestion);

module.exports = router;
