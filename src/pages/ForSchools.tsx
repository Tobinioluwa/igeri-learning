import React from 'react';
import { motion } from 'framer-motion';
import { School, ClipboardCheck, LayoutGrid, Users2, FileOutput, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ForSchools = () => {
  const navigate = useNavigate();
  const SCHOOL_KIDS_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/joyful-nigerian-kids-hero-png-0fde037d-1779836834434.webp";

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
              <School size={16} />
              <span>For Educational Institutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
              Smart <span className="text-nigerian-green">School Licensing</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed mb-8">
              Bring the power of AI to your entire student body with our bulk licensing plans and specialized teacher dashboards.
            </p>
            <Button onClick={() => navigate('/contact')} className="bg-nigerian-green text-white font-black px-10 h-16 rounded-2xl kid-button text-xl">
              Get School Pricing
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src={SCHOOL_KIDS_IMG} alt="Nigerian Kids in School" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <h2 className="text-3xl font-black mb-12 text-center">Institutional Features</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-32">
           {[
             { icon: LayoutGrid, title: "Teacher Console", desc: "A centralized dashboard to manage classes, assign topics, and monitor engagement across the school." },
             { icon: ClipboardCheck, title: "Lesson Planning", desc: "Teachers can use IGERI AI to draft curriculum-aligned lesson plans and assessment questions." },
             { icon: FileOutput, title: "Progress Reports", desc: "Export detailed learning reports per pupil or per class for school records and parent meetings." },
             { icon: Users2, title: "Bulk Profiles", desc: "Quickly onboard entire grades without individual parent setup using secure school-issued PINs." },
             { icon: ShieldCheck, title: "Admin Oversight", desc: "School administrators maintain full control over the AI's subject focus and safety settings." },
             { icon: School, title: "Lab Deployment", desc: "Optimized for school computer labs with multi-user support on shared workstations." }
           ].map((f, i) => (
             <div key={i} className="p-8 glass rounded-[2.5rem] border-white/60">
                <div className="w-14 h-14 bg-earth-brown/5 rounded-2xl flex items-center justify-center text-earth-brown mb-6">
                   <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-4">{f.title}</h3>
                <p className="text-earth-brown/60 font-medium leading-relaxed">{f.desc}</p>
             </div>
           ))}
        </div>

        <section className="bg-adire-gold rounded-[3rem] p-12 md:p-20 text-white text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to modernize?</h2>
           <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
             Contact our school partnership team today to schedule a demo and learn about our subsidized plans for government schools.
           </p>
           <Button onClick={() => navigate('/contact')} className="bg-white text-adire-gold font-black px-12 h-16 rounded-2xl kid-button text-xl shadow-xl">
             Schedule School Demo
           </Button>
        </section>
      </main>
    </div>
  );
};

export default ForSchools;