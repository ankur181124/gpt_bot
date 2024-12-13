import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/chatbot';

export const startSession = async () => {
    const response = await axios.post(`${API_BASE_URL}/start-session`);
    return response.data;
};

export const fetchNextQuestion = async (sessionId, userResponse) => {
    const response = await axios.post(`${API_BASE_URL}/next-question`, {
        sessionId,
        userResponse,
    });
    return response.data;
};
