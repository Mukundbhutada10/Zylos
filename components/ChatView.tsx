import React from 'react';
import { type Message } from '../types';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatViewProps {
  chatHistory: Message[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ chatHistory, isLoading, error, onSendMessage }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {chatHistory.length === 0 ? (
        <WelcomeScreen />
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} message={msg} isLoading={isLoading && index === chatHistory.length - 1} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      {error && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-red-800/80 text-white px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};