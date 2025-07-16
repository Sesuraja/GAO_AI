
import React, { useEffect, useRef } from 'react';
import { Message } from '../types.ts';
import ChatMessage from './ChatMessage.tsx';
import SuggestedPrompts from './SuggestedPrompts.tsx';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  showSuggestions: boolean;
  onPromptClick: (prompt: string) => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 my-4">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-blue-400 flex-shrink-0">
            GAO
        </div>
        <div className="bg-gray-700 text-gray-200 self-start rounded-lg px-4 py-3 shadow-lg flex items-center gap-2">
            <span className="text-gray-400">GAO AI is typing</span>
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, showSuggestions, onPromptClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, showSuggestions]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      {showSuggestions && <SuggestedPrompts onPromptClick={onPromptClick} />}
      <div className="max-w-4xl mx-auto">
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatWindow;
