import React from 'react';
import { ZylosLogo } from './icons/ZylosLogo';

const examplePrompts = [
  "Explain quantum computing in simple terms",
  "Write a short story about a robot who discovers music",
  "Give me ideas for a 10-day trip to Japan",
  "Create a workout plan for building muscle",
];

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <ZylosLogo className="w-24 h-24 mb-4 text-gray-500" />
      <h2 className="text-4xl font-bold text-gray-200">How can I help you today?</h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {examplePrompts.map((prompt, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer">
            <p className="text-gray-300">{prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};