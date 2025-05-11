
import { User, Candidate, Election } from '../types';

// In a real application, users would be stored in a database with proper authentication
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // This should be properly hashed in a real app
    role: 'admin',
    hasVoted: false
  },
  {
    id: '2',
    username: 'voter1',
    password: 'voter123',
    role: 'voter',
    hasVoted: false
  },
  {
    id: '3',
    username: 'voter2',
    password: 'voter123',
    role: 'voter',
    hasVoted: false
  }
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Jane Doe',
    party: 'Progressive Party',
    manifesto: 'Fighting for equality and justice for all citizens.',
    photo: '/placeholder.svg',
    votes: 5
  },
  {
    id: '2',
    name: 'John Smith',
    party: 'Conservative Union',
    manifesto: 'Supporting traditional values and economic growth.',
    photo: '/placeholder.svg',
    votes: 3
  },
  {
    id: '3',
    name: 'Alex Johnson',
    party: 'Centrist Alliance',
    manifesto: 'Building bridges and finding common ground for all.',
    photo: '/placeholder.svg',
    votes: 2
  }
];

export const elections: Election[] = [
  {
    id: '1',
    title: 'Presidential Election 2025',
    description: 'Vote for the next president who will lead our nation for the next 4 years.',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    candidates: candidates
  }
];
