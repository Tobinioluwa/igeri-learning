import React from 'react';
import { motion } from 'framer-motion';
import { School, ClipboardCheck, LayoutGrid, Users2, FileOutput, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { HERO_KIDS } from '@/lib/assets';

const ForSchools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none" />

      <Navbar />

      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-nigerian-green/10 px-4 py-2 rounded-full text-nigerian-green font-bold text-sm mb-6 border border-nigerian-green/20">
              <School size={16} />
              <span>For Educational Institutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              Smart <span className="text-nigerian-green">School Licensing</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              Bring the power of AI to your entire student body with our bulk licensing plans and specialized teacher dashboards.
            </p>
            <Button onClick={() => navigate('/contact')} className="bg-earth-brown hover:bg-earth-brown/90 text-white font-black px-10 h-16 rounded-full kid-button text-xl">
              Get School Pricing
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src={HERO_KIDS} alt="Nigerian Kids in School" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-adire-gold/20 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-12">
          <p className="text-sm font-black uppercase tracking-widest text-accent mb-3">Institutional Features</p>
          <h2 className="text-4xl font-black text-earth-brown tracking-tight">Built for the whole school</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-32">
           {[
             { icon: LayoutGrid, color: 'bg-nigerian-green', title: "Teacher Console", desc: "A centralized dashboard to manage classes, assign topics, and monitor engagement across the school." },
             { icon: ClipboardCheck, color: 'bg-adire-gold', title: "Lesson Planning", desc: "Teachers can use IGERI AI to draft curriculum-aligned lesson plans and assessment questions." },
             { icon: FileOutput, color: 'bg-sky-blue', title: "Progress Reports", desc: "Export detailed learning reports per pupil or per class for school records and parent meetings." },
             { icon: Users2, color: 'bg-berry-pink', title: "Bulk Profiles", desc: "Quickly onboard entire grades without individual parent setup using secure school-issued PINs." },
             { icon: ShieldCheck, color: 'bg-nigerian-green', title: "Admin Oversight", desc: "School administrators maintain full control over the AI's subject focus and safety settings." },
             { icon: School, color: 'bg-adire-gold', title: "Lab Deployment", desc: "Optimized for school computer labs with multi-user support on shared workstations." }
           ].map((f, i) => (
             <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-kid">
                <div className={`w-14 h-14 ${f.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                   <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-4 text-earth-brown">{f.title}</h3>
                <p className="text-earth-brown/60 font-medium leading-relaxed">{f.desc}</p>
             </div>
           ))}
        </div>

        <section className="bg-adire-gold rounded-[3rem] p-12 md:p-20 text-white text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to modernize?</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             Contact our school partnership team today to schedule a demo and learn about our subsidized plans for government schools.
           </p>
           <Button onClick={() => navigate('/contact')} className="bg-white text-adire-gold font-black px-12 h-16 rounded-full kid-button text-xl shadow-xl">
             Schedule School Demo
           </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForSchools;
