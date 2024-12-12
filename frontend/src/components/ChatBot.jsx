import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaSpinner } from "react-icons/fa";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    const API_KEY = 'AIzaSyCE-nqPp7Dsy5tbYK1F90C9W-fKZY3mhps';
    const MODEL_NAME = 'gemini-1.5-pro';

    if (!API_KEY || !MODEL_NAME) {
      setError("API key or model name is missing. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const prompt = `You are a friendly chatbot. Respond to the user's message: "${userInput}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      const botMessage = response.text().trim();

      setMessages([
        ...newMessages,
        { text: botMessage, sender: "bot" },
      ]);
    } catch (error) {
      setError("Error generating response: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold text-white text-center mb-4">ChatBot</h2>
      <div className="overflow-y-auto max-h-[800px] mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
            <div
              className={`px-4 py-2 max-w-xs rounded-lg text-white ${
                message.sender === "user" ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <div className="px-4 py-2 max-w-xs bg-gray-600 text-white rounded-lg flex items-center">
              <FaSpinner className="animate-spin mr-2" /> Generating response...
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center mt-2">{error}</div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Type your message..."
          className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
