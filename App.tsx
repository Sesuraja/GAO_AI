
import React, { useState, useEffect, useCallback } from 'react';
import type { Message } from './types.ts';
import Header from './components/Header.tsx';
import ChatWindow from './components/ChatWindow.tsx';
import ChatInput from './components/ChatInput.tsx';
import { initChat } from './services/geminiService.ts';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initializeNewChat = useCallback(() => {
    setIsLoading(true);
    const chatInstance = initChat();
    if (chatInstance) {
      setChat(chatInstance);
      setMessages([
        {
          role: 'assistant',
          content: "Hello! I'm GAO AI.  How can I assist you today?",
        },
      ]);
      setError(null);
    } else {
      setError("Could not initialize the AI chat service. Please check your API key and refresh the page.");
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    initializeNewChat();
  }, [initializeNewChat]);

  const handleSend = useCallback(async (prompt: string) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: prompt };
    
    setMessages(prevMessages => [
      ...prevMessages,
      userMessage,
      { role: 'assistant', content: '' }
    ]);

    try {
      const result = await chat.sendMessageStream({ message: prompt });
      
      let fullResponse = "";
      for await (const chunk of result) {
        const chunkText = chunk.text;
        if(chunkText) {
          fullResponse += chunkText;
          setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].content = fullResponse;
            return newMessages;
          });
        }
      }

    } catch (e) {
        console.error("Error sending message:", e);
        const errorMessage = "Sorry, I encountered an error. Please try again.";
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
              newMessages[newMessages.length - 1].content = errorMessage;
            }
            return newMessages;
        });
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);

  const showSuggestions = messages.length === 1 && !isLoading && !error;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header onNewChat={initializeNewChat} />
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">{error}</div>
      )}
      <ChatWindow 
        messages={messages} 
        isLoading={isLoading}
        showSuggestions={showSuggestions}
        onPromptClick={handleSend}
      />
      <ChatInput onSend={handleSend} disabled={isLoading || !chat || !!error} />
    </div>
  );
};

export default App;
