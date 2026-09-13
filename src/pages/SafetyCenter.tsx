import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SAFETY_CENTER_IMG, SAFETY_HERO_IMG, PARENTS_GUIDE_IMG, MASCOT_PRO } from '@/lib/assets';

const SafetyCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="sticker-badge text-nigerian-green mb-6">
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
              { image: SAFETY_HERO_IMG, position: 'center', title: "Automated Moderation", desc: "Every word is filtered by AI to prevent adult content, violence, or harmful advice." },
              { image: SAFETY_CENTER_IMG, position: 'top', title: "Data Privacy", desc: "We comply with Nigeria Data Protection Act (NDPA) 2023. We never sell child data." },
              { image: PARENTS_GUIDE_IMG, position: 'center', title: "Parental Oversight", desc: "Parents get full logs of every conversation and can lock specific subjects anytime." },
              { image: MASCOT_PRO, position: 'center', title: "Emotional Safety", desc: "Our AI is designed to be warm and encouraging, never critical or scolding." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 brut-card-sm">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 brut-border">
                  <img src={item.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: item.position }} />
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
            <div className="relative aspect-square brut-card overflow-hidden">
              <img src={SAFETY_CENTER_IMG} alt="Children in safety" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-6 md:-left-10 p-8 brut-card max-w-xs">
              <UserCheck className="text-nigerian-green mb-4" size={32} />
              <p className="font-bold text-lg mb-2 text-earth-brown">Verified Identity</p>
              <p className="text-sm text-earth-brown/50 font-medium">Only parents can create child profiles with secure OTP verification.</p>
            </div>
          </motion.div>
        </div>

        <section className="bg-earth-brown rounded-2xl p-12 md:p-20 text-white text-center">
           <h2 className="text-4xl md:text-5xl font-black mb-8">Report a Concern</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             If you notice anything unusual or have a safety question, our dedicated team is here to help 24/7.
           </p>
           <button onClick={() => navigate('/contact')} className="kid-button bg-adire-gold text-earth-brown px-12 h-16 rounded-xl text-xl">
             Contact Safety Team
           </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyCenter;
