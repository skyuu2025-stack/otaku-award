
export enum Category {
  ILLUSTRATION = 'Illustration',
  FASHION = 'Fashion Design',
  THREE_D = '3D Model',
  ANIMATION = 'Animation'
}

export interface Submission {
  id: string;
  title: string;
  artist: string;
  category: Category;
  imageUrl: string;
  votes: number;
  expertScore: number;
  description: string;
  timestamp: number;
  isWinner?: boolean;
}

export interface User {
  address: string;
  otaBalance: number;
  isArtist: boolean;
  submissions: string[];
}
