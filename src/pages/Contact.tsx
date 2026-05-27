import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const CONTACT_MASCOT = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-support-mascot-png-da050e15-1779836834795.webp";

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
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tighter">
              Get in <span className="text-nigerian-green">Touch</span>
            </h1>
            <p className="text-xl text-earth-brown/60 font-medium leading-relaxed max-w-2xl mx-auto">
              Have questions or want to partner? We'd love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8">
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-nigerian-green/10 rounded-2xl flex items-center justify-center text-nigerian-green shrink-0">
                     <Mail size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Email Us</p>
                     <p className="text-xl font-bold text-earth-brown">hello@igeriai.com</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-adire-gold/10 rounded-2xl flex items-center justify-center text-adire-gold shrink-0">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Call/WhatsApp</p>
                     <p className="text-xl font-bold text-earth-brown">+234 (0) 900 123 4567</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-earth-brown/10 rounded-2xl flex items-center justify-center text-earth-brown shrink-0">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Visit Us</p>
                     <p className="text-xl font-bold text-earth-brown">FCT Abuja, Nigeria</p>
                  </div>
               </div>
            </div>

            <div className="relative glass p-10 rounded-[3rem] border-white/60 overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">Direct Chat</h3>
                  <p className="text-earth-brown/60 font-medium mb-8">Need instant help? Our support mascot is waiting for you.</p>
                  <Button className="bg-nigerian-green text-white font-black px-8 h-14 rounded-2xl kid-button flex items-center gap-2">
                     <MessageSquare size={20} /> Open Chat
                  </Button>
               </div>
               <img src={CONTACT_MASCOT} className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 md:p-12 rounded-[3rem] border-white/60 shadow-xl"
          >
             <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label className="font-bold ml-2">Your Name</Label>
                      <Input placeholder="Olukayode Israel" className="h-14 rounded-2xl border-earth-brown/10 px-6" />
                   </div>
                   <div className="space-y-2">
                      <Label className="font-bold ml-2">Email Address</Label>
                      <Input placeholder="hello@example.com" className="h-14 rounded-2xl border-earth-brown/10 px-6" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="font-bold ml-2">Subject</Label>
                   <Input placeholder="How can we help?" className="h-14 rounded-2xl border-earth-brown/10 px-6" />
                </div>
                <div className="space-y-2">
                   <Label className="font-bold ml-2">Message</Label>
                   <Textarea placeholder="Tell us more..." className="min-h-[150px] rounded-[2rem] border-earth-brown/10 p-6" />
                </div>
                <Button className="w-full h-16 bg-nigerian-green text-white font-black text-xl rounded-2xl shadow-xl kid-button">
                   Send Message <Send className="ml-2" size={20} />
                </Button>
             </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact;