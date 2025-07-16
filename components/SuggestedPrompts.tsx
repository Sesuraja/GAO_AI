import React from 'react';

const prompts = [
  "What kind of LoRaWAN devices do you have?",
  "Tell me about your Fiber Network products.",
  "What is a Tek Summit?",
  "Do you sell RFID tags for asset tracking?",
];

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="max-w-4xl mx-auto pl-11">
        <div className="flex flex-wrap justify-start items-center gap-2 my-2">
        {prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt)}
              className="bg-gray-800 border border-gray-600 text-gray-200 text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Send prompt: ${prompt}`}
            >
              {prompt}
            </button>
        ))}
        </div>
    </div>
  );
};

export default SuggestedPrompts;
