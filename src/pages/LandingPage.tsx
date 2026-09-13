import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Play, Shield, BookOpen, Globe, Sparkles, Quote } from 'lucide-react';
import { AvatarBubble } from '@/components/AvatarBubble';
import { Navbar } from '@/components/site/Navbar';
import { AnnouncementBar } from '@/components/site/AnnouncementBar';
import { Footer } from '@/components/site/Footer';
import { IconBadgeCard } from '@/components/site/IconBadgeCard';
import { HERO_KIDS, MASCOT_PRO } from '@/lib/assets';

const FEATURES = [
  { icon: Shield, color: 'green' as const, title: 'Kid-Safe by Design', desc: 'Every reply is filtered and age-gated. Parents see everything, always.', path: '/safety-center' },
  { icon: BookOpen, color: 'gold' as const, title: 'Curriculum Aligned', desc: 'Mapped to the Nigerian NERDC curriculum, from Primary to JSS.', path: '/curriculum' },
  { icon: Globe, color: 'sky' as const, title: 'Speaks Our Languages', desc: 'English and Pidgin support, with more Nigerian languages on the way.', path: '/how-it-works' },
  { icon: Sparkles, color: 'berry' as const, title: 'Guided, Not Given', desc: 'Anti-dependency guardrails teach kids to think, not just copy answers.', path: '/parents-guide' },
];

const TESTIMONIALS = [
  { name: 'Chiamaka', role: 'Parent in Lagos', quote: 'My daughter actually asks to do her homework now. Igeri makes maths feel like a game.' },
  { name: 'Tunde', role: 'Parent in Abuja', quote: "I love that I can see every conversation. It's the first AI tool I've trusted for my kids." },
  { name: 'Amaka', role: 'JSS2 Teacher', quote: 'Finally an AI that speaks Pidgin and understands our curriculum. A real Nigerian classroom tool.' },
];

const TRUST_BADGES = ['100% Kid-Safe', 'NERDC Aligned', 'English & Pidgin', 'Parent Dashboard', 'NDPA 2023 Compliant'];

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment">
      <AnnouncementBar />
      <Navbar variant="full" />

      <main className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="sticker-badge mb-6 -rotate-2">
            <Sparkles size={14} /> Empowering Nigerian Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-6 leading-[1.05] tracking-tight">
            Let's learn with <span className="text-nigerian-green">Igeri</span>, our AI learning friend.
          </h1>
          <p className="text-lg md:text-xl text-earth-brown/70 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Discover new knowledge, make learning fun, and grow with an AI companion that speaks our languages and knows our curriculum.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => navigate('/onboarding')}
              className="kid-button bg-nigerian-green text-white h-14 px-8 text-base rounded-xl group flex items-center"
            >
              Get Started <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="flex items-center gap-3 font-black text-earth-brown"
            >
              <span className="kid-button w-11 h-11 rounded-full bg-adire-gold flex items-center justify-center text-earth-brown">
                <Play size={16} className="fill-earth-brown ml-0.5" />
              </span>
              Watch How it Works
            </button>
          </div>
        </motion.div>

        {/* Photo / decorative collage — a bento of hard-bordered blocks, not a photo wall */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-20 grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          <div className="brut-card overflow-hidden -rotate-2">
            <img src={HERO_KIDS} alt="Nigerian children learning together" className="w-full h-full object-cover aspect-[3/4]" />
          </div>
          <div className="brut-card overflow-hidden bg-nigerian-green flex items-center justify-center rotate-1">
            <img src={MASCOT_PRO} alt="Igeri mascot" className="w-4/5 h-4/5 object-contain animate-float" />
          </div>
          <div className="brut-card overflow-hidden bg-adire-gold flex flex-col items-center justify-center text-earth-brown p-6 text-center -rotate-1">
            <Sparkles size={36} className="mb-3" />
            <p className="text-2xl font-black leading-none">50k+</p>
            <p className="text-xs font-black uppercase tracking-widest mt-2">Nigerian Kids Learning</p>
          </div>
        </motion.div>

        {/* Trust strip */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
          {TRUST_BADGES.map((badge) => (
            <span key={badge} className="sticker-badge text-earth-brown/80">{badge}</span>
          ))}
        </div>

        {/* Features */}
        <section className="mt-28">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-widest text-accent mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-black text-earth-brown tracking-tight">What makes Igeri different?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <IconBadgeCard
                key={f.title}
                icon={f.icon}
                color={f.color}
                title={f.title}
                description={f.desc}
                onClick={() => navigate(f.path)}
              />
            ))}
          </div>
        </section>

        {/* Split CTA section */}
        <section className="mt-28 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center">
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-adire-gold rounded-2xl brut-border rotate-6" />
            <div className="relative w-64 h-80 md:w-80 md:h-[26rem] brut-card overflow-hidden -rotate-3">
              <img src={HERO_KIDS} alt="A Nigerian child learning" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-nigerian-green mb-3">Learning Methods</p>
            <h2 className="text-4xl md:text-5xl font-black text-earth-brown mb-6 tracking-tight leading-tight">
              Access to learning, anytime and anywhere.
            </h2>
            <p className="text-earth-brown/70 font-medium leading-relaxed mb-8 max-w-md">
              Igeri fits into your family's life — a quick homework hint after school, a curiosity question at bedtime, always with a parent in the loop.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm">
              {['NERDC Curriculum', 'Kid-Safe Guardrails', 'English & Pidgin', 'Parent Dashboard'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-nigerian-green border-2 border-earth-brown shrink-0" />
                  <span className="text-sm font-bold text-earth-brown/80">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              className="kid-button bg-earth-brown text-white h-14 px-8 rounded-xl"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-28">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-widest text-accent mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-black text-earth-brown tracking-tight">Loved by families across Nigeria</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="brut-card p-8 relative">
                <Quote className="text-nigerian-green/20 absolute top-6 right-6" size={40} />
                <p className="text-earth-brown/80 font-medium leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <AvatarBubble name={t.name} size={40} />
                  <div>
                    <p className="font-black text-earth-brown text-sm">{t.name}</p>
                    <p className="text-xs text-earth-brown/50 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-28 mb-8 bg-nigerian-green rounded-2xl brut-border p-12 md:p-20 text-center text-white relative overflow-hidden" style={{ boxShadow: 'var(--shadow-brut-lg)' }}>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Ready to start the journey?</h2>
          <p className="text-white/80 font-medium mb-10 max-w-xl mx-auto">
            Join thousands of Nigerian families already learning with Igeri.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="kid-button bg-white text-nigerian-green h-16 px-10 text-lg rounded-xl"
          >
            Create Your Free Account
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};
