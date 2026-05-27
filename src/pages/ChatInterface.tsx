import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { generateAIResponse } from '@/lib/ai-logic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  User, 
  Info, 
  HelpCircle, 
  Mic, 
  Smile, 
  MoreVertical,
  Volume2,
  Star,
  ShieldCheck
} from 'lucide-react';
import { Message } from '@/lib/types';
import { toast } from 'sonner';

export const ChatInterface = () => {
  const { profile, language, addMessage, sessions, addSession } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const initialSubject = location.state?.subject || 'General Learning';
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png";
  const SUPPORT_MASCOT = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-support-mascot-png-da050e15-1779836834795.webp";

  useEffect(() => {
    if (!profile) return;
    
    // Start a new session on mount
    const newSessionId = Math.random().toString(36).substr(2, 9);
    addSession({
      id: newSessionId,
      profileId: profile.id,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: initialSubject !== 'General Learning' 
            ? language === 'Pidgin' 
              ? `Oya! Make we start ${initialSubject} lessons. Wetin you want know? 🌟`
              : `Hello! Let's dive into ${initialSubject}. What would you like to explore today? 🌟`
            : language === 'Pidgin'
              ? `A-low ${profile.name}! I be Igeri. Wetin we go learn today? 🌿`
              : `Hello ${profile.name}! I'm Igeri, your learning companion. How can I help you today? 🌿`,
          timestamp: Date.now(),
          subject: initialSubject
        }
      ],
      startTime: Date.now()
    });
    setCurrentSessionId(newSessionId);
  }, [profile, language]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentSessionId || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    addMessage(currentSessionId, userMsg);
    setInput('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      const aiResponse = await generateAIResponse(input, profile!.tier, language);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      };
      addMessage(currentSessionId, aiMsg);
    } catch (error) {
      toast.error("Network issue. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const getModeClass = () => {
    if (!profile) return '';
    switch (profile.tier) {
      case '5-8': return 'mode-buba';
      case '9-13': return 'mode-kemi';
      case '14-17': return 'mode-chike';
      default: return '';
    }
  };

  const getModeLabel = () => {
    if (!profile) return '';
    switch (profile.tier) {
      case '5-8': return 'Buba Mode 🌱';
      case '9-13': return 'Kemi Mode 📚';
      case '14-17': return 'Chike Mode 🚀';
    }
  };

  if (!profile) return null;

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-500 ${getModeClass()}`}>
      <div className="absolute inset-0 adire-pattern opacity-[0.03] pointer-events-none" />

      <header className="relative z-30 bg-white/80 backdrop-blur-2xl border-b border-earth-brown/5 px-4 h-24 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            className="rounded-2xl hover:bg-earth-brown/5 w-12 h-12"
          >
            <ArrowLeft size={28} className="text-earth-brown" />
          </Button>
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-white shadow-kid border border-earth-brown/5 flex items-center justify-center overflow-hidden">
                <img src={LOGO_URL} className="w-9 h-9 object-contain" />
             </div>
             <div>
                <h2 className="font-black text-earth-brown text-xl leading-none">{initialSubject}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-nigerian-green rounded-full animate-pulse" />
                  <p className="text-[11px] text-earth-brown/40 uppercase font-black tracking-widest">{getModeLabel()}</p>
                </div>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="rounded-full text-earth-brown/40 hover:bg-earth-brown/5">
              <Volume2 size={24} />
           </Button>
           <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white/50">
              <img src={`https://i.pravatar.cc/100?u=${profile.name}`} />
           </div>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-10 space-y-10 scroll-smooth relative z-10"
      >
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass px-6 py-4 rounded-3xl flex items-center gap-4 border-white/60"
          >
             <div className="w-10 h-10 rounded-2xl bg-nigerian-green/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-nigerian-green" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-earth-brown/40 uppercase tracking-widest leading-none mb-1">Kid-Safe AI Session</span>
                <span className="text-xs text-earth-brown/70 font-bold leading-none">Following Nigerian curriculum guidelines.</span>
             </div>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-5 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-kid border border-earth-brown/5 flex items-center justify-center shrink-0 overflow-hidden self-end">
                    <img src={SUPPORT_MASCOT} className="w-full h-full object-contain animate-float" />
                  </div>
                )}
                <div 
                  className={`relative p-6 md:p-8 rounded-[2rem] shadow-kid text-lg leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-nigerian-green text-white rounded-tr-none font-bold' 
                      : 'bg-white text-earth-brown border border-earth-brown/5 rounded-tl-none font-bold'
                  }`}
                >
                  {msg.content}
                  <div className={`mt-3 flex items-center gap-2 ${msg.role === 'user' ? 'justify-end text-white/50' : 'text-earth-brown/30'}`}>
                     <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-kid border border-earth-brown/5 flex items-center justify-center shrink-0 overflow-hidden">
                <img src={SUPPORT_MASCOT} className="w-full h-full object-contain animate-bounce" />
              </div>
              <div className="bg-white p-6 rounded-3xl rounded-tl-none border border-earth-brown/5 flex gap-3 items-center shadow-sm">
                <div className="w-2.5 h-2.5 bg-nigerian-green rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-nigerian-green rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-nigerian-green rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative z-30 p-6 md:p-10 bg-white/80 backdrop-blur-2xl border-t border-earth-brown/5 shrink-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="relative flex items-center gap-3">
            <div className="absolute left-6 flex items-center gap-2 text-earth-brown/40">
               <Smile size={28} className="cursor-pointer hover:text-nigerian-green transition-colors" />
            </div>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'English' ? "Wetin dey your mind?..." : "Ask me anything..."}
              className="flex-1 h-20 bg-white border-earth-brown/10 rounded-[2.5rem] pl-16 pr-36 text-xl font-bold focus:ring-nigerian-green focus:border-nigerian-green shadow-kid transition-all"
            />
            <div className="absolute right-3 flex items-center gap-3">
               <Button 
                 type="button"
                 variant="ghost" 
                 size="icon" 
                 className="rounded-full text-earth-brown/40 hover:text-nigerian-green w-12 h-12"
               >
                 <Mic size={28} />
               </Button>
               <Button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="h-14 w-14 bg-nigerian-green hover:bg-nigerian-green/90 text-white rounded-full shadow-2xl kid-button disabled:opacity-50"
              >
                <Send size={28} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-6">
             <div className="flex items-center gap-6">
                <button 
                  type="button" 
                  onClick={() => setInput("Igera, can you give me a hint? 🤔")}
                  className="text-[11px] font-black text-earth-brown/50 uppercase tracking-widest flex items-center gap-2 hover:text-nigerian-green transition-colors"
                >
                  <HelpCircle size={16} /> Get a Hint
                </button>
                <span className="w-1.5 h-1.5 bg-earth-brown/10 rounded-full" />
                <button 
                   type="button" 
                   onClick={() => setInput("Please explain this differently.")}
                   className="text-[11px] font-black text-earth-brown/50 uppercase tracking-widest flex items-center gap-2 hover:text-nigerian-green transition-colors"
                >
                  <Sparkles size={16} /> Try Different Way
                </button>
             </div>
             
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-adire-gold/10 flex items-center justify-center">
                   <Star size={16} className="text-adire-gold fill-adire-gold" />
                </div>
                <span className="text-[11px] font-black text-earth-brown/40 uppercase tracking-widest">Premium Learning</span>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};