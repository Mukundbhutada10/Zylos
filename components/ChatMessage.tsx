import React from 'react';
import { type Message } from '../types';
import { UserIcon } from './icons/UserIcon';
import { ZylosLogo } from './icons/ZylosLogo';

// Simple markdown to HTML renderer
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const createMarkup = (text: string) => {
    let html = text
      .replace(/</g, "&lt;").replace(/>/g, "&gt;") // Escape HTML
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 rounded px-1 py-0.5 text-sm font-mono">$1</code>') // Inline code
      .replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => { // Code blocks
        return `<pre class="bg-black/50 p-3 rounded-md my-2 overflow-x-auto"><code class="language-${lang}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
      })
      .replace(/^(#{1,3})\s(.*$)/gm, (match, hashes, content) => { // Headers
        const level = hashes.length;
        return `<h${level} class="font-bold mt-4 mb-2 text-white">${content}</h${level}>`;
      })
      .replace(/^\s*[-*]\s(.*$)/gm, '<ul><li class="ml-4 list-disc">$1</li></ul>') // Unordered lists
      .replace(/(<\/ul>\s*<ul>)/g, ''); // Merge consecutive lists

    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={createMarkup(text)} />;
};


const LoadingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
  </div>
);

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isModel = message.role === 'model';

  const wrapperClasses = `flex items-start gap-4 max-w-4xl mx-auto`;
  const messageClasses = `flex-1 rounded-xl px-5 py-3 ${
    isModel ? 'bg-gray-800' : 'bg-blue-900/50'
  }`;

  const Icon = isModel ? ZylosLogo : UserIcon;
  const iconClasses = `w-8 h-8 rounded-full p-1 flex-shrink-0 ${
    isModel ? 'bg-gray-700 text-gray-300' : 'bg-blue-600 text-white'
  }`;

  return (
    <div className={wrapperClasses}>
      <Icon className={iconClasses} />
      <div className={messageClasses}>
        <div className="prose prose-invert prose-sm max-w-none text-gray-200">
           {message.text ? <SimpleMarkdown text={message.text} /> : null}
           {isLoading && <LoadingIndicator />}
        </div>
      </div>
    </div>
  );
};