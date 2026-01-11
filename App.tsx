
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
  const [newEntry, setNewEntry] = useState({ title: '', category: Category.ILLUSTRATION, description: '', image: '' });
  const [critique, setCritique] = useState<string | null>(null);

  const handleVote = useCallback((id: string) => {
    if (userOta < VOTE_COST_OTA) {
      alert("Insufficient OTA tokens!");
      return;
    }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
    setUserOta(prev => prev - VOTE_COST_OTA);
  }, [userOta]);

  const finalizeSubmission = async () => {
    setIsSubmitting(true);
    setShowPayment(false);
    
    // Simulating E2E encryption and blockchain/Stripe verification
    await new Promise(r => setTimeout(r, 2500));
    
    const entry: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEntry.title || "Untitled",
      artist: "Me",
      category: newEntry.category,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/600/800`,
      votes: 0,
      expertScore: Math.floor(Math.random() * 20) + 75,
      description: newEntry.description,
      timestamp: Date.now(),
    };

    setSubmissions([entry, ...submissions]);
    const aiCritique = await getArtCritique(entry.title, entry.description);
    setCritique(aiCritique);
    setIsSubmitting(false);
    setView('home');
    setNewEntry({ title: '', category: Category.ILLUSTRATION, description: '', image: '' });
    setPaymentMethod(null);
  };

  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-[60] pt-safe px-6">
      <div className="flex justify-between items-center h-14">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 island-active">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">E2EE Secured</span>
        </div>
        
        <div className="bg-[#ff007a]/10 backdrop-blur-2xl border border-[#ff007a]/20 px-4 py-2 rounded-full">
           <span className="text-xs font-bold text-[#ff007a]">{userOta} OTA</span>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="pt-28 px-6 pb-40">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white italic tracking-tighter mb-2">OTAKU</h1>
        <h2 className="text-2xl font-light text-white/40 tracking-widest uppercase">Awards 2026</h2>
      </div>

      {critique && (
        <div className="mb-10 p-6 rounded-[28px] glass-card border-l-4 border-l-[#4200ff] animate-in slide-in-from-top duration-500">
           <p className="text-[10px] font-bold text-[#4200ff] uppercase mb-2">X-Master AI Analysis</p>
           <p className="text-sm text-white italic leading-relaxed">"{critique}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {submissions.map(sub => (
          <SubmissionCard key={sub.id} submission={sub} onVote={handleVote} />
        ))}
      </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="pt-28 px-6 pb-40">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white italic tracking-tighter">THE ASCENT</h1>
        <p className="text-white/40 text-sm mt-2 uppercase tracking-widest">Global Entry Fee: ${ENTRY_FEE}.00</p>
      </div>

      <div className="space-y-6">
        <input 
          required
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff007a]/50 transition-colors"
          placeholder="Creation Title"
          value={newEntry.title}
          onChange={e => setNewEntry({...newEntry, title: e.target.value})}
        />
        
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white appearance-none focus:outline-none"
          value={newEntry.category}
          onChange={e => setNewEntry({...newEntry, category: e.target.value as Category})}
        >
          {Object.values(Category).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
        </select>

        <textarea 
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff007a]/50 transition-colors"
          placeholder="Artist's vision..."
          value={newEntry.description}
          onChange={e => setNewEntry({...newEntry, description: e.target.value})}
        />

        <div className="h-40 border-2 border-dashed border-white/10 rounded-[28px] flex flex-col items-center justify-center group active:border-[#ff007a]/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Encrypted Media Upload</p>
        </div>

        <button 
          onClick={() => setShowPayment(true)}
          disabled={isSubmitting || !newEntry.title}
          className="w-full anime-gradient py-5 rounded-2xl font-bold text-white shadow-2xl active:scale-95 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'ENCRYPTING...' : 'PAY & SUBMIT'}
        </button>
      </div>

      {/* Payment Selection Sheet */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-card rounded-t-[40px] p-8 pb-safe shadow-2xl animate-in slide-in-from-bottom-full duration-500">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Complete Payment</h3>
            <p className="text-white/40 text-sm text-center mb-8 uppercase tracking-widest">Final Total: ${ENTRY_FEE}.00</p>
            
            <div className="space-y-4 mb-10">
              <button 
                onClick={() => setPaymentMethod('USDT')}
                className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between ${paymentMethod === 'USDT' ? 'border-[#ff007a] bg-[#ff007a]/10' : 'border-white/10 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#26a17b] flex items-center justify-center font-bold text-white">₮</div>
                  <div className="text-left">
                    <p className="font-bold text-white">USDT</p>
                    <p className="text-[10px] text-white/40 uppercase">ERC-20 / Polygon</p>
                  </div>
                </div>
                {paymentMethod === 'USDT' && <div className="w-4 h-4 rounded-full bg-[#ff007a]"></div>}
              </button>

              <button 
                onClick={() => setPaymentMethod('USDC')}
                className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between ${paymentMethod === 'USDC' ? 'border-[#ff007a] bg-[#ff007a]/10' : 'border-white/10 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2775ca] flex items-center justify-center font-bold text-white">C</div>
                  <div className="text-left">
                    <p className="font-bold text-white">USDC</p>
                    <p className="text-[10px] text-white/40 uppercase">Stablecoin Payment</p>
                  </div>
                </div>
                {paymentMethod === 'USDC' && <div className="w-4 h-4 rounded-full bg-[#ff007a]"></div>}
              </button>

              <button 
                onClick={() => setPaymentMethod('STRIPE')}
                className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between ${paymentMethod === 'STRIPE' ? 'border-[#ff007a] bg-[#ff007a]/10' : 'border-white/10 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#635bff] flex items-center justify-center font-bold text-white">S</div>
                  <div className="text-left">
                    <p className="font-bold text-white">Credit Card (Stripe)</p>
                    <p className="text-[10px] text-white/40 uppercase">Visa, Mastercard, Apple Pay</p>
                  </div>
                </div>
                {paymentMethod === 'STRIPE' && <div className="w-4 h-4 rounded-full bg-[#ff007a]"></div>}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowPayment(false)}
                className="py-4 rounded-2xl bg-white/5 font-bold text-white/60 active:scale-95 transition-all"
              >
                CANCEL
              </button>
              <button 
                disabled={!paymentMethod}
                onClick={finalizeSubmission}
                className="py-4 rounded-2xl anime-gradient font-bold text-white shadow-xl active:scale-95 transition-all disabled:opacity-30"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAwards = () => (
    <div className="pt-28 px-6 pb-40">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white italic tracking-tighter">WINNER PERKS</h1>
        <p className="text-white/40 text-sm mt-2 uppercase tracking-widest">Rewards of the Elite</p>
      </div>

      <div className="space-y-8">
        <div className="glass-card p-8 rounded-[32px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">🇹🇭</div>
          <div className="text-5xl mb-6">🇹🇭</div>
          <h3 className="text-2xl font-bold text-white mb-2">Bangkok 2026</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Main stage exhibition at {BANGKOK_EVENT}. Full travel package included for two winners per category.
          </p>
        </div>

        <div className="glass-card p-8 rounded-[32px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">🏅</div>
          <div className="text-5xl mb-6">🏅</div>
          <h3 className="text-2xl font-bold text-white mb-2">NFT Medal</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            A permanent cryptographic proof of your victory. 1-of-1 metadata certification badge.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">Encryption Standard: AES-256 (2026 Compliant)</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {renderHeader()}
      
      <main className="animate-in fade-in duration-1000">
        {view === 'home' && renderHome()}
        {view === 'submit' && renderSubmit()}
        {view === 'awards' && renderAwards()}
      </main>

      <Navigation onNavigate={setView} currentView={view} />
    </div>
  );
};

export default App;
