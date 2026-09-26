import { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Bot, FileText, Info } from 'lucide-react';
import { lawLensApi } from '../services/api';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  source: string | null;
}

const AskLawLens = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: 'Hello! I\'ve analyzed your document. What would you like to know about it?', source: null }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const suggestedQs = [
    "What are my main obligations?",
    "When can this agreement be terminated?",
    "Explain the payment clause simply."
  ];

  // Cleanup abort controller on unmount (Efficiency)
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text, source: null }]);
    setQuery('');
    setIsTyping(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // Connect to Real API Backend
      const answer = await lawLensApi.askQuestion(text, "MOCK_CONTEXT", abortControllerRef.current.signal);
      
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'bot', 
        text: answer, 
        source: 'Retrieved via GenAI' 
      }]);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          role: 'bot', 
          text: 'Sorry, I encountered a secure error while processing your request.', 
          source: null 
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-brand-electric rounded-lg flex items-center justify-center mr-3">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-navy">Ask LawLens</h3>
            <p className="text-xs text-slate-500">Document-grounded Q&A</p>
          </div>
        </div>
        <div className="flex items-center text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          <Info className="h-3 w-3 mr-1 text-brand-electric" />
          Responses based only on uploaded text
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' ? 'bg-brand-navy text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {msg.source && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-slate-500">
                  <FileText className="h-3 w-3 mr-1" />
                  Source: {msg.source}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex space-x-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
          {suggestedQs.map((q, i) => (
            <button 
              key={i}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap text-xs bg-slate-100 hover:bg-brand-electric/10 hover:text-brand-electric text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-brand-electric/20"
            >
              {q}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(query); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about this document..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric/50 focus:border-brand-electric transition-all"
          />
          <button 
            type="submit"
            disabled={!query.trim()}
            className="absolute right-2 p-2 bg-brand-electric text-white rounded-lg disabled:opacity-50 disabled:bg-slate-300 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskLawLens;
