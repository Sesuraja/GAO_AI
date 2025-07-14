
import React from 'react';
import { Message } from '../types.ts';

interface ChatMessageProps {
  message: Message;
}

const parseResponse = (text: string): React.ReactNode => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
        const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = urlRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(line.substring(lastIndex, match.index));
            }
            const linkText = match[1];
            const url = match[2];
            parts.push(
                <a href={url} key={`${lineIndex}-${match.index}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-300 transition-colors">
                    {linkText}
                </a>
            );
            lastIndex = urlRegex.lastIndex;
        }

        if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
        }

        return (
            <span key={lineIndex} className="block">
                {parts.map((part, partIndex) => (
                    <React.Fragment key={partIndex}>{part}</React.Fragment>
                ))}
            </span>
        );
    });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end'
    : 'bg-gray-700 text-gray-200 self-start';

  const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white flex-shrink-0">
      U
    </div>
  );
  
  const AiIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-blue-400 flex-shrink-0">
      GAO
    </div>
  );

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserIcon /> : <AiIcon />}
      <div
        className={`max-w-xl lg:max-w-3xl rounded-lg px-4 py-3 shadow-lg ${bubbleClasses}`}
      >
        <div className="prose prose-invert prose-sm max-w-none break-words">
            {parseResponse(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;