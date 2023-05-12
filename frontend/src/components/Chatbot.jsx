import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm a chatbot. How can I help you today?",
      isBot: true,
    },
  ]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    const latestMessage = document.getElementById('latest-message');

    if (messageContainer && latestMessage) {
      messageContainer.scrollTop = latestMessage.offsetTop;
      latestMessage.focus();
    }
  }, [messages]);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.get('/api/accessToken');
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  };
  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
  
    try {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        console.error('Access token is missing or invalid.');
        return;
      }
  
      const sessionPath = 'projects/watchwise-chatbot-wkji/agent/sessions/abc-session-123';
      // Replace 'your-project-id' and 'your-session-id' with your actual project and session IDs
  
      const response = await axios.post(
        `https://dialogflow.googleapis.com/v2/${sessionPath}:detectIntent`,
        {
          queryInput: {
            text: {
              text: input,
              languageCode: 'en',
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const botReply = response.data.queryResult.fulfillmentText;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, isBot: false },
        { text: botReply, isBot: true },
      ]);
      setInput('');
    } catch (error) {
      console.error('Error communicating with Dialogflow:', error);
    }
  };
  


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="w-1/3 p-10 bg-gray-700 flex flex-col justify-center">
        <div className="h-80 overflow-auto mb-4" ref={messageContainerRef}>
          <div className="p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                id={index === messages.length - 1 ? 'latest-message' : ''}
                className={`my-2 max-w-[44rem] mx-auto p-4 rounded-lg ${
                  message.isBot ? 'bg-gray-600 text-white self-start' : 'bg-gray-200 text-gray-800 self-end'
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>

    <form className="w-full flex px-4 h-11" onSubmit={sendMessage}>
      <input
        type="text"
        className="w-full  px-4 py-2 rounded-l-lg outline-none"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-r-lg text-white font-medium transition duration-150 ease-in-out"
      >
        Send
      </button>
    </form>
  </div>
</div>



  );
};

export default Chatbot;