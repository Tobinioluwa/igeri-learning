import React from 'react';
import { motion } from 'framer-motion';
import { School, Users, Award, Layout, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Schools = () => {
  const navigate = useNavigate();
  const SCHOOL_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/modern-nigerian-school-png-b5b11cb2-1779836835736.webp";

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

      <main className="relative z-10 container mx-auto px-6 py-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
            <School size={16} />
            <span>Educational Partnerships</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
            Transforming <span className="text-nigerian-green">Classrooms.</span>
          </h1>
          <p className="text-xl text-earth-brown/60 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Empower your teachers and pupils with Nigeria's first curriculum-aligned AI assistant. Designed for the modern Nigerian school.
          </p>
          <Button onClick={() => navigate('/contact')} className="bg-nigerian-green text-white font-black px-12 h-16 rounded-2xl kid-button text-xl shadow-xl">
            Partner with Us
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-6xl mx-auto mb-32"
        >
          <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img src={SCHOOL_IMG} alt="Modern Nigerian School" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Users, title: "School-wide Access", desc: "Annual licenses for every pupil and teacher in your primary or junior secondary school." },
            { icon: Layout, title: "Teacher Dashboard", desc: "Gain insights into class progress, common learning gaps, and individual engagement." },
            { icon: GraduationCap, title: "Teacher Support", desc: "IGERI AI helps teachers with lesson plans and provides instant explanations for complex topics." }
          ].map((feature, i) => (
            <div key={i} className="p-10 glass rounded-[2.5rem] border-white/60">
              <div className="w-16 h-16 bg-nigerian-green/10 rounded-2xl flex items-center justify-center text-nigerian-green mx-auto mb-8">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="text-earth-brown/60 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto mb-32 bg-white/50 backdrop-blur-md p-12 rounded-[3rem] border border-earth-brown/5 text-left">
           <h2 className="text-3xl font-black mb-8">Pilot Programs (FCT Abuja)</h2>
           <p className="text-lg text-earth-brown/70 font-medium mb-8">
             We are currently selecting 5 schools in the FCT Abuja for our Phase 2 pilot program. Participants will receive early access, training, and direct support from IGERI AI.
           </p>
           <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Complimentary Teacher Training",
                "Priority Feature Requests",
                "Co-branded Learning Materials",
                "Direct Technical Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Award className="text-adire-gold" size={20} />
                  <span className="font-bold text-earth-brown/80">{item}</span>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default Schools;