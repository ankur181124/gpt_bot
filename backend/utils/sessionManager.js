const sessions = {};

const initializeSession = () => {
    const sessionId = Date.now().toString(); // Unique session ID
    sessions[sessionId] = 0; // Start at the first question
    return sessionId;
};

const getNextQuestion = (sessionId, questions) => {
    if (!sessions[sessionId]) {
        throw new Error('Invalid session ID');
    }

    const currentIndex = sessions[sessionId];
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
        delete sessions[sessionId]; // End the session
        return { isComplete: true };
    }

    sessions[sessionId] = nextIndex;
    return { nextQuestion: questions[nextIndex], isComplete: false };
};

module.exports = { initializeSession, getNextQuestion };
