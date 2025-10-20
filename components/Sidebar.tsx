import React from 'react';
import { ZylosLogo } from './icons/ZylosLogo';
import { PlusIcon } from './icons/PlusIcon';

interface SidebarProps {
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat }) => {
  return (
    <aside className="w-64 bg-gray-950 p-4 flex flex-col border-r border-gray-800">
      <div className="flex items-center gap-3 mb-8">
        <ZylosLogo className="w-10 h-10 text-white" />
        <h1 className="text-2xl font-bold tracking-wider">ZYLOS</h1>
      </div>
      <button
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <PlusIcon className="w-5 h-5" />
        New Chat
      </button>
      <div className="mt-auto text-center text-xs text-gray-500">
        <p>Powered by Gemini</p>
      </div>
    </aside>
  );
};