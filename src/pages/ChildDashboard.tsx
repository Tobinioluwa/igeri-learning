import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import {
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Award,
  BrainCircuit,
  Calculator,
  Globe2,
  FlaskConical,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LOGO_URL, MASCOT_PRO, HOW_IT_WORKS_ILLU } from '@/lib/assets';

export const ChildDashboard = () => {
  const { profile, clearAll, language, setLanguage } = useStore();
  const navigate = useNavigate();

  if (!profile) return null;

  const subjects = [
    { name: 'Maths', icon: Calculator, color: 'bg-sky-blue' },
    { name: 'English', icon: Globe2, color: 'bg-adire-gold' },
    { name: 'Basic Science', icon: FlaskConical, color: 'bg-nigerian-green' },
    { name: 'Civic Ed', icon: Award, color: 'bg-berry-pink' },
  ];

  const getTierLabel = () => {
    switch (profile.tier) {
      case '5-8': return 'Buba Mode 🌱';
      case '9-13': return 'Kemi Mode 📚';
      case '14-17': return 'Chike Mode 🚀';
    }
  };

  return (
    <div className="min-h-screen bg-parchment pb-24">
      <header className="bg-parchment sticky top-0 z-40 border-b-[3px] border-earth-brown">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-adire-gold rounded-xl flex items-center justify-center brut-border">
               <img src={LOGO_URL} alt="Igeri AI logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h1 className="font-black text-2xl text-earth-brown leading-none tracking-tight">IGERI AI</h1>
              <p className="text-[10px] text-earth-brown/50 font-black uppercase tracking-widest mt-0.5">{getTierLabel()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button
                onClick={() => setLanguage(language === 'English' ? 'Pidgin' : 'English')}
                className="kid-button hidden md:flex bg-white text-earth-brown text-xs h-10 px-4 rounded-xl items-center"
              >
                {language === 'English' ? '🇬🇧 English' : '🇳🇬 Pidgin'}
              </button>
            <button
              onClick={async () => {
                await clearAll();
                navigate('/');
              }}
              className="kid-button bg-white text-earth-brown w-12 h-12 rounded-xl hover:bg-destructive hover:text-white transition-colors flex items-center justify-center"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="bg-nigerian-green rounded-2xl p-10 md:p-16 text-white relative overflow-hidden brut-border" style={{ boxShadow: 'var(--shadow-brut-lg)' }}>
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest bg-white/10 border-2 border-white/40 text-white mb-6">
                 <Sparkles size={16} />
                 <span>Great job learning this week!</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Welcome back, <br />{profile.name}! 👋</h2>
              <p className="text-white/80 text-xl font-medium mb-10 leading-relaxed">Ready to sharpen your mind with Igeri today?</p>

              <button
                onClick={() => navigate('/chat')}
                className="kid-button bg-white text-nigerian-green h-16 px-10 text-xl rounded-xl flex items-center"
              >
                Start Learning Now <ChevronRight className="ml-2" />
              </button>
            </div>

            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={MASCOT_PRO}
              alt="Igeri mascot"
              className="absolute -bottom-10 -right-6 w-72 h-72 md:w-[450px] md:h-[450px] object-contain pointer-events-none hidden md:block"
            />
          </div>
        </motion.div>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black flex items-center gap-3 text-earth-brown">
              <BookOpen size={28} className="text-adire-gold" />
              Your Subjects
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((s, i) => (
              <motion.button
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate('/chat', { state: { subject: s.name } })}
                className="brut-card p-8 text-center flex flex-col items-center"
              >
                <div className={`w-20 h-20 ${s.color} text-white rounded-2xl flex items-center justify-center mb-6 brut-border`}>
                  <s.icon size={40} />
                </div>
                <span className="font-black text-xl text-earth-brown">{s.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 brut-card p-10 overflow-hidden relative cursor-pointer" onClick={() => navigate('/how-it-works')}>
              <div className="absolute top-0 right-0 p-10 opacity-10 w-1/3">
                 <img src={HOW_IT_WORKS_ILLU} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <div className="w-24 h-24 bg-adire-gold-light rounded-full flex items-center justify-center text-adire-gold shrink-0 brut-border">
                    <BrainCircuit size={48} />
                 </div>
                 <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black mb-2 text-earth-brown">How Igeri Works 🧠</h4>
                    <p className="text-earth-brown/60 font-medium max-w-md">Ever wondered how Igeri knows so much? Learn about the magic of AI.</p>
                 </div>
                 <span className="kid-button md:ml-auto bg-earth-brown text-white rounded-xl h-14 px-8 inline-flex items-center">
                    Discover
                 </span>
              </div>
           </div>

           <div className="brut-card p-10 flex flex-col items-center text-center justify-center cursor-pointer hover:bg-earth-brown/5 transition-colors" onClick={() => navigate('/parent')}>
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 text-earth-brown brut-border">
                 <Settings size={28} />
              </div>
              <h4 className="text-xl font-black text-earth-brown">Parent Portal</h4>
              <p className="text-xs text-earth-brown/40 font-bold uppercase tracking-widest mt-1">Manage Safety</p>
           </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-parchment border-t-[3px] border-earth-brown h-24 md:hidden flex items-center justify-around px-10 z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-nigerian-green">
          <Award size={28} />
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button
           onClick={() => navigate('/chat')}
           className="kid-button w-20 h-20 bg-nigerian-green text-white rounded-full flex items-center justify-center -mt-16"
        >
          <MessageSquare size={36} />
        </button>
        <button onClick={() => navigate('/parent')} className="flex flex-col items-center gap-1 text-earth-brown/40">
          <Settings size={28} />
          <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
        </button>
      </nav>
    </div>
  );
};
