import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  KeyRound,
  Trash2,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  UserPlus,
  UserMinus,
  MessageSquare,
  Baby,
  LogOut,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import {
  fetchAllUsers,
  fetchAllAdmins,
  fetchUserProfiles,
  fetchUserSessions,
  deleteUserData,
  deleteChildProfile,
  deleteChatSession,
  promoteToAdmin,
  demoteAdmin,
  rotateAdminKey,
} from '@/lib/store';
import type { Admin, Profile, Session, User } from '@/lib/types';
import { LOGO_URL } from '@/lib/assets';

type Tab = 'users' | 'admins' | 'settings';

const AdminDashboard = () => {
  const { adminUser, adminSignOut } = useStore();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('users');

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [search, setSearch] = useState('');

  const [expandedUid, setExpandedUid] = useState<string | null>(null);
  const [profilesByUid, setProfilesByUid] = useState<Record<string, Profile[]>>({});
  const [sessionsByUid, setSessionsByUid] = useState<Record<string, Session[]>>({});
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [promoteUid, setPromoteUid] = useState('');

  const [newKey, setNewKey] = useState('');
  const [savingKey, setSavingKey] = useState(false);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      setUsers(await fetchAllUsers());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadAdmins = async () => {
    setLoadingAdmins(true);
    try {
      setAdmins(await fetchAllAdmins());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load admins.');
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadAdmins();
  }, []);

  const toggleExpand = async (uid: string) => {
    if (expandedUid === uid) {
      setExpandedUid(null);
      return;
    }
    setExpandedUid(uid);
    if (!profilesByUid[uid] || !sessionsByUid[uid]) {
      setLoadingDetail(true);
      try {
        const [profiles, sessions] = await Promise.all([fetchUserProfiles(uid), fetchUserSessions(uid)]);
        setProfilesByUid((prev) => ({ ...prev, [uid]: profiles }));
        setSessionsByUid((prev) => ({ ...prev, [uid]: sessions }));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Could not load that account.');
      } finally {
        setLoadingDetail(false);
      }
    }
  };

  const handleDeleteProfile = async (uid: string, profileId: string) => {
    if (!confirm("Delete this child's profile? This can't be undone.")) return;
    try {
      await deleteChildProfile(uid, profileId);
      setProfilesByUid((prev) => ({ ...prev, [uid]: prev[uid].filter((p) => p.id !== profileId) }));
      toast.success('Profile deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete profile.');
    }
  };

  const handleDeleteSession = async (uid: string, sessionId: string) => {
    if (!confirm('Delete this chat session? This can\'t be undone.')) return;
    try {
      await deleteChatSession(uid, sessionId);
      setSessionsByUid((prev) => ({ ...prev, [uid]: prev[uid].filter((s) => s.id !== sessionId) }));
      toast.success('Session deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete session.');
    }
  };

  const handleDeleteUser = async (uid: string, name: string) => {
    if (!confirm(`Wipe all Firestore data for ${name}? Their login stays active but every profile, session, and record is gone for good.`)) return;
    try {
      await deleteUserData(uid);
      setUsers((prev) => prev.filter((u) => u.id !== uid));
      setExpandedUid((prev) => (prev === uid ? null : prev));
      toast.success(`${name}'s data has been wiped.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete that account.');
    }
  };

  const handlePromote = async (uid: string, name: string, email: string) => {
    try {
      await promoteToAdmin(uid, name, email);
      toast.success(`${name} is now an admin.`);
      loadAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not promote that user.');
    }
  };

  const handlePromoteByUid = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = users.find((u) => u.id === promoteUid);
    if (!target) return toast.error('Pick a user from the Users tab list first.');
    await handlePromote(target.id, target.name, target.email);
    setPromoteUid('');
  };

  const handleDemote = async (uid: string, name: string) => {
    if (adminUser?.id === uid) return toast.error("You can't remove your own admin access.");
    if (!confirm(`Remove admin access from ${name}?`)) return;
    try {
      await demoteAdmin(uid);
      setAdmins((prev) => prev.filter((a) => a.id !== uid));
      toast.success(`${name} is no longer an admin.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not remove that admin.');
    }
  };

  const handleRotateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newKey.trim().length < 4) return toast.error('Choose a key that is at least 4 characters.');
    setSavingKey(true);
    try {
      await rotateAdminKey(newKey.trim());
      toast.success('Admin signup key updated.');
      setNewKey('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update the key.');
    } finally {
      setSavingKey(false);
    }
  };

  const handleSignOut = async () => {
    await adminSignOut();
    navigate('/');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <header className="bg-earth-brown sticky top-0 z-30 border-b-[3px] border-earth-brown">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="kid-button bg-white w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Igeri AI logo" className="w-8 h-8 brightness-0 invert" />
              <div>
                <h1 className="font-black text-2xl text-white leading-none tracking-tight">Admin Control Room</h1>
                <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-0.5">
                  Signed in as {adminUser?.name || 'Admin'}
                </p>
              </div>
            </div>
          </div>
          <button onClick={handleSignOut} className="kid-button bg-berry-pink text-white h-12 px-5 rounded-xl flex items-center gap-2">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-10">
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-nigerian-green text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
              <Users size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Parent Accounts</p>
              <h3 className="text-2xl font-black text-earth-brown">{users.length}</h3>
            </div>
          </div>
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-adire-gold text-earth-brown rounded-xl flex items-center justify-center shrink-0 brut-border">
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Admins</p>
              <h3 className="text-2xl font-black text-earth-brown">{admins.length}</h3>
            </div>
          </div>
          <div className="brut-card p-8 flex items-center gap-5">
            <div className="w-14 h-14 bg-sky-blue text-white rounded-xl flex items-center justify-center shrink-0 brut-border">
              <Baby size={26} />
            </div>
            <div>
              <p className="text-xs text-earth-brown/50 font-black uppercase tracking-widest">Child Profiles Seen</p>
              <h3 className="text-2xl font-black text-earth-brown">{Object.values(profilesByUid).flat().length || '—'}</h3>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          {([
            { id: 'users' as const, label: 'Users & Data' },
            { id: 'admins' as const, label: 'Admins' },
            { id: 'settings' as const, label: 'Settings' },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`kid-button h-12 px-6 rounded-xl font-black text-sm ${
                tab === t.id ? 'bg-nigerian-green text-white' : 'bg-white text-earth-brown'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'users' && (
          <section>
            <div className="flex items-center justify-between mb-6 gap-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="h-12 px-5 rounded-xl bg-white border-[3px] border-earth-brown/20 focus:border-nigerian-green outline-none font-medium flex-1 max-w-md"
              />
              <button onClick={loadUsers} className="kid-button bg-white h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                <RefreshCw size={18} className={loadingUsers ? 'animate-spin' : ''} />
              </button>
            </div>

            {loadingUsers ? (
              <p className="text-earth-brown/50 font-bold p-8 text-center">Loading users…</p>
            ) : filteredUsers.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border-[3px] border-dashed border-earth-brown/30 text-center">
                <p className="text-earth-brown/50 font-medium">No parent accounts found yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="brut-card-sm overflow-hidden">
                    <button onClick={() => toggleExpand(u.id)} className="w-full flex items-center justify-between p-6 text-left">
                      <div>
                        <h4 className="font-black text-earth-brown">{u.name}</h4>
                        <p className="text-xs text-earth-brown/50 font-medium">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(u.id, u.name);
                          }}
                          className="kid-button bg-destructive/10 text-destructive w-10 h-10 rounded-lg flex items-center justify-center"
                          title="Wipe this account's data"
                        >
                          <Trash2 size={16} />
                        </button>
                        {expandedUid === u.id ? <ChevronDown className="text-earth-brown/40" /> : <ChevronRight className="text-earth-brown/40" />}
                      </div>
                    </button>

                    {expandedUid === u.id && (
                      <div className="border-t-[3px] border-earth-brown/10 p-6 bg-parchment/50 space-y-6">
                        {loadingDetail ? (
                          <p className="text-earth-brown/50 font-bold text-sm">Loading…</p>
                        ) : (
                          <>
                            <div>
                              <p className="text-xs font-black uppercase tracking-widest text-earth-brown/50 mb-3 flex items-center gap-2">
                                <Baby size={14} /> Child Profiles ({profilesByUid[u.id]?.length ?? 0})
                              </p>
                              {(profilesByUid[u.id]?.length ?? 0) === 0 ? (
                                <p className="text-sm text-earth-brown/40 font-medium">No child profiles yet.</p>
                              ) : (
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {profilesByUid[u.id].map((p) => (
                                    <div key={p.id} className="bg-white rounded-xl p-4 border-[3px] border-earth-brown/10 flex items-center justify-between">
                                      <div>
                                        <p className="font-black text-sm text-earth-brown">{p.name}</p>
                                        <p className="text-xs text-earth-brown/50 font-medium">Age {p.age} • {p.tier} • {p.language}</p>
                                      </div>
                                      <button
                                        onClick={() => handleDeleteProfile(u.id, p.id)}
                                        className="text-destructive/70 hover:text-destructive shrink-0 ml-2"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-black uppercase tracking-widest text-earth-brown/50 mb-3 flex items-center gap-2">
                                <MessageSquare size={14} /> Chat Sessions ({sessionsByUid[u.id]?.length ?? 0})
                              </p>
                              {(sessionsByUid[u.id]?.length ?? 0) === 0 ? (
                                <p className="text-sm text-earth-brown/40 font-medium">No chat sessions yet.</p>
                              ) : (
                                <div className="space-y-2">
                                  {sessionsByUid[u.id].map((s) => (
                                    <div key={s.id} className="bg-white rounded-xl p-4 border-[3px] border-earth-brown/10 flex items-center justify-between">
                                      <div>
                                        <p className="font-black text-sm text-earth-brown">{s.messages[0]?.subject || 'Learning Session'}</p>
                                        <p className="text-xs text-earth-brown/50 font-medium">
                                          {new Date(s.startTime).toLocaleDateString()} • {s.messages.length} messages
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => handleDeleteSession(u.id, s.id)}
                                        className="text-destructive/70 hover:text-destructive shrink-0 ml-2"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'admins' && (
          <section className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-earth-brown">Current Admins</h3>
                <button onClick={loadAdmins} className="kid-button bg-white h-10 w-10 rounded-lg flex items-center justify-center">
                  <RefreshCw size={16} className={loadingAdmins ? 'animate-spin' : ''} />
                </button>
              </div>
              {loadingAdmins ? (
                <p className="text-earth-brown/50 font-bold p-8 text-center">Loading admins…</p>
              ) : (
                <div className="space-y-3">
                  {admins.map((a) => (
                    <div key={a.id} className="brut-card-sm p-5 flex items-center justify-between">
                      <div>
                        <p className="font-black text-earth-brown flex items-center gap-2">
                          {a.name}
                          {a.id === adminUser?.id && <span className="text-[10px] bg-nigerian-green-light text-nigerian-green px-2 py-0.5 rounded-full font-black uppercase">You</span>}
                        </p>
                        <p className="text-xs text-earth-brown/50 font-medium">{a.email}</p>
                      </div>
                      <button
                        onClick={() => handleDemote(a.id, a.name)}
                        disabled={a.id === adminUser?.id}
                        className="kid-button bg-white h-10 px-4 rounded-lg flex items-center gap-2 text-sm font-black disabled:opacity-40"
                      >
                        <UserMinus size={16} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="brut-card p-8 bg-white">
              <h3 className="text-xl font-black text-earth-brown mb-2 flex items-center gap-2">
                <UserPlus size={22} className="text-nigerian-green" /> Promote a Parent to Admin
              </h3>
              <p className="text-sm text-earth-brown/60 font-medium mb-6">
                Pick a parent account from the Users tab and paste their account ID below to grant them full admin access.
              </p>
              <form onSubmit={handlePromoteByUid} className="flex gap-3">
                <select
                  value={promoteUid}
                  onChange={(e) => setPromoteUid(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-parchment border-[3px] border-earth-brown/20 font-medium flex-1"
                >
                  <option value="">Select a parent account…</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.email}
                    </option>
                  ))}
                </select>
                <button type="submit" className="kid-button bg-nigerian-green text-white h-12 px-6 rounded-xl font-black">
                  Promote
                </button>
              </form>
            </div>
          </section>
        )}

        {tab === 'settings' && (
          <section className="brut-card p-8 bg-white max-w-lg">
            <h3 className="text-xl font-black text-earth-brown mb-2 flex items-center gap-2">
              <KeyRound size={22} className="text-berry-pink" /> Rotate Admin Signup Key
            </h3>
            <p className="text-sm text-earth-brown/60 font-medium mb-6">
              Anyone who knows this key can create their own admin account at <span className="font-black">/admin/login</span>. Change it any
              time — existing admins keep their access either way.
            </p>
            <form onSubmit={handleRotateKey} className="space-y-4">
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="New admin signup key"
                className="h-12 w-full px-4 rounded-xl bg-parchment border-[3px] border-earth-brown/20 focus:border-berry-pink outline-none font-medium"
              />
              <button type="submit" disabled={savingKey} className="kid-button bg-berry-pink text-white h-12 px-6 rounded-xl font-black disabled:opacity-60">
                {savingKey ? 'Saving…' : 'Update Key'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
