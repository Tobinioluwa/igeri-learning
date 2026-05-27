import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, BookOpen, Globe, Star, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingPage = () => {
  const navigate = useNavigate();
  const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png";
  const MASCOT_PRO = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/igeri-mascot-pro-png-a5d3d9c2-1779825769745.webp";
  const HERO_KIDS = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/joyful-nigerian-kids-hero-png-0fde037d-1779836834434.webp";

  const navLinks = [
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Safety', path: '/safety' },
    { name: 'For Schools', path: '/for-schools' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />
      
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-nigerian-green/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-adire-gold/10 rounded-full blur-[100px]" />

      <nav className="relative z-30 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-earth-brown/5 group-hover:rotate-6 transition-transform">
             <img src={LOGO_URL} alt="Igeri AI Logo" className="w-9 h-9 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-nigerian-green tracking-tighter leading-none">IGERI AI</span>
            <span className="text-[10px] font-bold text-earth-brown/40 tracking-widest uppercase">Heart of Nigeria</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
           {navLinks.map((link) => (
             <button key={link.name} onClick={() => navigate(link.path)} className="text-sm font-bold text-earth-brown/60 hover:text-nigerian-green transition-colors relative group">
               {link.name}
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nigerian-green transition-all group-hover:w-full" />
             </button>
           ))}
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="hidden sm:flex text-earth-brown font-bold"
            onClick={() => navigate('/onboarding')}
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-nigerian-green hover:bg-nigerian-green/90 text-white rounded-2xl px-8 font-black shadow-lg hover:shadow-nigerian-green/20 kid-button"
          >
            Join Now
          </Button>
        </div>
      </nav>

      <main className="relative z-20 container mx-auto px-6 pt-10 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-earth-brown/5 shadow-sm mb-8">
               <span className="w-2 h-2 bg-nigerian-green rounded-full animate-pulse" />
               <span className="text-xs font-black text-earth-brown/60 uppercase tracking-widest">Empowering Nigerian Excellence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
              The Heart of <br />
              <span className="text-nigerian-green">Learning.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-earth-brown/60 font-medium mb-10 leading-relaxed max-w-lg">
              Smart AI for Nigerian kids that speaks our languages, honors our culture, and matches our curriculum.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/onboarding')}
                className="w-full sm:w-auto bg-nigerian-green text-white h-16 px-10 text-xl font-black rounded-[1.25rem] shadow-2xl kid-button group"
              >
                Start Learning <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-4 p-2 pl-4 bg-white/40 rounded-2xl border border-white/60">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/100?u=igeri${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                   ))}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-black text-earth-brown">50,000+</span>
                   <span className="text-[10px] font-bold text-earth-brown/40 uppercase">Nigerian Kids</span>
                 </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-earth-brown/5 pt-10">
               <div className="flex gap-4 cursor-pointer" onClick={() => navigate('/safety-center')}>
                  <CheckCircle2 className="text-nigerian-green shrink-0" />
                  <div>
                    <p className="font-black text-earth-brown">100% Kid Safe</p>
                    <p className="text-xs text-earth-brown/50 font-medium leading-tight">View our Safety Center →</p>
                  </div>
               </div>
               <div className="flex gap-4 cursor-pointer" onClick={() => navigate('/curriculum')}>
                  <CheckCircle2 className="text-nigerian-green shrink-0" />
                  <div>
                    <p className="font-black text-earth-brown">Curriculum Match</p>
                    <p className="text-xs text-earth-brown/50 font-medium leading-tight">NERDC Standardized →</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-xl mx-auto">
               <div className="absolute inset-0 bg-gradient-to-tr from-nigerian-green to-adire-gold rounded-[3rem] rotate-6 scale-95 opacity-10" />
               <div className="absolute inset-0 glass rounded-[3rem] overflow-hidden border-2 border-white/50">
                  <img 
                    src={HERO_KIDS} 
                    alt="Joyful Nigerian Kids" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                     <p className="text-2xl font-black">Built for the future.</p>
                     <p className="text-sm font-bold opacity-80">Empowering every Nigerian child.</p>
                  </div>
               </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 animate-float">
               <img src={MASCOT_PRO} alt="Igeri Mascot" className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>

        <section className="mt-32">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Safe. Smart. Indigenous.</h2>
              <p className="text-lg text-earth-brown/50 max-w-xl mx-auto font-medium">IGERI AI is more than a chatbot—it's a mentor designed for our classroom.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Safety Center', path: '/safety-center', icon: Shield, color: 'bg-green-100', text: 'text-nigerian-green', desc: 'How we keep children safe and parents in control.' },
                { title: 'Parents Guide', path: '/parents-guide', icon: BookOpen, color: 'bg-amber-100', text: 'text-adire-gold', desc: 'Everything you need to support your child.' },
                { title: 'Schools', path: '/schools', icon: Globe, color: 'bg-slate-100', text: 'text-earth-brown', desc: 'Partnering with educational institutions nationwide.' }
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(card.path)}
                  className="p-10 glass rounded-[2.5rem] cursor-pointer group"
                >
                   <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <card.icon className={card.text} size={28} />
                   </div>
                   <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                   <p className="text-earth-brown/60 font-medium leading-relaxed">{card.desc}</p>
                   <div className="mt-6 flex items-center gap-2 font-bold text-sm text-nigerian-green uppercase tracking-widest">
                     Explore More <ChevronRight size={14} />
                   </div>
                </motion.div>
              ))}
           </div>
        </section>
      </main>

      <footer className="bg-white/50 backdrop-blur-md py-12 relative overflow-hidden border-t border-earth-brown/5">
         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} className="w-8 h-8 grayscale opacity-50" />
              <span className="text-lg font-black text-earth-brown/30 tracking-widest uppercase">IGERI AI</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-earth-brown/40 uppercase tracking-widest">
               <button onClick={() => navigate('/safety-center')}>Safety Center</button>
               <button onClick={() => navigate('/parents-guide')}>Parents Guide</button>
               <button onClick={() => navigate('/for-schools')}>For Schools</button>
               <button onClick={() => navigate('/contact')}>Contact</button>
            </div>
            <p className="text-[10px] font-black text-earth-brown/30 uppercase tracking-widest">© 2026 IGERI AI • NYSC Abuja</p>
         </div>
         <div className="ankara-border mt-12" />
      </footer>
    </div>
  );
};