
import React from 'react';

interface NavProps {
  onNavigate: (view: 'home' | 'submit' | 'awards') => void;
  currentView: string;
}

const Navigation: React.FC<NavProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="glass-card rounded-[32px] p-2 flex items-center justify-between shadow-2xl">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex-1 flex flex-col items-center py-2 transition-all duration-300 ${currentView === 'home' ? 'text-[#ff007a]' : 'text-white/40'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Gallery</span>
        </button>

        <button 
          onClick={() => onNavigate('submit')}
          className="relative -top-6 flex flex-col items-center"
        >
          <div className="w-14 h-14 anime-gradient rounded-full flex items-center justify-center shadow-lg border-4 border-black group active:scale-90 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-white mt-1 uppercase tracking-widest">Entry</span>
        </button>

        <button 
          onClick={() => onNavigate('awards')}
          className={`flex-1 flex flex-col items-center py-2 transition-all duration-300 ${currentView === 'awards' ? 'text-[#ff007a]' : 'text-white/40'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Winners</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
