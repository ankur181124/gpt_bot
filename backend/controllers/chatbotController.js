const { initializeSession, getNextQuestion } = require('../utils/sessionManager');

const questions = [
    "What are your thoughts on climate change?",
    "How do you think individuals can contribute to reducing emissions?",
    "What role should governments play in addressing environmental issues?",
];

const startSession = (req, res) => {
    const sessionId = initializeSession();
    res.json({ sessionId, question: questions[0] });
};

const nextQuestion = (req, res) => {
    const { sessionId, userResponse } = req.body;

    const { nextQuestion, isComplete } = getNextQuestion(sessionId, questions);

    if (isComplete) {
        res.json({ message: "Thank you for participating!", isComplete: true });
    } else {
        res.json({ question: nextQuestion, isComplete: false });
    }
};

module.exports = { startSession, nextQuestion };
