import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore, getTier } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ArrowLeft, User, Mail, Lock, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { LOGO_URL, MASCOT_PRO } from '@/lib/assets';
import { firebaseEnabled } from '@/lib/firebase';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'That email already has an account — try logging in instead.',
  'auth/invalid-email': 'That email address doesn’t look right.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/wrong-password': 'Wrong password — please try again.',
  'auth/invalid-credential': 'Wrong email or password — please try again.',
  'auth/user-not-found': 'No account with that email yet — try creating one.',
};

function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code;
  if (code && AUTH_ERROR_MESSAGES[code]) return AUTH_ERROR_MESSAGES[code];
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}

export const Onboarding = () => {
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [awaitingProfiles, setAwaitingProfiles] = useState(false);

  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');

  const { signUp, signIn, addProfile, user, profiles, setProfile } = useStore();
  const navigate = useNavigate();

  // After a returning parent logs in, wait for their profiles to load: jump
  // straight to the dashboard if they already have a child, otherwise let
  // them create their first one.
  useEffect(() => {
    if (!awaitingProfiles || !user) return;
    if (profiles.length > 0) {
      setProfile(profiles[0]);
      navigate('/dashboard');
    } else {
      setAwaitingProfiles(false);
      setStep(2);
    }
  }, [awaitingProfiles, user, profiles, navigate, setProfile]);

  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseEnabled) {
      toast.error("Firebase isn't connected yet — this app can't create accounts until it is.");
      return;
    }
    if (authMode === 'signup' && !parentName) return toast.error("Oya, please tell us your name!");
    if (!email || !password) return toast.error("Oya, please fill all fields!");

    setLoading(true);
    try {
      if (authMode === 'signup') {
        await signUp(parentName, email, password);
        toast.success("Welcome aboard! Now, who are we teaching today?");
        setStep(2);
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
        setAwaitingProfiles(true);
      }
    } catch (err) {
      toast.error(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChildSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(childAge);
    if (!childName || !childAge) return toast.error("Don't forget the child's details!");
    if (isNaN(age) || age < 5 || age > 17) return toast.error("Age must be between 5 and 17, abeg.");

    setLoading(true);
    try {
      await addProfile({
        name: childName,
        age,
        tier: getTier(age),
        language: 'English',
        subjects: ['Maths', 'English', 'Basic Science'],
      });
      toast.success(`Success! Welcome to the family, ${childName}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex overflow-hidden">
      <div className="hidden lg:flex w-2/5 relative bg-earth-brown items-center justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 adire-pattern opacity-10" />
         <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
         <div className="absolute bottom-20 right-20 w-80 h-80 bg-adire-gold/20 rounded-full blur-[100px]" />
         <div className="deco-dot w-4 h-4 bg-adire-gold top-16 right-16" />
         <div className="deco-dot w-3 h-3 bg-sky-blue bottom-24 left-16" />

         <div className="relative z-10 text-center">
            <motion.div
               key={step}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-12"
            >
               {step === 1 ? (
                 <div className="w-64 h-64 mx-auto rounded-full bg-nigerian-green/20 border-8 border-white/10 flex items-center justify-center">
                   <img src={MASCOT_PRO} alt="Igeri mascot" className="w-44 h-44 object-contain drop-shadow-2xl" />
                 </div>
               ) : (
                 <img
                   src={MASCOT_PRO}
                   alt="Igeri mascot cheering you on"
                   className="max-w-sm mx-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] animate-float"
                 />
               )}
            </motion.div>
            <h2 className="text-white text-4xl font-black mb-6 leading-tight">
               {step === 1 ? "Empowering the next generation." : "Your learning journey begins now!"}
            </h2>
            <p className="text-white/70 text-lg font-medium max-w-xs mx-auto">
               IGERI AI is built with love for the hearts of Nigerian children.
            </p>
         </div>

         <div className="absolute bottom-10 left-10 flex items-center gap-3">
            <img src={LOGO_URL} alt="Igeri AI logo" className="w-8 h-8 brightness-0 invert opacity-50" />
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
                 <img src={LOGO_URL} alt="Igeri AI logo" className="w-10 h-10" />
                 <span className="text-2xl font-black text-nigerian-green">IGERI AI</span>
               </div>
            </div>

            {!firebaseEnabled && (
              <div className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-sm font-bold text-destructive">
                Firebase isn't connected yet. Accounts can't be created until the project keys are added to .env.
              </div>
            )}

            <div className="mb-10">
               <div className="flex items-center gap-2 mb-2">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-12 bg-nigerian-green' : 'w-6 bg-earth-brown/10'}`} />
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-12 bg-nigerian-green' : 'w-6 bg-earth-brown/10'}`} />
               </div>
               <h1 className="text-4xl font-black text-earth-brown leading-tight">
                  {step === 1
                    ? authMode === 'signup' ? "Let's get started, Parent!" : 'Welcome back!'
                    : "Create a profile for your learner"}
               </h1>
            </div>

            <AnimatePresence mode="wait">
               {step === 1 ? (
                 <motion.form
                   key={authMode}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   onSubmit={handleParentSubmit}
                   className="space-y-6"
                 >
                    {authMode === 'signup' && (
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
                    )}

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

                    <div className="space-y-2">
                       <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Password</Label>
                       <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/30" size={20} />
                          <Input
                             type="password"
                             placeholder="At least 6 characters"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className="h-14 pl-12 rounded-2xl bg-white border-earth-brown/5 focus:ring-nigerian-green shadow-sm text-lg font-medium"
                          />
                       </div>
                    </div>

                    <div className="pt-4">
                       <Button type="submit" disabled={loading} className="w-full h-16 bg-nigerian-green hover:bg-nigerian-green/90 text-white text-xl font-black rounded-full kid-button shadow-xl shadow-nigerian-green/10 disabled:opacity-60">
                          {loading ? 'Please wait…' : authMode === 'signup' ? 'Continue' : 'Log In'} <ChevronRight className="ml-2" />
                       </Button>
                    </div>

                    <p className="text-center text-sm font-medium text-earth-brown/40 pt-2">
                      {authMode === 'signup' ? (
                        <>Already have an account?{' '}
                          <button type="button" onClick={() => setAuthMode('login')} className="text-nigerian-green font-bold underline">Log in</button>
                        </>
                      ) : (
                        <>New here?{' '}
                          <button type="button" onClick={() => setAuthMode('signup')} className="text-nigerian-green font-bold underline">Create an account</button>
                        </>
                      )}
                    </p>

                    <p className="text-center text-sm font-medium text-earth-brown/40">
                       By continuing, you agree to our <button type="button" onClick={() => navigate('/safety')} className="text-nigerian-green underline">Privacy Policy</button>
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
                    {authMode === 'signup' && (
                      <button
                         type="button"
                         onClick={() => setStep(1)}
                         className="flex items-center gap-2 text-sm font-black text-earth-brown/40 hover:text-earth-brown transition-colors mb-6"
                      >
                         <ArrowLeft size={16} /> Back to parent setup
                      </button>
                    )}

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
                       <Button type="submit" disabled={loading} className="w-full h-16 bg-adire-gold hover:bg-adire-gold/90 text-white text-xl font-black rounded-full kid-button shadow-xl shadow-adire-gold/10 disabled:opacity-60">
                          {loading ? 'Please wait…' : 'Launch Igeri AI'} <Heart className="ml-2 fill-white" size={20} />
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
