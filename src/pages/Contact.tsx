import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SUPPORT_MASCOT } from '@/lib/assets';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon. 🌿");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-earth-brown mb-8 leading-[0.9] tracking-tight">
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
                  <div className="w-14 h-14 bg-nigerian-green text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
                     <Mail size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Email Us</p>
                     <p className="text-xl font-bold text-earth-brown">hello@igeriai.com</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-adire-gold text-earth-brown rounded-xl flex items-center justify-center shrink-0 brut-border">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Call/WhatsApp</p>
                     <p className="text-xl font-bold text-earth-brown">+234 (0) 900 123 4567</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-earth-brown text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Visit Us</p>
                     <p className="text-xl font-bold text-earth-brown">FCT Abuja, Nigeria</p>
                  </div>
               </div>
            </div>

            <div className="relative brut-card p-10 overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-earth-brown">Direct Chat</h3>
                  <p className="text-earth-brown/60 font-medium mb-8">Need instant help? Our support mascot is waiting for you.</p>
                  <button className="kid-button bg-nigerian-green text-white px-8 h-14 rounded-xl flex items-center gap-2">
                     <MessageSquare size={20} /> Open Chat
                  </button>
               </div>
               <img src={SUPPORT_MASCOT} alt="" className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="brut-card p-10 md:p-12"
          >
             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label className="font-bold ml-2">Your Name</Label>
                      <Input value={form.name} onChange={handleChange('name')} placeholder="Olukayode Israel" className="h-14 rounded-xl border-[3px] border-earth-brown/20 focus-visible:border-nigerian-green px-6" />
                   </div>
                   <div className="space-y-2">
                      <Label className="font-bold ml-2">Email Address</Label>
                      <Input type="email" value={form.email} onChange={handleChange('email')} placeholder="hello@example.com" className="h-14 rounded-xl border-[3px] border-earth-brown/20 focus-visible:border-nigerian-green px-6" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="font-bold ml-2">Subject</Label>
                   <Input value={form.subject} onChange={handleChange('subject')} placeholder="How can we help?" className="h-14 rounded-xl border-[3px] border-earth-brown/20 focus-visible:border-nigerian-green px-6" />
                </div>
                <div className="space-y-2">
                   <Label className="font-bold ml-2">Message</Label>
                   <Textarea value={form.message} onChange={handleChange('message')} placeholder="Tell us more..." className="min-h-[150px] rounded-xl border-[3px] border-earth-brown/20 focus-visible:border-nigerian-green p-6" />
                </div>
                <button type="submit" className="kid-button w-full h-16 bg-nigerian-green text-white text-xl rounded-xl flex items-center justify-center">
                   Send Message <Send className="ml-2" size={20} />
                </button>
             </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
