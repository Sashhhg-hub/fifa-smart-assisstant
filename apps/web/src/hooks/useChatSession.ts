import { useState, useCallback, useRef } from 'react';

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

  // A local database of answers matching keywords to make the prototype interactive and high-fidelity
  const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    if (text.includes('seat') || text.includes('section')) {
      return "Based on your ticket details, you are located in Section 114, Row 12, Seat 4. The quickest route is to proceed up the North Escalator from Concourse A, and enter through Portal 12. Let me know if you need step-by-step navigation!";
    }
    if (text.includes('food') || text.includes('court') || text.includes('eat') || text.includes('hungry')) {
      return "There are three major concession stands near Section 114:\n1. **Concession B (American Grill)**: 2m walk. Serving hotdogs, burgers, fries. (Wait time: ~12m)\n2. **Taco Hub**: 3m walk. Serving tacos, nachos, drinks. (Wait time: ~5m)\n3. **Healthy Eats**: 4m walk. Serving wraps, salads, fruit cups. (Wait time: ~2m)\n\nYou can order through the Food Finder module to skip the queue!";
    }
    if (text.includes('translate') || text.includes('sign') || text.includes('language')) {
      return "Of course! Simply enter the phrase or upload a picture of the sign, and I will translate it instantly. Currently, live translation is set to Français, but you can select Spanish, Portuguese, German, Arabic, or English at the top bar.";
    }
    if (text.includes('gate b') || text.includes('gate')) {
      return "Gate B is located on the East Side of MetLife Stadium. If you entered from Gate 4, you are on the North-West side. Follow the blue signs on the outer concourse loop for about a 6-minute walk. Gate B is currently open and has minimal wait times.";
    }
    if (text.includes('medical') || text.includes('emergency') || text.includes('doctor') || text.includes('hurt') || text.includes('first aid')) {
      return "🚨 **Emergency Advisory** 🚨\nFor immediate assistance, please use the red **Stadium Security** or **First Aid Clinic** hotline buttons in the sidebar or Dashboard Home. \n\n*The nearest First Aid station is at Section 118 (approx. 1-minute walk from Section 114).*";
    }
    if (text.includes('access') || text.includes('wheelchair') || text.includes('elevator')) {
      return "MetLife Stadium is fully accessible. For Section 114, the closest wheelchair-friendly elevator is located adjacent to Gate 4. Wheelchair companion seating is located at the top of Section 114 in Row 22. Let me know if you want me to outline the accessible pathway from your current location.";
    }
    
    return `Hello! I am your FIFA Smart Assistant. I can help you find your seat, locate concessions, translate signs, navigate stadium routes, or answer match questions. \n\nFeel free to ask me anything about your visit to MetLife Stadium!`;
  };

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

    // Cancel any existing typing simulations
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    // 2. Simulate AI Processing Delay
    typingTimerRef.current = setTimeout(() => {
      const aiResponseText = getMockResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
