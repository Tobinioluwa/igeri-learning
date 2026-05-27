import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  Sparkles,
  Trophy
} from 'lucide-react';
import { toast } from 'sonner';

export const ChildDashboard = () => {
  const { profile, clearAll, language, setLanguage } = useStore();
  const navigate = useNavigate();

  if (!profile) return null;

  const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png";
  const MASCOT_PRO = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/igeri-mascot-pro-png-a5d3d9c2-1779825769745.webp";
  const HOW_IT_WORKS_ILLU = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/how-igeri-works-png-3b93aeff-1779836835366.webp";

  const subjects = [
    { name: 'Maths', icon: Calculator, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { name: 'English', icon: Globe2, color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
    { name: 'Basic Science', icon: FlaskConical, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
    { name: 'Civic Ed', icon: Award, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
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
      <header className="bg-white/70 backdrop-blur-2xl sticky top-0 z-40 border-b border-earth-brown/5 shadow-sm">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-earth-brown/5 group-hover:scale-110 transition-transform">
               <img src={LOGO_URL} className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h1 className="font-black text-2xl text-nigerian-green leading-none tracking-tighter">IGERI AI</h1>
              <p className="text-[10px] text-earth-brown/40 font-black uppercase tracking-widest mt-0.5">{getTierLabel()}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
             <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'English' ? 'Pidgin' : 'English')}
                className="hidden md:flex rounded-2xl border-earth-brown/10 font-black text-xs h-10 px-4"
              >
                {language === 'English' ? '🇬🇧 English' : '🇳🇬 Pidgin'}
              </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                clearAll();
                navigate('/');
              }}
              className="rounded-2xl border-earth-brown/10 w-12 h-12 hover:bg-destructive hover:text-white transition-all"
            >
              <LogOut size={22} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="nigerian-gradient rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 adire-pattern opacity-10" />
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-6">
                 <Sparkles size={16} />
                 <span className="text-xs font-black uppercase tracking-widest">Great job learning this week!</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Welcome back, <br />{profile.name}! 👋</h2>
              <p className="text-white/80 text-xl font-medium mb-10 leading-relaxed">Ready to sharpen your mind with Igeri today?</p>
              
              <Button 
                size="lg" 
                onClick={() => navigate('/chat')}
                className="bg-white text-nigerian-green hover:bg-white/90 rounded-2xl h-16 px-10 shadow-xl font-black text-xl kid-button"
              >
                Start Learning Now <ChevronRight className="ml-2" />
              </Button>
            </div>
            
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={MASCOT_PRO} 
              className="absolute -bottom-10 -right-6 w-72 h-72 md:w-[450px] md:h-[450px] object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hidden md:block"
            />
          </div>
        </motion.div>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black flex items-center gap-3">
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
                whileHover={{ y: -10 }}
                onClick={() => navigate('/chat', { state: { subject: s.name } })}
                className={`bg-white p-8 rounded-[2.5rem] border ${s.border} shadow-kid hover:shadow-kid-hover transition-all text-center flex flex-col items-center group`}
              >
                <div className={`w-20 h-20 ${s.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <s.icon size={40} />
                </div>
                <span className="font-black text-xl text-earth-brown">{s.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2 p-10 rounded-[3rem] border-earth-brown/5 shadow-kid overflow-hidden relative group cursor-pointer" onClick={() => navigate('/how-it-works')}>
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform w-1/3">
                 <img src={HOW_IT_WORKS_ILLU} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <div className="w-24 h-24 bg-adire-gold/10 rounded-full flex items-center justify-center text-adire-gold shrink-0">
                    <BrainCircuit size={48} />
                 </div>
                 <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black mb-2">How Igeri Works 🧠</h4>
                    <p className="text-earth-brown/60 font-medium max-w-md">Ever wondered how Igeri knows so much? Learn about the magic of AI.</p>
                 </div>
                 <Button className="md:ml-auto bg-earth-brown text-white font-black rounded-2xl kid-button h-14 px-8">
                    Discover
                 </Button>
              </div>
           </Card>

           <Card className="p-10 rounded-[3rem] border-earth-brown/5 shadow-kid flex flex-col items-center text-center justify-center group cursor-pointer hover:bg-earth-brown/5 transition-colors" onClick={() => navigate('/parent')}>
              <div className="w-16 h-16 bg-white shadow-kid rounded-2xl flex items-center justify-center mb-6 text-earth-brown group-hover:rotate-12 transition-transform">
                 <Settings size={28} />
              </div>
              <h4 className="text-xl font-black">Parent Portal</h4>
              <p className="text-xs text-earth-brown/40 font-bold uppercase tracking-widest mt-1">Manage Safety</p>
           </Card>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-earth-brown/5 h-24 md:hidden flex items-center justify-around px-10 z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-nigerian-green">
          <Award size={28} />
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button 
           onClick={() => navigate('/chat')}
           className="w-20 h-20 nigerian-gradient text-white rounded-full flex items-center justify-center shadow-2xl -mt-16 border-8 border-parchment kid-button"
        >
          <MessageSquare size={36} />
        </button>
        <button onClick={() => navigate('/parent')} className="flex flex-col items-center gap-1 text-earth-brown/30">
          <Settings size={28} />
          <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
        </button>
      </nav>
    </div>
  );
};