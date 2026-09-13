import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Settings,
  BarChart3,
  ShieldAlert,
  Clock,
  MessageSquare,
  ChevronRight,
  Lock,
  Download,
  Sparkles
} from 'lucide-react';

export const ParentDashboard = () => {
  const { user, profile, sessions } = useStore();
  const navigate = useNavigate();

  const PARENTS_GUIDE_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-parents-guide-png-0c1f7abf-1779836835572.webp";

  if (!user) return null;

  return (
    <div className="min-h-screen bg-parchment pb-20 relative overflow-hidden">
      <div className="absolute inset-0 adire-pattern pointer-events-none opacity-[0.04]" />

      <header className="relative z-30 bg-white/70 backdrop-blur-2xl sticky top-0 border-b border-earth-brown/5 shadow-sm">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-2xl border-earth-brown/10 w-12 h-12"
            >
              <ArrowLeft size={22} />
            </Button>
            <div>
              <h1 className="font-black text-2xl text-nigerian-green leading-none tracking-tighter">Parent Portal</h1>
              <p className="text-[10px] text-earth-brown/40 font-black uppercase tracking-widest mt-0.5">Keeping {profile?.name || 'your child'} safe</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-2xl border-earth-brown/10 w-12 h-12">
            <Settings size={20} />
          </Button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 pt-12">
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <Card className="p-8 rounded-[2rem] border-earth-brown/5 shadow-kid flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Clock size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Time Today</p>
              <h3 className="text-2xl font-black text-earth-brown">42 Mins</h3>
            </div>
          </Card>
          <Card className="p-8 rounded-[2rem] border-earth-brown/5 shadow-kid flex items-center gap-5">
            <div className="w-14 h-14 bg-green-50 text-nigerian-green rounded-2xl flex items-center justify-center shrink-0">
              <MessageSquare size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Total Chats</p>
              <h3 className="text-2xl font-black text-earth-brown">{sessions.length}</h3>
            </div>
          </Card>
          <Card className="p-8 rounded-[2rem] border-earth-brown/5 shadow-kid flex items-center gap-5">
            <div className="w-14 h-14 bg-amber-50 text-adire-gold rounded-2xl flex items-center justify-center shrink-0">
              <ShieldAlert size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Flags</p>
              <h3 className="text-2xl font-black text-earth-brown">0 Safe</h3>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <BarChart3 size={24} className="text-nigerian-green" />
                  Learning Activity
                </h3>
              </div>

              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="bg-white p-10 rounded-[2rem] border-2 border-dashed border-earth-brown/10 text-center">
                    <p className="text-earth-brown/40 font-medium">No activity yet. Let your child start chatting!</p>
                  </div>
                ) : (
                  sessions.slice(-3).reverse().map((s) => (
                    <Card key={s.id} className="p-6 rounded-[1.75rem] border-earth-brown/5 shadow-kid hover:shadow-kid-hover hover:-translate-y-0.5 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-nigerian-green/10 rounded-2xl flex items-center justify-center">
                            <span className="text-xl">🌿</span>
                          </div>
                          <div>
                            <h4 className="font-black text-earth-brown">{s.messages[0]?.subject || 'Learning Session'}</h4>
                            <p className="text-xs text-earth-brown/50 font-medium">
                              {new Date(s.startTime).toLocaleDateString()} • {s.messages.length} messages
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-earth-brown/20" />
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 px-2">
                <Lock size={24} className="text-nigerian-green" />
                Guardrail Controls
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-7 rounded-[1.75rem] border-earth-brown/5 shadow-kid">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-earth-brown">Homework Mode</span>
                    <div className="w-11 h-6 bg-nigerian-green rounded-full relative p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                  <p className="text-xs text-earth-brown/50 font-medium">AI will guide thinking instead of giving answers.</p>
                </Card>
                <Card className="p-7 rounded-[1.75rem] border-earth-brown/5 shadow-kid">
                   <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-earth-brown">Daily Time Limit</span>
                    <span className="text-sm font-black text-nigerian-green">60m</span>
                  </div>
                  <p className="text-xs text-earth-brown/50 font-medium">Maximum usage time per day.</p>
                </Card>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="p-8 rounded-[2rem] border-nigerian-green/20 bg-nigerian-green/5 shadow-kid overflow-hidden relative min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-3">
                <Sparkles size={18} className="text-nigerian-green/20" />
              </div>
              <div>
                 <h4 className="font-black mb-2 text-xl text-earth-brown">Weekly Digest</h4>
                 <p className="text-sm text-earth-brown/70 font-medium mb-4">
                   Receive a summary of {profile?.name}'s progress on WhatsApp every Sunday.
                 </p>
                 <div className="relative rounded-2xl overflow-hidden border border-white/40 mb-4">
                   <img src={PARENTS_GUIDE_IMG} alt="" className="w-full aspect-video object-cover" />
                   <div className="absolute inset-0 bg-nigerian-green/25 mix-blend-multiply" />
                 </div>
              </div>
              <Button className="w-full bg-nigerian-green hover:bg-nigerian-green/90 text-white font-black h-12 rounded-2xl kid-button">
                Enable WhatsApp Digest
              </Button>
            </Card>

            <Card className="p-7 rounded-[2rem] border-earth-brown/5 shadow-kid">
               <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-earth-brown/40">Quick Actions</h4>
               <div className="space-y-2">
                 <Button onClick={() => navigate('/parents-guide')} variant="outline" className="w-full justify-start gap-2 h-12 text-earth-brown font-black rounded-2xl border-earth-brown/10">
                   <ShieldAlert size={18} /> Safety Guide
                 </Button>
                 <Button variant="outline" className="w-full justify-start gap-2 h-12 text-earth-brown font-black rounded-2xl border-earth-brown/10">
                   <Download size={18} /> Export History
                 </Button>
               </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
