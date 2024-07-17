import React, { useState, useEffect } from 'react';
import { send } from '../../websocket';


function ChatRoom() {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
  //   const newMessage = { id: Date.now(), text: input };
  //   setMessages([...messages, newMessage]);
  //   send(JSON.stringify(newMessage))
  //   setInput('');
  // };
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:3001/chatroom');
    setWs(socket);

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log("Got message back!", event)
      const newMessage = event.data;
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    // Clean up WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (ws && inputMessage.trim() !== '') {
      ws.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;