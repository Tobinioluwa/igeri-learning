import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SAFETY_HERO_IMG, SAFETY_CENTER_IMG, SCHOOL_IMG, PARENTS_GUIDE_IMG } from '@/lib/assets';

const Safety = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticker-badge text-nigerian-green mb-6">
              <Shield size={16} />
              <span>Safety &amp; Policy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              Privacy &amp; <br /><span className="text-nigerian-green">Trust</span>
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
            <div className="aspect-square brut-card overflow-hidden">
              <img src={SAFETY_HERO_IMG} alt="Digital Safety Shield" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <section className="grid md:grid-cols-2 gap-6 mb-32">
           {[
             { image: SAFETY_HERO_IMG, position: '80% center', title: "Data Encryption", desc: "All conversations and personal data are encrypted at rest using AES-256 standard and in transit via TLS." },
             { image: SAFETY_CENTER_IMG, position: 'bottom', title: "No Third-Party Tracking", desc: "We never use third-party ad tracking or selling services. Your child's identity stays private." },
             { image: SCHOOL_IMG, position: 'center', title: "Nigerian Data Residency", desc: "We process data in compliance with the Nigeria Data Protection Act (NDPA) 2023 guidelines." },
             { image: PARENTS_GUIDE_IMG, position: 'top', title: "Parental Consent", desc: "No child account can be activated without explicit parent or guardian verification via OTP." }
           ].map((policy, i) => (
             <div key={i} className="flex gap-6 p-8 brut-card">
               <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 brut-border">
                 <img src={policy.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: policy.position }} />
               </div>
               <div>
                 <h3 className="text-2xl font-black mb-3 text-earth-brown">{policy.title}</h3>
                 <p className="text-earth-brown/60 font-medium leading-relaxed">{policy.desc}</p>
               </div>
             </div>
           ))}
        </section>

        <section className="brut-card bg-white p-12 md:p-20">
           <h2 className="text-3xl font-black mb-12 text-center text-earth-brown">Safety Compliance</h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "NDPA 2023 Compliant",
                "NERDC Standardized",
                "COPPA (Best Practice)",
                "GDPR (Best Practice)"
              ].map((cert, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                   <div className="w-20 h-20 bg-nigerian-green rounded-full flex items-center justify-center text-white brut-border">
                      <CheckCircle size={40} />
                   </div>
                   <span className="font-bold text-earth-brown tracking-tight">{cert}</span>
                </div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;
