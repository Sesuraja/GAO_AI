import React, { useState } from 'react';
import { Message } from '../types.ts';

interface ParsedLink {
  text: string;
  url: string;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

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

  const handleCopy = () => {
    if (isCopied || !message.content) return;
    navigator.clipboard.writeText(message.content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Parse links from assistant messages
  let cleanContent = message.content;
  const links: ParsedLink[] = [];
  if (isAssistant) {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    
    let match;
    while ((match = markdownLinkRegex.exec(message.content)) !== null) {
      links.push({ text: match[1], url: match[2] });
    }
    
    if (links.length > 0) {
      cleanContent = message.content.replace(markdownLinkRegex, '').trim();
    }
  }

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserIcon /> : <AiIcon />}
      <div
        className={`relative group max-w-xl lg:max-w-3xl rounded-lg px-4 py-3 shadow-lg ${bubbleClasses}`}
      >
        <div className="prose prose-invert prose-sm max-w-none break-words whitespace-pre-wrap">
            {cleanContent}
        </div>

        {links.length > 0 && (
          <div className={`space-y-2 ${cleanContent ? 'mt-4 pt-4 border-t border-gray-600/50' : ''}`}>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gray-800/60 p-3 rounded-lg hover:bg-gray-600/60 transition-colors"
                aria-label={`Link to ${link.text}`}
              >
                <span className="font-medium text-blue-300">{link.text}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        )}

        {isAssistant && message.content && (
          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-gray-400 hover:bg-gray-600 hover:text-gray-200 disabled:cursor-not-allowed"
              aria-label={isCopied ? "Copied" : "Copy message"}
              disabled={isCopied}
            >
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
