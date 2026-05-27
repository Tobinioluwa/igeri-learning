import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, MessageCircle, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();
  const HOW_IT_WORKS_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/how-igeri-works-png-3b93aeff-1779836835366.webp";

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />
      
      <nav className="relative z-30 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-earth-brown/5">
             <img src="https://storage.googleapis.com/dala-prod-public-storage/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png" alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xl font-black text-nigerian-green">IGERI AI</span>
        </div>
        <Button variant="ghost" className="font-bold text-earth-brown" onClick={() => navigate('/')}>Back Home</Button>
      </nav>

      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
              <Zap size={16} />
              <span>Technology Behind Igeri</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
              How <span className="text-nigerian-green">Igeri Works</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed max-w-2xl mx-auto">
              Behind our friendly mascot is a sophisticated AI engine tuned specifically for the Nigerian classroom and culture.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-24">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative max-w-4xl"
           >
              <img src={HOW_IT_WORKS_IMG} alt="How it works visualization" className="w-full h-auto drop-shadow-2xl" />
           </motion.div>
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
           {[
             { icon: Cpu, title: "Claude AI Layer", desc: "Powered by Anthropic's Claude API, customized with Nigerian-specific context and age filters." },
             { icon: Layers, title: "Age-Gated Tiers", desc: "Buba, Kemi, and Chike modes ensure the language and complexity match the child's age." },
             { icon: Globe, title: "Language Logic", desc: "A hybrid model that supports Standard English, Pidgin, and indigenous languages fluently." },
             { icon: ShieldCheck, title: "Safety Guardrails", desc: "Our 'Anti-Dependency' system prevents the AI from simply giving answers to homework." },
             { icon: MessageCircle, title: "Nigerian Context", desc: "Examples use local names, currency, and cultural references instead of Western ones." },
             { icon: Zap, title: "Offline Ready", desc: "Content packs can be cached to support learning in areas with intermittent internet." }
           ].map((tech, i) => (
             <div key={i} className="p-8 glass rounded-[2rem] border-white/60">
               <div className="w-14 h-14 bg-earth-brown/5 rounded-2xl flex items-center justify-center text-earth-brown mb-6">
                 <tech.icon size={28} />
               </div>
               <h3 className="text-xl font-black mb-4">{tech.title}</h3>
               <p className="text-earth-brown/60 font-medium leading-relaxed">{tech.desc}</p>
             </div>
           ))}
        </section>

        <section className="bg-nigerian-green rounded-[3rem] p-12 md:p-20 text-white flex flex-col items-center text-center">
           <h2 className="text-3xl md:text-4xl font-black mb-8 max-w-2xl">Rooted in who we are.</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl font-medium">
             IGERI AI doesn't just process data—it reflects the color, warmth, and intelligence of Nigeria. It's AI with a Nigerian soul.
           </p>
           <Button onClick={() => navigate('/onboarding')} className="bg-white text-nigerian-green font-black px-12 h-16 rounded-2xl kid-button text-xl">
             Try it Yourself
           </Button>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;