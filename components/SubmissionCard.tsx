
import React, { useState } from 'react';
import { Submission } from '../types';
import { VOTE_COST_OTA } from '../constants';

interface CardProps {
  submission: Submission;
  onVote: (id: string) => void;
}

const SubmissionCard: React.FC<CardProps> = ({ submission, onVote }) => {
  const [isHovered, setIsHovered] = useState(false);

  const totalScore = (submission.votes * 0.7 + submission.expertScore * 0.3).toFixed(1);

  return (
    <div 
      className="glass-card rounded-[28px] overflow-hidden group transition-all duration-500 active:scale-[0.98]"
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={submission.imageUrl} 
          alt={submission.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        
        <div className="absolute top-4 right-4">
           <div className="bg-black/50 backdrop-blur-lg px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff007a] shadow-[0_0_8px_#ff007a]"></div>
              <span className="text-[10px] font-bold text-white/90">{totalScore}</span>
           </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[#ff007a] font-mono text-[10px] mb-1 uppercase tracking-widest">@{submission.artist}</p>
          <h3 className="font-bold text-xl text-white mb-4">{submission.title}</h3>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onVote(submission.id);
            }}
            className="w-full py-3.5 anime-gradient rounded-2xl font-bold text-white text-sm shadow-xl active:scale-95 transition-all"
          >
            VOTE (10 OTA)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
