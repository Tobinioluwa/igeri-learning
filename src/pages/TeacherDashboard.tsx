import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  BookOpen,
  TrendingUp,
  FileText,
  Search,
  Plus,
  Sparkles
} from 'lucide-react';
import { SCHOOL_IMG } from '@/lib/assets';

export const TeacherDashboard = () => {
  const navigate = useNavigate();

  const students = [
    { name: 'Emeka Obi', grade: 'JSS1', activity: 'Maths - Equations', status: 'Active' },
    { name: 'Kemi Adeyemi', grade: 'JSS1', activity: 'English - Grammar', status: 'Needs Support' },
    { name: 'Chike Okoro', grade: 'JSS1', activity: 'Science - Energy', status: 'Active' },
    { name: 'Zainab Musa', grade: 'JSS1', activity: 'Social Studies', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <header className="bg-parchment sticky top-0 z-30 border-b-[3px] border-earth-brown">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="kid-button bg-white w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="font-black text-2xl text-earth-brown leading-none tracking-tight">Teacher Console</h1>
              <p className="text-[10px] text-earth-brown/50 font-black uppercase tracking-widest mt-0.5">JSS 1 · Green House</p>
            </div>
          </div>
          <button className="kid-button bg-nigerian-green text-white rounded-xl px-6 h-12 flex items-center">
            <Plus size={18} className="mr-2" /> Add Student
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-end">
          <div className="flex-1 space-y-2">
            <p className="text-xs font-black text-earth-brown/50 uppercase tracking-widest">Class Overview</p>
            <h2 className="text-4xl font-black text-earth-brown tracking-tight">JSS 1 - Green House</h2>
          </div>
          <div className="flex gap-4">
             <div className="brut-card-sm px-6 py-4 flex items-center gap-3 bg-white">
                <Users size={20} className="text-nigerian-green" />
                <span className="font-black text-earth-brown">42 Students</span>
             </div>
             <div className="brut-card-sm px-6 py-4 flex items-center gap-3 bg-white">
                <TrendingUp size={20} className="text-adire-gold" />
                <span className="font-black text-earth-brown">85% Engagement</span>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="brut-card overflow-hidden">
               <div className="p-6 border-b-[3px] border-earth-brown flex items-center justify-between bg-white">
                 <h3 className="font-black text-xl text-earth-brown">Recent Learning Activity</h3>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-brown/40" size={16} />
                   <input
                     type="text"
                     placeholder="Search students..."
                     className="pl-10 pr-4 py-2 bg-parchment rounded-xl text-sm border-[3px] border-earth-brown/20 focus:border-nigerian-green outline-none w-64 font-medium"
                   />
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-parchment text-xs font-black text-earth-brown/50 uppercase tracking-widest">
                     <tr>
                       <th className="px-6 py-4">Student</th>
                       <th className="px-6 py-4">Current Topic</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y-[3px] divide-earth-brown/10 bg-white">
                     {students.map((s, i) => (
                       <tr key={i} className="hover:bg-parchment/50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-nigerian-green text-white flex items-center justify-center font-black text-xs brut-border">
                                {s.name[0]}
                              </div>
                              <span className="font-bold text-earth-brown">{s.name}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-sm font-medium text-earth-brown/70">{s.activity}</td>
                         <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-earth-brown ${
                             s.status === 'Active' ? 'bg-nigerian-green-light text-nigerian-green' : 'bg-adire-gold-light text-adire-gold'
                           }`}>
                             {s.status}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                            <button className="text-nigerian-green font-black text-sm hover:underline">Details</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="brut-card p-8 bg-adire-gold-light relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                   <Sparkles size={40} className="text-adire-gold" />
                </div>
                <h4 className="font-black mb-6 flex items-center gap-2 text-xl text-earth-brown">
                  AI Insights
                </h4>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-white rounded-xl brut-border">
                    <p className="text-sm text-earth-brown/80 font-medium leading-relaxed">
                      "Many students are currently exploring <strong>Simultaneous Equations</strong>. Consider a quick review in class tomorrow."
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl brut-border">
                    <p className="text-sm text-earth-brown/80 font-medium leading-relaxed">
                      "Kemi is showing high interest in <strong>Creative Arts</strong> but struggling with vocabulary."
                    </p>
                  </div>
                </div>
             </div>

             <div className="brut-card p-8 overflow-hidden relative">
                <img src={SCHOOL_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale pointer-events-none" />
                <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-earth-brown/50 relative z-10">Reports</h4>
                <div className="space-y-3 relative z-10">
                   <button className="kid-button w-full justify-start gap-2 h-14 px-4 text-earth-brown bg-white rounded-xl flex items-center">
                     <FileText size={18} /> Class Report
                   </button>
                   <button onClick={() => navigate('/curriculum')} className="kid-button w-full justify-start gap-2 h-14 px-4 text-earth-brown bg-white rounded-xl flex items-center">
                     <BookOpen size={18} /> Curriculum
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};
