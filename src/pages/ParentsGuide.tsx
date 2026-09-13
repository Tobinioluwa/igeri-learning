import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HelpCircle, LayoutDashboard, Settings, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PARENTS_GUIDE_IMG } from '@/lib/assets';

const ParentsGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />

      <Navbar />

      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-adire-gold/10 px-4 py-2 rounded-full text-adire-gold font-bold text-sm mb-6 border border-adire-gold/20">
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
              <Button onClick={() => navigate('/onboarding')} className="bg-nigerian-green hover:bg-nigerian-green/90 text-white font-black px-8 h-14 rounded-full kid-button shadow-lg">
                Create Parent Account
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] pill-photo overflow-hidden shadow-2xl">
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
              <Card key={i} className="p-8 rounded-[2.5rem] shadow-kid border-none">
                <div className="w-16 h-16 bg-adire-gold text-white rounded-2xl flex items-center justify-center mb-6">
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-earth-brown">{step.title}</h3>
                <p className="text-earth-brown/60 font-medium leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-24 bg-white rounded-[3rem] p-12 shadow-kid">
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
                  <div key={i} className="pb-6 border-b border-earth-brown/5">
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
