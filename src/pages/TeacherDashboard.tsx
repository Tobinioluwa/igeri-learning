import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const SCHOOL_IMG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/modern-nigerian-school-png-b5b11cb2-1779836835736.webp";

  const students = [
    { name: 'Emeka Obi', grade: 'JSS1', activity: 'Maths - Equations', status: 'Active' },
    { name: 'Kemi Adeyemi', grade: 'JSS1', activity: 'English - Grammar', status: 'Needs Support' },
    { name: 'Chike Okoro', grade: 'JSS1', activity: 'Science - Energy', status: 'Active' },
    { name: 'Zainab Musa', grade: 'JSS1', activity: 'Social Studies', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-nigerian-green/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="font-black text-xl text-nigerian-green tracking-tight uppercase">Teacher Console</h1>
          </div>
          <Button className="bg-nigerian-green text-white rounded-full px-6 font-bold h-12">
            <Plus size={18} className="mr-2" /> Add Student
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-end">
          <div className="flex-1 space-y-2">
            <p className="text-xs font-black text-earth-brown/40 uppercase tracking-widest">Class Overview</p>
            <h2 className="text-4xl font-black text-earth-brown tracking-tighter">JSS 1 - Green House</h2>
          </div>
          <div className="flex gap-4">
             <Card className="px-6 py-4 border-earth-brown/10 shadow-sm flex items-center gap-3 bg-white/50 backdrop-blur-md">
                <Users size={20} className="text-nigerian-green" />
                <span className="font-black">42 Students</span>
             </Card>
             <Card className="px-6 py-4 border-earth-brown/10 shadow-sm flex items-center gap-3 bg-white/50 backdrop-blur-md">
                <TrendingUp size={20} className="text-adire-gold" />
                <span className="font-black">85% Engagement</span>
             </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="border-earth-brown/10 overflow-hidden shadow-sm">
               <div className="p-6 border-b border-earth-brown/5 flex items-center justify-between bg-white">
                 <h3 className="font-black text-xl">Recent Learning Activity</h3>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-brown/30" size={16} />
                   <input 
                     type="text" 
                     placeholder="Search students..." 
                     className="pl-10 pr-4 py-2 bg-parchment/50 rounded-full text-sm border-none focus:ring-1 focus:ring-nigerian-green w-64 font-medium"
                   />
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-parchment/30 text-xs font-black text-earth-brown/40 uppercase tracking-widest">
                     <tr>
                       <th className="px-6 py-4">Student</th>
                       <th className="px-6 py-4">Current Topic</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-earth-brown/5 bg-white">
                     {students.map((s, i) => (
                       <tr key={i} className="hover:bg-parchment/20 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-nigerian-green/10 flex items-center justify-center text-nigerian-green font-black text-xs">
                                {s.name[0]}
                              </div>
                              <span className="font-bold text-earth-brown">{s.name}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-sm font-medium">{s.activity}</td>
                         <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                             s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                           }`}>
                             {s.status}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-nigerian-green font-black">Details</Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </Card>
          </div>

          <div className="space-y-6">
             <Card className="p-8 border-adire-gold bg-adire-gold/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                   <Sparkles size={40} className="text-adire-gold" />
                </div>
                <h4 className="font-black mb-6 flex items-center gap-2 text-xl">
                  AI Insights
                </h4>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-white rounded-2xl border border-adire-gold/10 shadow-sm">
                    <p className="text-sm text-earth-brown/80 font-medium leading-relaxed">
                      "Many students are currently exploring <strong>Simultaneous Equations</strong>. Consider a quick review in class tomorrow."
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-adire-gold/10 shadow-sm">
                    <p className="text-sm text-earth-brown/80 font-medium leading-relaxed">
                      "Kemi is showing high interest in <strong>Creative Arts</strong> but struggling with vocabulary."
                    </p>
                  </div>
                </div>
             </Card>

             <Card className="p-8 border-earth-brown/10 overflow-hidden relative">
                <img src={SCHOOL_IMG} className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale pointer-events-none" />
                <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-earth-brown/40 relative z-10">Reports</h4>
                <div className="space-y-2 relative z-10">
                   <Button variant="outline" className="w-full justify-start gap-2 h-14 text-earth-brown font-bold rounded-xl border-earth-brown/5 bg-white/50">
                     <FileText size={18} /> Class Report
                   </Button>
                   <Button onClick={() => navigate('/curriculum')} variant="outline" className="w-full justify-start gap-2 h-14 text-earth-brown font-bold rounded-xl border-earth-brown/5 bg-white/50">
                     <BookOpen size={18} /> Curriculum
                   </Button>
                </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
};