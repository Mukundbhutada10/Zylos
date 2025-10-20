import React, { useState, useCallback, useRef, useEffect } from 'react';
import { type Chat } from '@google/genai';

import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { type Message } from './types';
import { startChat } from './services/geminiService';


const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatSessionRef = useRef<Chat | null>(null);
  
  const handleNewChat = () => {
    setChatHistory([]);
    setError(null);
    chatSessionRef.current = startChat();
  };
  
  useEffect(() => {
    // Start a new chat session when the component mounts
    handleNewChat();
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (isLoading || !chatSessionRef.current) return;
  
    setIsLoading(true);
    setError(null);
  
    const userMessage: Message = { role: 'user', text: message };
    
    // Add user message and a placeholder for the model's response
    setChatHistory(prev => [...prev, userMessage, { role: 'model', text: '' }]);
  
    try {
      const stream = await chatSessionRef.current.sendMessageStream({ message });
  
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setChatHistory(prev => {
          const newHistory = [...prev];
          const lastMessage = newHistory[newHistory.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text += chunkText;
          }
          return newHistory;
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      setChatHistory(prev => {
         const newHistory = [...prev];
         const lastMessage = newHistory[newHistory.length - 1];
         if (lastMessage.role === 'model' && lastMessage.text === '') {
           return newHistory.slice(0, -1); // Remove empty model message
         }
         return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  

  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100 font-sans">
      <Sidebar onNewChat={handleNewChat} />
      <main className="flex-1 flex flex-col h-screen">
        <ChatView 
          chatHistory={chatHistory}
          isLoading={isLoading}
          error={error}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default App;