
import React from 'react';
import { Submission } from '../types';
import { VOTE_COST_OTA } from '../constants';

interface CardProps {
  submission: Submission;
  onVote: (id: string) => void;
}

const SubmissionCard: React.FC<CardProps> = ({ submission, onVote }) => {
  const totalScore = (submission.votes * 0.7 + submission.expertScore * 0.3).toFixed(1);

  return (
    <div className="glass-card rounded-[32px] overflow-hidden group transition-all duration-500 active:scale-[0.97] border-0 relative">
      <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
        {/* 直接渲染图片，移除不稳定的 opacity-0 逻辑 */}
        <img 
          src={submission.imageUrl} 
          alt={submission.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // 如果图片加载失败，显示渐变占位符
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x1000/1a1a1a/ff007a?text=${encodeURIComponent(submission.title)}`;
          }}
        />
        
        {/* 数据标签 - 提高层级 (z-index) */}
        <div className="absolute top-4 right-4 z-20">
           <div className="bg-black/70 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff007a] shadow-[0_0_10px_#ff007a]"></div>
              <span className="text-[11px] font-bold text-white tracking-wider font-mono">{totalScore}</span>
           </div>
        </div>

        {/* 蒙层 - 确保文字在明亮图片上依然清晰 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-10" />
        
        {/* 内容区域 - 确保在 z-10 之上 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <p className="text-[#ff007a] font-mono text-[10px] mb-1 uppercase tracking-[0.2em] font-bold drop-shadow-sm">@{submission.artist}</p>
          <h3 className="font-bold text-xl text-white mb-5 leading-tight drop-shadow-md">{submission.title}</h3>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onVote(submission.id);
            }}
            className="w-full py-4 anime-gradient rounded-2xl font-bold text-white text-xs shadow-lg active:scale-95 transition-all uppercase tracking-widest border border-white/10"
          >
            Vote {VOTE_COST_OTA} OTA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
