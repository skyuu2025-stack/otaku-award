
import { Category, Submission } from './types';

export const APP_NAME = "OTAKU AWARD";
export const ENTRY_FEE = 258;
export const VOTE_COST_OTA = 10;
export const BANGKOK_EVENT = "Bangkok Anime Fashion Week 2026";

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    title: 'Neon Ronin: Zero',
    artist: 'NeoTokyo_01',
    category: Category.ILLUSTRATION,
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
    votes: 1250,
    expertScore: 85,
    description: 'A fusion of traditional Edo aesthetics and futuristic hardware.',
    timestamp: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Void Runner Jacket',
    artist: 'KiraDesign',
    category: Category.FASHION,
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
    votes: 940,
    expertScore: 92,
    description: 'Techwear inspired by the deep-space aesthetic of 2026.',
    timestamp: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Mecha-Frame 04',
    artist: 'GundamMaster',
    category: Category.ANIMATION,
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800',
    votes: 2100,
    expertScore: 78,
    description: 'High-poly animation keyframe of a protective mech suit.',
    timestamp: Date.now() - 259200000,
  }
];
