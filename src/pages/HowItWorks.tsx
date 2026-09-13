import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Zap, BookOpen, Brain, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PhotoFeatureCard } from '@/components/site/PhotoFeatureCard';
import { MASCOT_PRO, HERO_KIDS, SAFETY_HERO_IMG, SCHOOL_IMG, CURRICULUM_IMG } from '@/lib/assets';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="sticker-badge text-nigerian-green mb-6">
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
             className="relative w-full max-w-2xl"
           >
              <div className="brut-card overflow-hidden">
                <img src={MASCOT_PRO} alt="Igeri, the AI learning companion" className="w-full h-auto" />
              </div>

              <div className="brut-card-sm absolute -top-6 -left-6 md:-left-16 px-4 py-3 flex items-center gap-2 bg-white -rotate-6">
                <div className="w-8 h-8 rounded-lg bg-sky-blue text-white flex items-center justify-center shrink-0">
                  <Globe size={16} />
                </div>
                <span className="font-black text-sm text-earth-brown">English & Pidgin</span>
              </div>

              <div className="brut-card-sm absolute -bottom-6 -right-4 md:-right-16 px-4 py-3 flex items-center gap-2 bg-white rotate-3">
                <div className="w-8 h-8 rounded-lg bg-adire-gold text-earth-brown flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <span className="font-black text-sm text-earth-brown">NERDC Aligned</span>
              </div>

              <div className="brut-card-sm absolute top-1/3 -right-6 md:-right-20 px-4 py-3 flex items-center gap-2 bg-white rotate-6 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-berry-pink text-white flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <span className="font-black text-sm text-earth-brown">Kid-Safe</span>
              </div>
           </motion.div>
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           {[
             { image: MASCOT_PRO, position: 'center', accent: 'green' as const, title: "Claude AI Layer", desc: "Powered by Anthropic's Claude API, customized with Nigerian-specific context and age filters." },
             { image: HERO_KIDS, position: 'top', accent: 'gold' as const, title: "Age-Gated Tiers", desc: "Buba, Kemi, and Chike modes ensure the language and complexity match the child's age." },
             { image: MASCOT_PRO, position: 'bottom', accent: 'sky' as const, title: "Language Logic", desc: "A hybrid model that supports Standard English, Pidgin, and indigenous languages fluently." },
             { image: SAFETY_HERO_IMG, position: 'bottom', accent: 'berry' as const, title: "Safety Guardrails", desc: "Our 'Anti-Dependency' system prevents the AI from simply giving answers to homework." },
             { image: SCHOOL_IMG, position: 'top', accent: 'green' as const, title: "Nigerian Context", desc: "Examples use local names, currency, and cultural references instead of Western ones." },
             { image: CURRICULUM_IMG, position: 'center', accent: 'gold' as const, title: "Offline Ready", desc: "Content packs can be cached to support learning in areas with intermittent internet." }
           ].map((tech, i) => (
             <PhotoFeatureCard
               key={i}
               image={tech.image}
               imagePosition={tech.position}
               accent={tech.accent}
               title={tech.title}
               description={tech.desc}
             />
           ))}
        </section>

        <section className="brut-card bg-white p-10 md:p-16 mb-24">
           <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
              <div className="w-16 h-16 bg-earth-brown text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
                 <Brain size={32} />
              </div>
              <div>
                 <h2 className="text-3xl font-black text-earth-brown mb-4">Igeri answers with a question, on purpose.</h2>
                 <p className="text-lg text-earth-brown/70 font-medium leading-relaxed mb-6">
                    Most AI tools are built to give the fastest possible answer. That's convenient — and it's quietly making a generation of kids worse at thinking for themselves. Igeri does the opposite: when a question looks like homework, it responds with a guiding question instead of the answer, so your child does the actual thinking.
                 </p>
                 <div className="flex items-start gap-3 p-4 bg-adire-gold-light rounded-xl brut-border">
                    <Lightbulb size={20} className="text-adire-gold shrink-0 mt-0.5" />
                    <p className="text-sm font-bold text-earth-brown">
                       The goal isn't a faster homework answer. It's a kid who can solve the next problem without any AI at all.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-nigerian-green rounded-2xl p-12 md:p-20 text-white flex flex-col items-center text-center">
           <h2 className="text-3xl md:text-4xl font-black mb-8 max-w-2xl">Rooted in who we are.</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl font-medium">
             IGERI AI doesn't just process data—it reflects the color, warmth, and intelligence of Nigeria. It's AI with a Nigerian soul.
           </p>
           <button onClick={() => navigate('/onboarding')} className="kid-button bg-white text-nigerian-green px-12 h-16 rounded-xl text-xl">
             Try it Yourself
           </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
