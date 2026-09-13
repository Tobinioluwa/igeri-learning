import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Lock, UserCheck, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SAFETY_CENTER_IMG } from '@/lib/assets';

const SafetyCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />

      <Navbar />

      <main className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
            <Shield size={16} />
            <span>Child Protection First</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
            Our <span className="text-nigerian-green">Safety Center</span>
          </h1>
          <p className="text-xl text-earth-brown/60 font-medium leading-relaxed">
            The safety of Nigerian children is our highest priority. We've built IGERI AI with multiple layers of protection to ensure a secure learning environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: ShieldAlert, color: 'bg-nigerian-green', title: "Automated Moderation", desc: "Every word is filtered by AI to prevent adult content, violence, or harmful advice." },
              { icon: Lock, color: 'bg-adire-gold', title: "Data Privacy", desc: "We comply with Nigeria Data Protection Act (NDPA) 2023. We never sell child data." },
              { icon: Eye, color: 'bg-sky-blue', title: "Parental Oversight", desc: "Parents get full logs of every conversation and can lock specific subjects anytime." },
              { icon: Heart, color: 'bg-berry-pink', title: "Emotional Safety", desc: "Our AI is designed to be warm and encouraging, never critical or scolding." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white rounded-[2rem] shadow-kid">
                <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center shrink-0`}>
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 text-earth-brown">{item.title}</h3>
                  <p className="text-earth-brown/60 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square pill-photo overflow-hidden shadow-2xl">
              <img src={SAFETY_CENTER_IMG} alt="Children in safety" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-6 md:-left-10 p-8 bg-white rounded-[2.5rem] shadow-xl max-w-xs">
              <UserCheck className="text-nigerian-green mb-4" size={32} />
              <p className="font-bold text-lg mb-2 text-earth-brown">Verified Identity</p>
              <p className="text-sm text-earth-brown/50 font-medium">Only parents can create child profiles with secure OTP verification.</p>
            </div>
          </motion.div>
        </div>

        <section className="bg-earth-brown rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center">
           <div className="absolute inset-0 adire-pattern opacity-10" />
           <h2 className="text-4xl md:text-5xl font-black mb-8">Report a Concern</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             If you notice anything unusual or have a safety question, our dedicated team is here to help 24/7.
           </p>
           <Button onClick={() => navigate('/contact')} className="bg-adire-gold hover:bg-adire-gold/90 text-white font-black px-12 h-16 rounded-full kid-button text-xl">
             Contact Safety Team
           </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyCenter;
