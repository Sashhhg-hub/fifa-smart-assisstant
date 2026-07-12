import { useState, useCallback, useRef } from 'react';
import { apiClient } from '../utils/apiClient';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // 1. Append User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    try {
      const response = await apiClient.post<{ replyText: string; suggestions?: string[] }>(
        '/concierge/chat',
        {
          prompt: text,
          context: {
            ticket: {
              section: '114',
              row: '12',
              seat: '4',
            },
          },
        }
      );

      const replyText =
        response.success && response.data?.replyText
          ? response.data.replyText
          : 'I encountered an issue connecting to the stadium guide. Please check your network connection.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'ai',
        text: 'Error: Failed to process query.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
