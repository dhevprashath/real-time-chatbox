import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:4000');

function App() {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        if (message !== '') {
            const messageData = {
                author: socket.id,
                message,
                time: new Date().toLocaleTimeString(),
            };
            socket.emit('send_message', messageData);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((prev) => [...prev, data]);
        });
    }, []);

    return (
        <div className="App">
            <h1>Real-Time Chat App</h1>
            <div className="chat-window">
                <div className="chat-messages">
                    {messageList.map((msg, index) => (
                        <div key={index} className="message">
                            <p>
                                <strong>{msg.author}</strong> [{msg.time}]: {msg.message}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
