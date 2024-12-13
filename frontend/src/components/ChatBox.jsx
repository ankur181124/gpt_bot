import React from 'react';

const ChatBox = ({ messages }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        textAlign: msg.role === 'user' ? 'right' : 'left',
                        margin: '10px 0',
                    }}
                >
                    <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
