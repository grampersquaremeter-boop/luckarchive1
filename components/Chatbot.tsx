
import React, { useState, useEffect, useRef } from 'react';
import { UserData, ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';

interface ChatbotProps {
  userData: UserData;
}

const Chatbot: React.FC<ChatbotProps> = ({ userData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    const sysInstruction = `당신은 ${userData.name}님(생년월일: ${userData.birthDate}, 성향: ${userData.focusArea})의 개인 운세 전략가입니다. 
    오늘의 운세, 커리어 고민, 연애 심리 등 모든 상담을 사주 명리학과 현대 심리학을 결합하여 조언해주세요. 
    답변은 친절하고 전문적이어야 하며, 희망적인 메시지를 담아주세요.`;
    
    chatSessionRef.current = createChatSession(sysInstruction);

    // Initial greeting
    setMessages([{
      role: 'model',
      text: `${userData.name}님, 반갑습니다. 오늘 어떤 운명의 흐름이 궁금하신가요? 커리어, 재물, 혹은 마음의 평안에 대해 말씀해 주시면 정밀 분석해 드리겠습니다.`
    }]);
  }, [userData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '죄송합니다. 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_rgba(19,231,107,0.08),_transparent_40%)]">
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl shrink-0">
        <div>
          <h2 className="text-white font-bold text-xl">AI 운세 전략 상담소</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Quantum RAG Analysis Mode Active</p>
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-6 flex flex-col gap-6">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-2"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`size-10 rounded-full shrink-0 flex items-center justify-center border ${
                msg.role === 'model' 
                ? 'bg-background-dark border-primary/40' 
                : 'bg-white/5 border-white/20'
              }`}>
                <span className={`material-symbols-outlined text-xl ${msg.role === 'model' ? 'text-primary' : 'text-slate-300'}`}>
                  {msg.role === 'model' ? 'smart_toy' : 'person'}
                </span>
              </div>
              <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                  msg.role === 'model' 
                  ? 'bg-primary/10 border border-primary/20 text-slate-200' 
                  : 'bg-white/5 border border-white/10 text-slate-300'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {msg.role === 'model' ? 'AI Advisor' : 'You'}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
               <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">refresh</span>
               </div>
               <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl">
                  <p className="text-xs text-primary">운명 데이터를 정밀 분석 중입니다...</p>
               </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-black/60 rounded-2xl">
          <div className="relative flex items-center">
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-14 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500"
              placeholder="상담하고 싶은 내용을 입력하세요..."
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-xl font-bold">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
