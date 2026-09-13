import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShieldCheck, Mail, Lock, User, KeyRound, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';
import { firebaseEnabled } from '@/lib/firebase';
import { LOGO_URL, SAFETY_HERO_IMG } from '@/lib/assets';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'That email already has an account — try logging in instead.',
  'auth/invalid-email': "That email address doesn't look right.",
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/wrong-password': 'Wrong email or password — please try again.',
  'auth/invalid-credential': 'Wrong email or password — please try again.',
  'auth/user-not-found': 'No admin account with that email yet.',
};

function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code;
  if (code && AUTH_ERROR_MESSAGES[code]) return AUTH_ERROR_MESSAGES[code];
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}

const AdminLogin = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');

  const { adminSignIn, adminSignUp } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseEnabled) {
      toast.error("Firebase isn't connected yet — admin accounts can't be created until it is.");
      return;
    }
    if (!email || !password) return toast.error('Please fill in your email and password.');
    if (mode === 'signup' && (!name || !key)) return toast.error('Please fill in every field, including the admin key.');

    setLoading(true);
    try {
      if (mode === 'signup') {
        await adminSignUp(name, email, password, key);
        toast.success('Admin account created. Welcome to the control room.');
      } else {
        await adminSignIn(email, password);
        toast.success('Welcome back, admin.');
      }
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex overflow-hidden">
      <div className="hidden lg:flex w-2/5 relative bg-earth-brown items-center justify-center p-12 overflow-hidden border-r-[3px] border-earth-brown">
        <div className="absolute top-16 right-16 w-12 h-12 bg-adire-gold rounded-xl brut-border rotate-12" />
        <div className="absolute bottom-24 left-16 w-9 h-9 bg-berry-pink rounded-full brut-border" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 w-64 h-64 mx-auto rounded-2xl overflow-hidden border-[3px] border-white/30"
          >
            <img src={SAFETY_HERO_IMG} alt="Admin control" className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
          </motion.div>
          <h2 className="text-white text-4xl font-black mb-6 leading-tight">The control room.</h2>
          <p className="text-white/70 text-lg font-medium max-w-xs mx-auto">
            Full oversight of every parent, child profile, and session on IGERI AI — handle with care.
          </p>
        </div>

        <div className="absolute bottom-10 left-10 flex items-center gap-3">
          <img src={LOGO_URL} alt="Igeri AI logo" className="w-8 h-8 brightness-0 invert opacity-50" />
          <span className="text-white/30 font-black text-sm uppercase tracking-widest">IGERI AI Admin</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-black text-earth-brown/50 hover:text-earth-brown transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to site
          </button>

          <div className="sticker-badge text-berry-pink mb-6">
            <ShieldCheck size={16} />
            <span>Admin Access</span>
          </div>

          {!firebaseEnabled && (
            <div className="mb-6 brut-card-sm p-4 bg-destructive/10 text-sm font-bold text-destructive">
              Firebase isn't connected yet. Admin accounts can't be created until the project keys are added to .env.
            </div>
          )}

          <h1 className="text-4xl font-black text-earth-brown leading-tight mb-10">
            {mode === 'login' ? 'Admin Log In' : 'Create Admin Account'}
          </h1>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={20} />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Olukayode Israel"
                      className="h-14 pl-12 rounded-xl bg-white border-[3px] border-earth-brown/20 focus-visible:border-berry-pink text-lg font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={20} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    className="h-14 pl-12 rounded-xl bg-white border-[3px] border-earth-brown/20 focus-visible:border-berry-pink text-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={20} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="h-14 pl-12 rounded-xl bg-white border-[3px] border-earth-brown/20 focus-visible:border-berry-pink text-lg font-medium"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label className="text-sm font-black text-earth-brown/60 ml-2 uppercase tracking-widest">Admin Key</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={20} />
                    <Input
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="Enter the shared admin key"
                      className="h-14 pl-12 rounded-xl bg-white border-[3px] border-earth-brown/20 focus-visible:border-berry-pink text-lg font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-earth-brown/40 font-bold uppercase tracking-widest ml-2">
                    Ask an existing admin, or use the project default if this is the very first account.
                  </p>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="kid-button w-full h-16 bg-berry-pink text-white text-xl rounded-xl disabled:opacity-60 flex items-center justify-center"
                >
                  {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Admin Account'}
                </button>
              </div>

              <p className="text-center text-sm font-medium text-earth-brown/50 pt-2">
                {mode === 'login' ? (
                  <>
                    Need to create the first admin account?{' '}
                    <button type="button" onClick={() => setMode('signup')} className="text-berry-pink font-bold underline">
                      Create one
                    </button>
                  </>
                ) : (
                  <>
                    Already an admin?{' '}
                    <button type="button" onClick={() => setMode('login')} className="text-berry-pink font-bold underline">
                      Log in
                    </button>
                  </>
                )}
              </p>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
