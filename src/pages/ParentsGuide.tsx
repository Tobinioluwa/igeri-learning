import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HelpCircle, LayoutDashboard, Settings, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PARENTS_GUIDE_IMG } from '@/lib/assets';

const ParentsGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticker-badge text-adire-gold mb-6">
              <BookOpen size={16} />
              <span>Support Your Child</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              The <span className="text-adire-gold">Parents Guide</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              Helping your child navigate the world of AI doesn't have to be complicated. We've made IGERI AI your partner in education.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/onboarding')} className="kid-button bg-nigerian-green text-white px-8 h-14 rounded-xl">
                Create Parent Account
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] brut-card overflow-hidden">
              <img src={PARENTS_GUIDE_IMG} alt="Parents helping child" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-earth-brown">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "1. Setup Profile", desc: "Create your parent account and add your child. We'll ask for their age to set the right mode." },
              { icon: LayoutDashboard, title: "2. Explore Dashboard", desc: "Familiarize yourself with the dashboard where you can see learning stats and conversation logs." },
              { icon: Settings, title: "3. Set Limits", desc: "Use our time-limit controls to ensure a healthy balance between digital and offline learning." }
            ].map((step, i) => (
              <div key={i} className="p-8 brut-card">
                <div className="w-16 h-16 bg-adire-gold text-white rounded-xl flex items-center justify-center mb-6 brut-border">
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-earth-brown">{step.title}</h3>
                <p className="text-earth-brown/60 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 brut-card bg-white p-12">
           <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-earth-brown">
                <HelpCircle className="text-nigerian-green" size={32} />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  { q: "Is IGERI AI safe for very young children?", a: "Yes. Our 'Buba Mode' is specifically designed for ages 5-8 with simple language and heavy filtering." },
                  { q: "Will the AI do my child's homework?", a: "No. IGERI AI is programmed with anti-dependency guardrails. It will guide them through hints rather than giving answers." },
                  { q: "Can I use it on multiple devices?", a: "Yes. One parent account can manage up to 3 child profiles across different smartphones or computers." }
                ].map((faq, i) => (
                  <div key={i} className="pb-6 border-b-[3px] border-earth-brown/10 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-lg mb-2 text-earth-brown">{faq.q}</h4>
                    <p className="text-earth-brown/60 font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ParentsGuide;
