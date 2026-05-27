import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-parchment pb-20">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-nigerian-green/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="font-black text-xl text-nigerian-green tracking-tight uppercase">Parent Portal</h1>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings size={18} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-10">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 border-earth-brown/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-bold uppercase">Time Today</p>
              <h3 className="text-xl font-bold">42 Mins</h3>
            </div>
          </Card>
          <Card className="p-6 border-earth-brown/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-bold uppercase">Total Chats</p>
              <h3 className="text-xl font-bold">{sessions.length}</h3>
            </div>
          </Card>
          <Card className="p-6 border-earth-brown/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldAlert size={24} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-bold uppercase">Flags</p>
              <h3 className="text-xl font-bold">0 Safe</h3>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <BarChart3 size={20} className="text-nigerian-green" />
                  Learning Activity
                </h3>
              </div>
              
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="bg-white p-10 rounded-3xl border border-dashed border-earth-brown/20 text-center">
                    <p className="text-earth-brown/40">No activity yet. Let your child start chatting!</p>
                  </div>
                ) : (
                  sessions.slice(-3).reverse().map((s) => (
                    <Card key={s.id} className="p-6 border-earth-brown/5 hover:border-nigerian-green/20 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-nigerian-green/10 rounded-full flex items-center justify-center">
                            <span className="text-lg">🌿</span>
                          </div>
                          <div>
                            <h4 className="font-bold">{s.messages[0]?.subject || 'Learning Session'}</h4>
                            <p className="text-xs text-earth-brown/50">
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
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Lock size={20} className="text-nigerian-green" />
                Guardrail Controls
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 border-earth-brown/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Homework Mode</span>
                    <div className="w-10 h-6 bg-nigerian-green rounded-full relative p-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                  <p className="text-xs text-earth-brown/50">AI will guide thinking instead of giving answers.</p>
                </Card>
                <Card className="p-6 border-earth-brown/5">
                   <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Daily Time Limit</span>
                    <span className="text-sm font-bold text-nigerian-green">60m</span>
                  </div>
                  <p className="text-xs text-earth-brown/50">Maximum usage time per day.</p>
                </Card>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-nigerian-green bg-nigerian-green/5 overflow-hidden relative min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-2">
                <Sparkles size={16} className="text-nigerian-green/20" />
              </div>
              <div>
                 <h4 className="font-black mb-2 text-xl">Weekly Digest</h4>
                 <p className="text-sm text-earth-brown/70 mb-4">
                   Receive a summary of {profile?.name}'s progress on WhatsApp every Sunday.
                 </p>
                 <img src={PARENTS_GUIDE_IMG} className="w-full aspect-video object-cover rounded-xl border border-white/40 mb-4" />
              </div>
              <Button className="w-full bg-nigerian-green hover:bg-nigerian-green/90 text-white font-bold h-12 rounded-xl">
                Enable WhatsApp Digest
              </Button>
            </Card>

            <Card className="p-6 border-earth-brown/10">
               <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-earth-brown/40">Quick Actions</h4>
               <div className="space-y-2">
                 <Button onClick={() => navigate('/parents-guide')} variant="outline" className="w-full justify-start gap-2 h-12 text-earth-brown font-bold rounded-xl border-earth-brown/5">
                   <ShieldAlert size={18} /> Safety Guide
                 </Button>
                 <Button variant="outline" className="w-full justify-start gap-2 h-12 text-earth-brown font-bold rounded-xl border-earth-brown/5">
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