
export type UserRole = 'admin' | 'voter';

export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed and not stored in the frontend
  role: UserRole;
  hasVoted: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  manifesto: string;
  photo: string;
  votes: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  candidates: Candidate[];
}
