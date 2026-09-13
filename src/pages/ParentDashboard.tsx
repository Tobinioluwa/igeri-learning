import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
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
import { PARENTS_GUIDE_IMG } from '@/lib/assets';

export const ParentDashboard = () => {
  const { user, profile, sessions } = useStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <header className="bg-parchment sticky top-0 z-30 border-b-[3px] border-earth-brown">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="kid-button bg-white w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="font-black text-2xl text-earth-brown leading-none tracking-tight">Parent Portal</h1>
              <p className="text-[10px] text-earth-brown/50 font-black uppercase tracking-widest mt-0.5">Keeping {profile?.name || 'your child'} safe</p>
            </div>
          </div>
          <button className="kid-button bg-white w-12 h-12 rounded-xl flex items-center justify-center">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12">
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-sky-blue text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
              <Clock size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Time Today</p>
              <h3 className="text-2xl font-black text-earth-brown">42 Mins</h3>
            </div>
          </div>
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-nigerian-green text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
              <MessageSquare size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Total Chats</p>
              <h3 className="text-2xl font-black text-earth-brown">{sessions.length}</h3>
            </div>
          </div>
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-adire-gold text-earth-brown rounded-xl flex items-center justify-center shrink-0 brut-border">
              <ShieldAlert size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Flags</p>
              <h3 className="text-2xl font-black text-earth-brown">0 Safe</h3>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-2xl font-black flex items-center gap-3 text-earth-brown">
                  <BarChart3 size={24} className="text-nigerian-green" />
                  Learning Activity
                </h3>
              </div>

              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="bg-white p-10 rounded-2xl border-[3px] border-dashed border-earth-brown/30 text-center">
                    <p className="text-earth-brown/50 font-medium">No activity yet. Let your child start chatting!</p>
                  </div>
                ) : (
                  sessions.slice(-3).reverse().map((s) => (
                    <div key={s.id} className="brut-card-sm p-6 hover:-translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-nigerian-green-light rounded-xl flex items-center justify-center">
                            <span className="text-xl">🌿</span>
                          </div>
                          <div>
                            <h4 className="font-black text-earth-brown">{s.messages[0]?.subject || 'Learning Session'}</h4>
                            <p className="text-xs text-earth-brown/50 font-medium">
                              {new Date(s.startTime).toLocaleDateString()} • {s.messages.length} messages
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-earth-brown/30" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 px-2 text-earth-brown">
                <Lock size={24} className="text-nigerian-green" />
                Guardrail Controls
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="brut-card-sm p-7">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-earth-brown">Homework Mode</span>
                    <div className="w-11 h-6 bg-nigerian-green rounded-full relative p-1 cursor-pointer brut-border">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                  <p className="text-xs text-earth-brown/50 font-medium">AI will guide thinking instead of giving answers.</p>
                </div>
                <div className="brut-card-sm p-7">
                   <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-earth-brown">Daily Time Limit</span>
                    <span className="text-sm font-black text-nigerian-green">60m</span>
                  </div>
                  <p className="text-xs text-earth-brown/50 font-medium">Maximum usage time per day.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="brut-card p-8 bg-nigerian-green-light overflow-hidden relative min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-3">
                <Sparkles size={18} className="text-nigerian-green/30" />
              </div>
              <div>
                 <h4 className="font-black mb-2 text-xl text-earth-brown">Weekly Digest</h4>
                 <p className="text-sm text-earth-brown/70 font-medium mb-4">
                   Receive a summary of {profile?.name}'s progress on WhatsApp every Sunday.
                 </p>
                 <div className="relative rounded-xl overflow-hidden brut-border mb-4">
                   <img src={PARENTS_GUIDE_IMG} alt="" className="w-full aspect-video object-cover" />
                   <div className="absolute inset-0 bg-nigerian-green/25 mix-blend-multiply" />
                 </div>
              </div>
              <button className="kid-button w-full bg-nigerian-green text-white h-12 rounded-xl">
                Enable WhatsApp Digest
              </button>
            </div>

            <div className="brut-card p-7">
               <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-earth-brown/50">Quick Actions</h4>
               <div className="space-y-3">
                 <button onClick={() => navigate('/parents-guide')} className="kid-button w-full justify-start gap-2 h-12 px-4 text-earth-brown bg-white rounded-xl flex items-center">
                   <ShieldAlert size={18} /> Safety Guide
                 </button>
                 <button className="kid-button w-full justify-start gap-2 h-12 px-4 text-earth-brown bg-white rounded-xl flex items-center">
                   <Download size={18} /> Export History
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
