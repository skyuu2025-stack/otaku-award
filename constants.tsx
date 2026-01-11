
import React from 'react';
import { Category, Submission } from './types';

export const APP_NAME = "OTAKU AWARD";
export const ENTRY_FEE = 258; // USD
export const VOTE_COST_OTA = 10;
export const BANGKOK_EVENT = "Bangkok Anime Fashion Week 2026";

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    title: 'Cyberpunk Geisha',
    artist: 'NeoTokyo_01',
    category: Category.ILLUSTRATION,
    imageUrl: 'https://picsum.photos/seed/anime1/600/800',
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
    imageUrl: 'https://picsum.photos/seed/anime2/600/800',
    votes: 940,
    expertScore: 92,
    description: 'Techwear inspired by the deep-space aesthetic of 2026.',
    timestamp: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Mecha-Knight 04',
    artist: 'GundamMaster',
    category: Category.THREE_D,
    imageUrl: 'https://picsum.photos/seed/anime3/600/800',
    votes: 2100,
    expertScore: 78,
    description: 'High-poly 3D render of a protective mech suit.',
    timestamp: Date.now() - 259200000,
  }
];
