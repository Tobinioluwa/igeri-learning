import React from 'react';
import { motion } from 'framer-motion';
import { School, Users, Award, Layout, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SCHOOL_IMG } from '@/lib/assets';

const Schools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />

      <Navbar />

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
          <h1 className="text-6xl md:text-8xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
            Transforming <span className="text-nigerian-green">Classrooms.</span>
          </h1>
          <p className="text-xl text-earth-brown/60 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Empower your teachers and pupils with Nigeria's first curriculum-aligned AI assistant. Designed for the modern Nigerian school.
          </p>
          <Button onClick={() => navigate('/contact')} className="bg-earth-brown hover:bg-earth-brown/90 text-white font-black px-12 h-16 rounded-full kid-button text-xl shadow-xl">
            Partner with Us
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-6xl mx-auto mb-32"
        >
          <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={SCHOOL_IMG} alt="Modern Nigerian School" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <section className="grid md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: Users, color: 'bg-nigerian-green', title: "School-wide Access", desc: "Annual licenses for every pupil and teacher in your primary or junior secondary school." },
            { icon: Layout, color: 'bg-adire-gold', title: "Teacher Dashboard", desc: "Gain insights into class progress, common learning gaps, and individual engagement." },
            { icon: GraduationCap, color: 'bg-sky-blue', title: "Teacher Support", desc: "IGERI AI helps teachers with lesson plans and provides instant explanations for complex topics." }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-kid">
              <div className={`w-16 h-16 ${feature.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-8`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-earth-brown">{feature.title}</h3>
              <p className="text-earth-brown/60 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto mb-32 bg-white p-12 rounded-[3rem] shadow-kid text-left">
           <h2 className="text-3xl font-black mb-8 text-earth-brown">Pilot Programs (FCT Abuja)</h2>
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

      <Footer />
    </div>
  );
};

export default Schools;
