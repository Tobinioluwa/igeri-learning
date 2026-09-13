import React from 'react';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PhotoFeatureCard } from '@/components/site/PhotoFeatureCard';
import { HERO_KIDS, SCHOOL_IMG, CURRICULUM_IMG, SAFETY_CENTER_IMG, SAFETY_HERO_IMG, MASCOT_PRO } from '@/lib/assets';

const ForSchools = () => {
  const navigate = useNavigate();

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
              <School size={16} />
              <span>For Educational Institutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              Smart <span className="text-nigerian-green">School Licensing</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              Bring the power of AI to your entire student body with our bulk licensing plans and specialized teacher dashboards.
            </p>
            <button onClick={() => navigate('/contact')} className="kid-button bg-earth-brown text-white px-10 h-16 rounded-xl text-xl">
              Get School Pricing
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] brut-card overflow-hidden">
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
             { image: SCHOOL_IMG, position: 'bottom', accent: 'green' as const, title: "Teacher Console", desc: "A centralized dashboard to manage classes, assign topics, and monitor engagement across the school." },
             { image: CURRICULUM_IMG, position: 'top', accent: 'gold' as const, title: "Lesson Planning", desc: "Teachers can use IGERI AI to draft curriculum-aligned lesson plans and assessment questions." },
             { image: SAFETY_CENTER_IMG, position: 'center', accent: 'sky' as const, title: "Progress Reports", desc: "Export detailed learning reports per pupil or per class for school records and parent meetings." },
             { image: HERO_KIDS, position: 'bottom', accent: 'berry' as const, title: "Bulk Profiles", desc: "Quickly onboard entire grades without individual parent setup using secure school-issued PINs." },
             { image: SAFETY_HERO_IMG, position: 'top', accent: 'green' as const, title: "Admin Oversight", desc: "School administrators maintain full control over the AI's subject focus and safety settings." },
             { image: MASCOT_PRO, position: 'bottom', accent: 'gold' as const, title: "Lab Deployment", desc: "Optimized for school computer labs with multi-user support on shared workstations." }
           ].map((f) => (
             <PhotoFeatureCard
               key={f.title}
               image={f.image}
               imagePosition={f.position}
               accent={f.accent}
               title={f.title}
               description={f.desc}
             />
           ))}
        </div>

        <section className="bg-adire-gold rounded-2xl p-12 md:p-20 text-earth-brown text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to modernize?</h2>
           <p className="text-earth-brown/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             Contact our school partnership team today to schedule a demo and learn about our subsidized plans for government schools.
           </p>
           <button onClick={() => navigate('/contact')} className="kid-button bg-white text-adire-gold px-12 h-16 rounded-xl text-xl">
             Schedule School Demo
           </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForSchools;
