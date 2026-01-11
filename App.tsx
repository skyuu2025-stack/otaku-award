
import React, { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import SubmissionCard from './components/SubmissionCard';
import { Submission, Category } from './types';
import { MOCK_SUBMISSIONS, ENTRY_FEE, VOTE_COST_OTA, BANGKOK_EVENT } from './constants';
import { getArtCritique } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'submit' | 'awards'>('home');
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [userOta, setUserOta] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'USDT' | 'USDC' | 'STRIPE' | null>(null);
  const [newEntry, setNewEntry] = useState({ 
    title: '', 
    category: Category.ILLUSTRATION, 
    description: '', 
    imageUrl: '' 
  });
  const [critique, setCritique] = useState<string | null>(null);

  const handleVote = useCallback((id: string) => {
    if (userOta < VOTE_COST_OTA) {
      alert("Insufficient OTA tokens!");
      return;
    }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
    setUserOta(prev => prev - VOTE_COST_OTA);
  }, [userOta]);

  const handleMockUpload = () => {
    const randomImgs = [
      'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'
    ];
    setNewEntry(prev => ({ ...prev, imageUrl: randomImgs[Math.floor(Math.random() * randomImgs.length)] }));
  };

  const finalizeSubmission = async () => {
    setIsSubmitting(true);
    setShowPayment(false);
    
    await new Promise(r => setTimeout(r, 2000));
    
    const entry: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEntry.title || "Elite Vision",
      artist: "Me (Verified)",
      category: newEntry.category,
      imageUrl: newEntry.imageUrl || 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
      votes: 0,
      expertScore: Math.floor(Math.random() * 15) + 80,
      description: newEntry.description,
      timestamp: Date.now(),
    };

    setSubmissions([entry, ...submissions]);
    const aiCritique = await getArtCritique(entry.title, entry.description);
    setCritique(aiCritique);
    setIsSubmitting(false);
    setView('home');
    setNewEntry({ title: '', category: Category.ILLUSTRATION, description: '', imageUrl: '' });
    setPaymentMethod(null);
  };

  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-[60] pt-safe px-6 pointer-events-none">
      <div className="flex justify-between items-center h-16 pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 island-active shadow-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
          <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">E2EE Secured</span>
        </div>
        
        <div className="bg-[#ff007a]/20 backdrop-blur-2xl border border-[#ff007a]/40 px-4 py-2 rounded-full shadow-lg">
           <span className="text-xs font-bold text-[#ff007a] tracking-wider font-mono">{userOta} OTA</span>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="pt-24 px-6 pb-40">
      <div className="mb-12">
        <h1 className="text-6xl font-black text-white italic tracking-tighter mb-1">OTAKU</h1>
        <h2 className="text-xl font-medium text-white/30 tracking-[0.3em] uppercase">Awards 2026</h2>
      </div>

      {critique && (
        <div className="mb-10 p-6 rounded-[32px] glass-card border-l-4 border-l-[#4200ff] animate-in slide-in-from-top duration-700 shadow-2xl">
           <p className="text-[10px] font-bold text-[#4200ff] uppercase tracking-widest mb-2">X-Master AI Analyst</p>
           <p className="text-sm text-white/90 italic leading-relaxed font-medium font-mono">"{critique}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12">
        {submissions.map(sub => (
          <SubmissionCard key={sub.id} submission={sub} onVote={handleVote} />
        ))}
      </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="pt-24 px-6 pb-40">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">The Ascent</h1>
        <p className="text-white/40 text-[10px] mt-3 uppercase tracking-[0.2em] font-bold">Standard Fee: ${ENTRY_FEE}.00</p>
      </div>

      <div className="space-y-6">
        <input 
          required
          className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff007a]/50 transition-all font-medium"
          placeholder="Creation Title"
          value={newEntry.title}
          onChange={e => setNewEntry({...newEntry, title: e.target.value})}
        />
        
        <select 
          className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white appearance-none focus:outline-none font-medium"
          value={newEntry.category}
          onChange={e => setNewEntry({...newEntry, category: e.target.value as Category})}
        >
          {Object.values(Category).map(c => <option key={c} value={c} className="bg-neutral-950">{c}</option>)}
        </select>

        <textarea 
          rows={4}
          className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff007a]/50 transition-all font-medium"
          placeholder="Describe your vision..."
          value={newEntry.description}
          onChange={e => setNewEntry({...newEntry, description: e.target.value})}
        />

        <div 
          onClick={handleMockUpload}
          className={`h-56 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center transition-all overflow-hidden relative cursor-pointer ${newEntry.imageUrl ? 'border-[#ff007a]/50' : 'border-white/10 hover:border-white/30'}`}
        >
          {newEntry.imageUrl ? (
            <div className="w-full h-full relative">
              <img src={newEntry.imageUrl} className="w-full h-full object-cover opacity-70" alt="Preview" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="bg-black/60 px-4 py-2 rounded-full border border-[#ff007a]/30">
                  <span className="text-white font-bold text-[10px] tracking-widest uppercase">Encrypted Meta-Data Ready</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Select Original Artwork</p>
            </div>
          )}
        </div>

        <button 
          onClick={() => setShowPayment(true)}
          disabled={isSubmitting || !newEntry.title || !newEntry.imageUrl}
          className="w-full anime-gradient py-5 rounded-2xl font-black text-white shadow-2xl active:scale-[0.98] transition-all disabled:opacity-30 uppercase tracking-[0.2em] text-xs border border-white/10"
        >
          {isSubmitting ? 'Syncing...' : 'Finalize & Sign'}
        </button>
      </div>

      {showPayment && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-300 px-4">
          <div className="glass-card rounded-t-[48px] p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-full duration-700 w-full max-w-xl mx-auto border-t border-white/20">
            <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mb-10"></div>
            <h3 className="text-3xl font-black text-white mb-2 text-center italic tracking-tighter">PAYMENT GATEWAY</h3>
            <p className="text-white/30 text-[10px] text-center mb-10 uppercase tracking-[0.3em] font-bold">Entry Security Deposit: ${ENTRY_FEE}.00</p>
            
            <div className="space-y-4 mb-12">
              <button 
                onClick={() => setPaymentMethod('USDT')}
                className={`w-full p-6 rounded-3xl border transition-all flex items-center justify-between ${paymentMethod === 'USDT' ? 'border-[#ff007a] bg-[#ff007a]/15' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#26a17b] flex items-center justify-center font-bold text-white text-xl">₮</div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">USDT</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold font-mono">Blockchain Settlement</p>
                  </div>
                </div>
                {paymentMethod === 'USDT' && <div className="w-6 h-6 rounded-full bg-[#ff007a] flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
              </button>

              <button 
                onClick={() => setPaymentMethod('STRIPE')}
                className={`w-full p-6 rounded-3xl border transition-all flex items-center justify-between ${paymentMethod === 'STRIPE' ? 'border-[#ff007a] bg-[#ff007a]/15' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#635bff] flex items-center justify-center font-bold text-white text-xl">S</div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">Stripe / Apple Pay</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold font-mono">Traditional Rail</p>
                  </div>
                </div>
                {paymentMethod === 'STRIPE' && <div className="w-6 h-6 rounded-full bg-[#ff007a] flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <button onClick={() => setShowPayment(false)} className="py-5 rounded-2xl bg-white/5 font-bold text-white/40 uppercase tracking-widest text-[10px]">Cancel</button>
              <button disabled={!paymentMethod} onClick={finalizeSubmission} className="py-5 rounded-2xl anime-gradient font-black text-white shadow-xl uppercase tracking-widest text-[10px] disabled:opacity-20 transition-all border border-white/20">Authorize</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAwards = () => (
    <div className="pt-24 px-6 pb-40">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Victors' Rights</h1>
        <p className="text-white/40 text-[10px] mt-3 uppercase tracking-[0.2em] font-bold">2026 Legacy Allocation</p>
      </div>

      <div className="space-y-10">
        <div className="glass-card p-10 rounded-[40px] relative overflow-hidden group border border-white/10 shadow-xl">
           <div className="absolute -right-10 -top-10 text-[140px] opacity-5 pointer-events-none select-none">🇹🇭</div>
           <div className="text-6xl mb-8">🇹🇭</div>
           <h3 className="text-2xl font-black text-white mb-3 italic tracking-tight uppercase">Bangkok Grand Stage</h3>
           <p className="text-white/40 text-sm leading-relaxed font-medium">
             Exclusive catwalk display at {BANGKOK_EVENT}. Total logistics and elite residence sponsorship for all winners.
           </p>
        </div>

        <div className="glass-card p-10 rounded-[40px] relative overflow-hidden group border border-white/10 shadow-xl">
           <div className="absolute -right-10 -top-10 text-[140px] opacity-5 pointer-events-none select-none">🏅</div>
           <div className="text-6xl mb-8">🎖️</div>
           <h3 className="text-2xl font-black text-white mb-3 italic tracking-tight uppercase">EVM Soul-Badge</h3>
           <p className="text-white/40 text-sm leading-relaxed font-medium">
             Permanent cryptographic 1-of-1 NFT medal. Linked to your artist identity forever on the Otaku Award Chain.
           </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {renderHeader()}
      <main className="animate-in fade-in duration-1000 max-w-lg mx-auto">
        {view === 'home' && renderHome()}
        {view === 'submit' && renderSubmit()}
        {view === 'awards' && renderAwards()}
      </main>
      <Navigation onNavigate={setView} currentView={view} />
    </div>
  );
};

export default App;
