import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import { startSession, fetchNextQuestion } from './services/chatbotService';

const App = () => {
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const initializeChat = async () => {
            const response = await startSession();
            setSessionId(response.sessionId);
            setMessages([{ role: 'bot', content: response.question }]);
        };

        initializeChat();
    }, []);

    const handleSendMessage = async () => {
        if (!input) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');

        try {
            const response = await fetchNextQuestion(sessionId, input);

            if (response.isComplete) {
                setIsComplete(true);
                setMessages([
                    ...updatedMessages,
                    { role: 'bot', content: response.feedback },
                    { role: 'bot', content: response.message },
                ]);
            } else {
                setMessages([
                    ...updatedMessages,
                    { role: 'bot', content: response.feedback },
                    { role: 'bot', content: response.question },
                ]);
            }
        } catch (error) {
            console.error("Error fetching next question:", error);
        }
    };

    return (
        <div>
            <h1>Research Chatbot</h1>
            <ChatBox messages={messages} />
            {!isComplete && (
                <div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Your response..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
            {isComplete && <p>Thank you for participating!</p>}
        </div>
    );
};

export default App;
