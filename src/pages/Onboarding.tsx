import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore, getTier } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ArrowLeft, User, ShieldCheck, Mail, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  
  const { setUser, addProfile, setProfile } = useStore();
  const navigate = useNavigate();

  const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png";
  const ONBOARDING_HERO = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/joyful-nigerian-kids-hero-png-0fde037d-1779836834434.webp";
  const MASCOT_PRO = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/igeri-mascot-pro-png-a5d3d9c2-1779825769745.webp";

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !email) return toast.error("Oya, please fill all fields!");
    
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: parentName,
      email,
      role: 'parent'
    });
    setStep(2);
    toast.success("Welcome aboard! Now, who are we teaching today?");
  };

  const handleChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(childAge);
    if (!childName || !childAge) return toast.error("Don't forget the child's details!");
    if (isNaN(age) || age < 5 || age > 17) return toast.error("Age must be between 5 and 17, abeg.");

    const newProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: childName,
      age,
      tier: getTier(age),
      language: 'English' as const,
      subjects: ['Maths', 'English', 'Basic Science']
    };

    addProfile(newProfile);
    setProfile(newProfile);
    toast.success(`Success! Welcome to the family, ${childName}!`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-parchment flex overflow-hidden">
      <div className="hidden lg:flex w-2/5 relative bg-nigerian-green items-center justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 adire-pattern opacity-10" />
         <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
         <div className="absolute bottom-20 right-20 w-80 h-80 bg-adire-gold/20 rounded-full blur-[100px]" />
         
         <div className="relative z-10 text-center">
            <motion.div
               key={step}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-12"
            >
               <img 
                 src={step === 1 ? ONBOARDING_HERO : MASCOT_PRO} 
                 className={`w-full ${step === 1 ? 'aspect-square rounded-[3rem] object-cover border-8 border-white/20' : 'max-w-sm mx-auto object-contain'} drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] ${step === 2 ? 'animate-float' : ''}`}
               />
            </motion.div>
            <h2 className="text-white text-4xl font-black mb-6 leading-tight">
               {step === 1 ? "Empowering the next generation." : "Your learning journey begins now!"}
            </h2>
            <p className="text-white/70 text-lg font-medium max-w-xs mx-auto">
               IGERI AI is built with love for the hearts of Nigerian children.
            </p>
         </div>
         
         <div className="absolute bottom-10 left-10 flex items-center gap-3">
            <img src={LOGO_URL} className="w-8 h-8 brightness-0 invert opacity-50" />
            <span className="text-white/30 font-black text-sm uppercase tracking-widest">IGERI AI</span>
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
         <div className="absolute inset-0 adire-pattern lg:hidden opacity-5" />
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md w-full"
         >
            <div className="lg:hidden flex justify-center mb-10">
               <div className="flex items-center gap-3">
                 <img src={LOGO_URL} className="w-10 h-10" />
                 <span className="text-2xl font-black text-nigerian-green">IGERI AI</span>
               </div>
            </div>

            <div className="mb-10">
               <div className="flex items-center gap-2 mb-2">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-12 bg-nigerian-green' : 'w-6 bg-earth-brown/10'}`} />
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-12 bg-nigerian-green' : 'w-6 bg-earth-brown/10'}`} />
               </div>
               <h1 className="text-4xl font-black text-earth-brown leading-tight">
                  {step === 1 ? "Let's get started, Parent!" : "Create a profile for your learner"}
               </h1>
            </div>

            <AnimatePresence mode="wait">
               {step === 1 ? (
                 <motion.form 
                   key="step1"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   onSubmit={handleParentSubmit} 
                   className="space-y-6"
                 >
                    <div className="space-y-2">
                       <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Parent's Full Name</Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/30" size={20} />
                          <Input 
                             placeholder="e.g. Olukayode Israel" 
                             value={parentName}
                             onChange={(e) => setParentName(e.target.value)}
                             className="h-14 pl-12 rounded-2xl bg-white border-earth-brown/5 focus:ring-nigerian-green shadow-sm text-lg font-medium"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Email Address</Label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/30" size={20} />
                          <Input 
                             type="email"
                             placeholder="you@email.com" 
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             className="h-14 pl-12 rounded-2xl bg-white border-earth-brown/5 focus:ring-nigerian-green shadow-sm text-lg font-medium"
                          />
                       </div>
                    </div>

                    <div className="pt-4">
                       <Button type="submit" className="w-full h-16 bg-nigerian-green text-white text-xl font-black rounded-2xl kid-button shadow-xl shadow-nigerian-green/10">
                          Continue <ChevronRight className="ml-2" />
                       </Button>
                    </div>
                    
                    <p className="text-center text-sm font-medium text-earth-brown/40 pt-4">
                       By continuing, you agree to our <button onClick={() => navigate('/safety')} className="text-nigerian-green underline">Privacy Policy</button>
                    </p>
                 </motion.form>
               ) : (
                 <motion.form 
                   key="step2"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   onSubmit={handleChildSubmit} 
                   className="space-y-6"
                 >
                    <button 
                       type="button" 
                       onClick={() => setStep(1)}
                       className="flex items-center gap-2 text-sm font-black text-earth-brown/40 hover:text-earth-brown transition-colors mb-6"
                    >
                       <ArrowLeft size={16} /> Back to parent setup
                    </button>

                    <div className="space-y-2">
                       <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Child's Name</Label>
                       <div className="relative">
                          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-adire-gold/30" size={20} />
                          <Input 
                             placeholder="e.g. Emeka" 
                             value={childName}
                             onChange={(e) => setChildName(e.target.value)}
                             className="h-14 pl-12 rounded-2xl bg-white border-earth-brown/5 focus:ring-adire-gold shadow-sm text-lg font-medium"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Child's Age (5–17)</Label>
                       <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-adire-gold/10 rounded flex items-center justify-center text-[10px] font-black text-adire-gold">12</div>
                          <Input 
                             type="number"
                             min="5"
                             max="17"
                             placeholder="e.g. 10" 
                             value={childAge}
                             onChange={(e) => setChildAge(e.target.value)}
                             className="h-14 pl-12 rounded-2xl bg-white border-earth-brown/5 focus:ring-adire-gold shadow-sm text-lg font-medium"
                          />
                       </div>
                       <p className="text-[10px] text-earth-brown/30 font-bold uppercase tracking-widest ml-2">This helps us pick the best learning mode.</p>
                    </div>

                    <div className="pt-4">
                       <Button type="submit" className="w-full h-16 bg-adire-gold text-white text-xl font-black rounded-2xl kid-button shadow-xl shadow-adire-gold/10">
                          Launch Igeri AI <Heart className="ml-2 fill-white" size={20} />
                       </Button>
                    </div>
                 </motion.form>
               )}
            </AnimatePresence>
         </motion.div>
      </div>
    </div>
  );
};