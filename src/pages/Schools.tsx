import React from 'react';
import { motion } from 'framer-motion';
import { School, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PhotoFeatureCard } from '@/components/site/PhotoFeatureCard';
import { SCHOOL_IMG, CURRICULUM_IMG, HERO_KIDS } from '@/lib/assets';

const Schools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="sticker-badge text-nigerian-green mb-6">
            <School size={16} />
            <span>Educational Partnerships</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
            Transforming <span className="text-nigerian-green">Classrooms.</span>
          </h1>
          <p className="text-xl text-earth-brown/60 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Empower your teachers and pupils with Nigeria's first curriculum-aligned AI assistant. Designed for the modern Nigerian school.
          </p>
          <button onClick={() => navigate('/contact')} className="kid-button bg-earth-brown text-white px-12 h-16 rounded-xl text-xl">
            Partner with Us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-6xl mx-auto mb-32"
        >
          <div className="aspect-[21/9] brut-card overflow-hidden">
            <img src={SCHOOL_IMG} alt="Modern Nigerian School" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <section className="grid md:grid-cols-3 gap-6 mb-32 text-left">
          {[
            { image: SCHOOL_IMG, position: 'top', accent: 'green' as const, title: "School-wide Access", desc: "Annual licenses for every pupil and teacher in your primary or junior secondary school." },
            { image: CURRICULUM_IMG, position: 'bottom', accent: 'gold' as const, title: "Teacher Dashboard", desc: "Gain insights into class progress, common learning gaps, and individual engagement." },
            { image: HERO_KIDS, position: 'top', accent: 'sky' as const, title: "Teacher Support", desc: "IGERI AI helps teachers with lesson plans and provides instant explanations for complex topics." }
          ].map((feature) => (
            <PhotoFeatureCard
              key={feature.title}
              image={feature.image}
              imagePosition={feature.position}
              accent={feature.accent}
              title={feature.title}
              description={feature.desc}
            />
          ))}
        </section>

        <section className="max-w-4xl mx-auto mb-32 brut-card bg-white p-12 text-left">
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
