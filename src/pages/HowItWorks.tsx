import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, MessageCircle, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { HOW_IT_WORKS_ILLU } from '@/lib/assets';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />

      <Navbar />

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
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
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
              <img src={HOW_IT_WORKS_ILLU} alt="How it works visualization" className="w-full h-auto drop-shadow-2xl" />
           </motion.div>
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
           {[
             { icon: Cpu, color: 'bg-nigerian-green', title: "Claude AI Layer", desc: "Powered by Anthropic's Claude API, customized with Nigerian-specific context and age filters." },
             { icon: Layers, color: 'bg-adire-gold', title: "Age-Gated Tiers", desc: "Buba, Kemi, and Chike modes ensure the language and complexity match the child's age." },
             { icon: Globe, color: 'bg-sky-blue', title: "Language Logic", desc: "A hybrid model that supports Standard English, Pidgin, and indigenous languages fluently." },
             { icon: ShieldCheck, color: 'bg-berry-pink', title: "Safety Guardrails", desc: "Our 'Anti-Dependency' system prevents the AI from simply giving answers to homework." },
             { icon: MessageCircle, color: 'bg-nigerian-green', title: "Nigerian Context", desc: "Examples use local names, currency, and cultural references instead of Western ones." },
             { icon: Zap, color: 'bg-adire-gold', title: "Offline Ready", desc: "Content packs can be cached to support learning in areas with intermittent internet." }
           ].map((tech, i) => (
             <div key={i} className="p-8 bg-white rounded-[2rem] shadow-kid">
               <div className={`w-14 h-14 ${tech.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                 <tech.icon size={28} />
               </div>
               <h3 className="text-xl font-black mb-4 text-earth-brown">{tech.title}</h3>
               <p className="text-earth-brown/60 font-medium leading-relaxed">{tech.desc}</p>
             </div>
           ))}
        </section>

        <section className="bg-nigerian-green rounded-[3rem] p-12 md:p-20 text-white flex flex-col items-center text-center">
           <h2 className="text-3xl md:text-4xl font-black mb-8 max-w-2xl">Rooted in who we are.</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl font-medium">
             IGERI AI doesn't just process data—it reflects the color, warmth, and intelligence of Nigeria. It's AI with a Nigerian soul.
           </p>
           <Button onClick={() => navigate('/onboarding')} className="bg-white text-nigerian-green font-black px-12 h-16 rounded-full kid-button text-xl">
             Try it Yourself
           </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
