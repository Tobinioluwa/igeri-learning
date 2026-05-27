import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, FileText, CheckCircle, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Safety = () => {
  const navigate = useNavigate();
  const SAFETY_HERO_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/digital-safety-shield-png-953902ca-1779836834991.webp";

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
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
              <Shield size={16} />
              <span>Safety & Policy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
              Privacy & <br /><span className="text-nigerian-green">Trust</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              We take the responsibility of building for children seriously. Here's how we protect your child's data and digital well-being.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src={SAFETY_HERO_IMG} alt="Digital Safety Shield" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <section className="grid md:grid-cols-2 gap-12 mb-32">
           {[
             { icon: Lock, title: "Data Encryption", desc: "All conversations and personal data are encrypted at rest using AES-256 standard and in transit via TLS." },
             { icon: EyeOff, title: "No Third-Party Tracking", desc: "We never use third-party ad tracking or selling services. Your child's identity stays private." },
             { icon: Database, title: "Nigerian Data Residency", desc: "We process data in compliance with the Nigeria Data Protection Act (NDPA) 2023 guidelines." },
             { icon: FileText, title: "Parental Consent", desc: "No child account can be activated without explicit parent or guardian verification via OTP." }
           ].map((policy, i) => (
             <div key={i} className="flex gap-6 p-8 glass rounded-[2.5rem] border-white/60">
               <div className="w-16 h-16 bg-nigerian-green/10 rounded-2xl flex items-center justify-center text-nigerian-green shrink-0">
                 <policy.icon size={32} />
               </div>
               <div>
                 <h3 className="text-2xl font-black mb-3">{policy.title}</h3>
                 <p className="text-earth-brown/60 font-medium leading-relaxed">{policy.desc}</p>
               </div>
             </div>
           ))}
        </section>

        <section className="bg-white/50 backdrop-blur-md p-12 md:p-20 rounded-[3rem] border border-earth-brown/5">
           <h2 className="text-3xl font-black mb-12 text-center">Safety Compliance</h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "NDPA 2023 Compliant",
                "NERDC Standardized",
                "COPPA (Best Practice)",
                "GDPR (Best Practice)"
              ].map((cert, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                   <div className="w-20 h-20 bg-nigerian-green rounded-full flex items-center justify-center text-white">
                      <CheckCircle size={40} />
                   </div>
                   <span className="font-bold text-earth-brown tracking-tight">{cert}</span>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default Safety;