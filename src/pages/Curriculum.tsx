import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, PenTool, GraduationCap } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { CURRICULUM_IMG } from '@/lib/assets';

const Curriculum = () => {
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
              <BookMarked size={16} />
              <span>NERDC / NTI Alignment</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
              Nigerian <br /><span className="text-nigerian-green">Curriculum</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              We've mapped our AI knowledge to the Nigerian National Curriculum (NERDC) to ensure every lesson is relevant to your child's school work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square brut-card overflow-hidden">
              <img src={CURRICULUM_IMG} alt="Curriculum Materials" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <section className="mb-32">
          <div className="text-center mb-16">
            <p className="text-sm font-black uppercase tracking-widest text-accent mb-3">Coverage</p>
            <h2 className="text-4xl font-black text-earth-brown tracking-tight">Supported Subjects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
               <h3 className="text-2xl font-black text-nigerian-green flex items-center gap-3 border-b-[3px] border-earth-brown pb-4">
                 <PenTool size={28} /> Primary (P1–P6)
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {["Mathematics", "English", "Basic Science", "Social Studies", "Agric Science", "Civic Ed"].map((label) => (
                    <div key={label} className="flex items-center gap-3 p-4 brut-card-sm">
                       <span className="w-2.5 h-2.5 rounded-full bg-nigerian-green shrink-0" />
                       <span className="font-bold text-earth-brown">{label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-black text-adire-gold flex items-center gap-3 border-b-[3px] border-earth-brown pb-4">
                 <GraduationCap size={28} /> JSS (JSS1–JSS3)
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {["Mathematics", "English", "Science & Tech", "Social Studies", "Business Studies", "Creative Arts"].map((label) => (
                    <div key={label} className="flex items-center gap-3 p-4 brut-card-sm">
                       <span className="w-2.5 h-2.5 rounded-full bg-adire-gold shrink-0" />
                       <span className="font-bold text-earth-brown">{label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <section className="bg-adire-gold-light rounded-2xl brut-border p-12 md:p-20 text-center">
           <h2 className="text-3xl font-black mb-6 text-earth-brown">Indigenous Knowledge</h2>
           <p className="text-lg text-earth-brown/60 font-medium max-w-3xl mx-auto">
             Beyond academic subjects, IGERI AI also teaches children about Nigerian history, cultural heritage, and values, helping them grow as well-rounded citizens of our nation.
           </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Curriculum;
