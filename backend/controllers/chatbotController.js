const { initializeSession, getNextQuestion } = require('../utils/sessionManager');
const { analyzeResponseWithRetry } = require('../utils/openaiClient'); 

const questions = [
    "What are your thoughts on climate change?",
    "How do you think individuals can contribute to reducing emissions?",
    "What role should governments play in addressing environmental issues?",
];

// Start a new session
const startSession = (req, res) => {
    const sessionId = initializeSession(); // Initialize session
    const { nextQuestion } = getNextQuestion(sessionId, questions); // Get the first question
    
    res.json({
        sessionId,
        question: nextQuestion, // Send the first question
    });
};

// Handle the next question and analyze the response
const nextQuestion = async (req, res) => {
    const { sessionId, userResponse } = req.body;

    const { nextQuestion, isComplete } = getNextQuestion(sessionId, questions); // Retrieve the next question
    
    if (nextQuestion) {
        try {
            // Use the retry logic for analyzing the user's response
            const feedback = await analyzeResponseWithRetry(nextQuestion, userResponse, 
                `Does the following user response answer this question: "${nextQuestion}"\nUser Response: "${userResponse}"`);

            if (isComplete) {
                res.json({
                    feedback,
                    message: "Thank you for participating!",
                    isComplete: true,
                });
            } else {
                res.json({
                    feedback,
                    question: nextQuestion, // Send the next question
                    isComplete: false,
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while processing the response.' });
        }
    } else {
        res.status(400).json({ error: 'Invalid session ID' });
    }
};

module.exports = { startSession, nextQuestion };
