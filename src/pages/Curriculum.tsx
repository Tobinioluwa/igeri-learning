import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Calculator, FlaskConical, Globe2, Landmark, Microscope, PenTool, TreePine, ShieldCheck, GraduationCap, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Curriculum = () => {
  const navigate = useNavigate();
  const CURRICULUM_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-curriculum-visual-png-e7b28579-1779836835641.webp";

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
              <BookMarked size={16} />
              <span>NERDC / NTI Alignment</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
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
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src={CURRICULUM_IMG} alt="Curriculum Materials" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <section className="mb-32">
          <h2 className="text-4xl font-black mb-16 text-center">Supported Subjects</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
               <h3 className="text-2xl font-black text-nigerian-green flex items-center gap-3 border-b border-earth-brown/5 pb-4">
                 <PenTool size={28} /> Primary (P1–P6)
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calculator, label: "Mathematics" },
                    { icon: Globe2, label: "English" },
                    { icon: Microscope, label: "Basic Science" },
                    { icon: Landmark, label: "Social Studies" },
                    { icon: TreePine, label: "Agric Science" },
                    { icon: ShieldCheck, label: "Civic Ed" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 glass rounded-2xl border-white/60">
                       <s.icon className="text-nigerian-green" size={20} />
                       <span className="font-bold">{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-black text-adire-gold flex items-center gap-3 border-b border-earth-brown/5 pb-4">
                 <GraduationCap size={28} /> JSS (JSS1–JSS3)
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calculator, label: "Mathematics" },
                    { icon: Globe2, label: "English" },
                    { icon: Microscope, label: "Science & Tech" },
                    { icon: Landmark, label: "Social Studies" },
                    { icon: Zap, label: "Business Studies" },
                    { icon: PenTool, label: "Creative Arts" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 glass rounded-2xl border-white/60">
                       <s.icon className="text-adire-gold" size={20} />
                       <span className="font-bold">{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <section className="bg-earth-brown/5 rounded-[3rem] p-12 md:p-20 border border-earth-brown/5 text-center">
           <h2 className="text-3xl font-black mb-6">Indigenous Knowledge</h2>
           <p className="text-lg text-earth-brown/60 font-medium max-w-3xl mx-auto">
             Beyond academic subjects, IGERI AI also teaches children about Nigerian history, cultural heritage, and values, helping them grow as well-rounded citizens of our nation.
           </p>
        </section>
      </main>
    </div>
  );
};

export default Curriculum;