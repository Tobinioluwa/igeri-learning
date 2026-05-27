import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Lock, UserCheck, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SafetyCenter = () => {
  const navigate = useNavigate();
  const SAFETY_CENTER_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/children-safety-center-png-39acc2ea-1779836835745.webp";

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />
      
      {/* Navigation */}
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
            <Shield size={16} />
            <span>Child Protection First</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
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
            className="space-y-8"
          >
            {[
              { icon: ShieldAlert, title: "Automated Moderation", desc: "Every word is filtered by AI to prevent adult content, violence, or harmful advice." },
              { icon: Lock, title: "Data Privacy", desc: "We comply with Nigeria Data Protection Act (NDPA) 2023. We never sell child data." },
              { icon: Eye, title: "Parental Oversight", desc: "Parents get full logs of every conversation and can lock specific subjects anytime." },
              { icon: Heart, title: "Emotional Safety", desc: "Our AI is designed to be warm and encouraging, never critical or scolding." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 glass rounded-[2rem] border-white/60">
                <div className="w-14 h-14 bg-nigerian-green/10 rounded-2xl flex items-center justify-center text-nigerian-green shrink-0">
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
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
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src={SAFETY_CENTER_IMG} alt="Children in safety" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 p-8 glass rounded-[2.5rem] border-white/60 shadow-xl max-w-xs">
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
           <Button className="bg-adire-gold hover:bg-adire-gold/90 text-white font-black px-12 h-16 rounded-2xl kid-button text-xl">
             Contact Safety Team
           </Button>
        </section>
      </main>

      <footer className="py-12 border-t border-earth-brown/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-earth-brown/30 uppercase tracking-widest">IGERI AI Safety Standard 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default SafetyCenter;