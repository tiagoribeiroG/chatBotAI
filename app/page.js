"use client"
import React, { useState } from "react";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, seIsLoading] = useState(false);

  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((prevChat) => [
      ...prevChat,
      {role:'user', content: userInput},
    ]);

    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, {role: 'assistant', content: userInput}],
      model: 'gpt-3.5-turbo',
    });
    setChatHistory((prevChat) => [
      ...prevChat,
      {role: 'assistant', content: chatCompletion.choices[0].message.content},
    ]);

    setUserImput('');
    setIsLoading(false);

  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md mg-white p-4rounded-lg shad-md">
        <div className="mb-4">
          <div className="text-4xl- font-bold text-blue-800 mb-2">
            Chatbot Assistant
          </div>
          <p className="text-gray-600 text-lg">
            Welcome to the future  of AI-powered assistant

          </p>
        </div>
        <div className="mb-4" styled={{ height: "400px", overflow: 'auto'}}>
          {chatHistory.map((message, index) => (
            <div
            key={index}
            className={`${
              message.role === 'user' ? 'text-left' : 'text-right'
            }`}
            >
              
            </div>
          ))}
        </div>
      </div>
    </div>
);
}
