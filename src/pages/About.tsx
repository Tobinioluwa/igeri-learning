import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Users, Shield, Sparkles, TrendingDown, MessageCircleQuestion } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { MASCOT_PRO } from '@/lib/assets';

const VALUES = [
  { icon: Brain, color: 'bg-nigerian-green', title: 'Think First, Ask Second', desc: "Igeri's job is to make your child a stronger thinker, not a faster copier." },
  { icon: Shield, color: 'bg-adire-gold', title: 'Parents Stay in the Loop', desc: 'Every conversation is visible to the parent account. Nothing is hidden.' },
  { icon: Heart, color: 'bg-berry-pink', title: 'Proudly Nigerian', desc: 'Built with our languages, our curriculum, and our culture — not a translated import.' },
  { icon: Users, color: 'bg-sky-blue', title: 'Built for Every Child', desc: 'Three age tiers, from a 5-year-old learning to count to a 17-year-old prepping for exams.' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticker-badge text-nigerian-green mb-6">
              <Heart size={16} />
              <span>Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              About <span className="text-nigerian-green">IGERI AI</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-4">
              IGERI AI started as an NYSC community service project in Abuja, built on a simple belief: Nigerian children deserve an AI companion that speaks their languages, understands their curriculum, and actually makes them smarter — not one more borrowed off-the-shelf chatbot.
            </p>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed">
              "Igeri" means to build, to make, to grow — and that's the whole point. Every child who uses it should walk away having built something in their own head, not just received an answer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square brut-card overflow-hidden rotate-1">
              <img src={MASCOT_PRO} alt="Igeri mascot" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* The core philosophy: anti-dependency */}
        <section className="mb-28">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="sticker-badge text-accent mb-6">
              <TrendingDown size={16} />
              <span>The Problem We're Solving</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-earth-brown tracking-tight mb-6">
              AI is making it easy to stop thinking. We built Igeri to reverse that.
            </h2>
            <p className="text-lg text-earth-brown/60 font-medium leading-relaxed">
              Every year, more kids grow up asking a bot instead of working through a problem — and the research is starting to show what you'd expect: the less you have to think, the worse you get at it. That's a dangerous trade to make with an entire generation of Nigerian children.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="brut-card p-10 bg-destructive/5">
              <div className="w-14 h-14 bg-destructive text-white rounded-xl flex items-center justify-center mb-6 brut-border">
                <TrendingDown size={28} />
              </div>
              <h3 className="text-2xl font-black text-earth-brown mb-3">What most AI tools do</h3>
              <p className="text-earth-brown/70 font-medium leading-relaxed">
                Give the fastest, most complete answer possible. It feels helpful in the moment — and it quietly trains kids to stop attempting the hard part: thinking it through themselves.
              </p>
            </div>
            <div className="brut-card p-10 bg-nigerian-green-light">
              <div className="w-14 h-14 bg-nigerian-green text-white rounded-xl flex items-center justify-center mb-6 brut-border">
                <MessageCircleQuestion size={28} />
              </div>
              <h3 className="text-2xl font-black text-earth-brown mb-3">What Igeri does instead</h3>
              <p className="text-earth-brown/70 font-medium leading-relaxed">
                Notices when a question looks like homework, and responds with a hint or a guiding question — so your child does the reasoning, and actually gets better at it over time.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-28">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-widest text-accent mb-3">What We Stand For</p>
            <h2 className="text-4xl md:text-5xl font-black text-earth-brown tracking-tight">Built with intention</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="brut-card p-8">
                <div className={`w-14 h-14 ${v.color} text-white rounded-xl flex items-center justify-center mb-6 brut-border`}>
                  <v.icon size={26} />
                </div>
                <h3 className="text-xl font-black text-earth-brown mb-3">{v.title}</h3>
                <p className="text-earth-brown/60 font-medium leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-earth-brown rounded-2xl p-12 md:p-20 text-white text-center">
           <Sparkles size={40} className="mx-auto mb-6 text-adire-gold" />
           <h2 className="text-3xl md:text-5xl font-black mb-6">Raise a thinker, not a copier.</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             Join thousands of Nigerian families using IGERI AI to build sharper minds, not just faster homework.
           </p>
           <button onClick={() => navigate('/onboarding')} className="kid-button bg-white text-earth-brown px-12 h-16 rounded-xl text-xl">
             Get Started
           </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
