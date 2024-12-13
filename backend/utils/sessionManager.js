// sessionManager.js

const sessions = {};

// Initialize a new session and store it
const initializeSession = () => {
    const sessionId = Date.now().toString(); // Generate a unique session ID
    sessions[sessionId] = 0; // Start at the first question
    console.log(`[SessionManager] New session initialized: ${sessionId}`);
    return sessionId;
};

// Retrieve the next question based on the session ID
const getNextQuestion = (sessionId, questions) => {
    // Validate session ID
    if (!sessions.hasOwnProperty(sessionId)) {
        console.error(`[SessionManager] Invalid session ID: ${sessionId}`);
        return { error: 'Invalid session ID' }; // Return error for invalid session
    }

    const currentIndex = sessions[sessionId];
    const nextIndex = currentIndex + 1;

    // Check if all questions have been asked
    if (nextIndex >= questions.length) {
        console.log(`[SessionManager] Session completed for ID: ${sessionId}`);
        delete sessions[sessionId]; // End the session
        return { isComplete: true };
    }

    // Update session to point to the next question
    sessions[sessionId] = nextIndex;
    console.log(`[SessionManager] Session ${sessionId} moved to question ${nextIndex}`);
    return { nextQuestion: questions[nextIndex], isComplete: false };
};

module.exports = { initializeSession, getNextQuestion };
