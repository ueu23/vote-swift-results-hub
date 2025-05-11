
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Candidate, Election } from '../types';
import { elections as initialElections } from '../data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface VoteContextType {
  elections: Election[];
  currentElection: Election | null;
  castVote: (candidateId: string) => boolean;
  getTotalVotes: () => number;
  updateCandidates: (candidates: Candidate[]) => void;
  setActiveElection: (electionId: string) => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export function VoteProvider({ children }: { children: ReactNode }) {
  const [elections, setElections] = useState<Election[]>(initialElections);
  const [currentElection, setCurrentElection] = useState<Election | null>(
    initialElections.length > 0 ? initialElections[0] : null
  );
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const castVote = (candidateId: string): boolean => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to vote",
        variant: "destructive",
      });
      return false;
    }

    if (currentUser.hasVoted) {
      toast({
        title: "Vote Failed",
        description: "You have already cast your vote",
        variant: "destructive",
      });
      return false;
    }

    if (!currentElection) {
      toast({
        title: "Error",
        description: "No active election found",
        variant: "destructive",
      });
      return false;
    }

    // Update elections state
    const updatedElections = elections.map(election => {
      if (election.id === currentElection.id) {
        const updatedCandidates = election.candidates.map(candidate => {
          if (candidate.id === candidateId) {
            return { ...candidate, votes: candidate.votes + 1 };
          }
          return candidate;
        });
        return { ...election, candidates: updatedCandidates };
      }
      return election;
    });

    // Update user state to mark as voted
    currentUser.hasVoted = true;
    
    setElections(updatedElections);
    
    // Update current election
    const updatedElection = updatedElections.find(e => e.id === currentElection.id) || null;
    setCurrentElection(updatedElection);
    
    toast({
      title: "Vote Cast Successfully",
      description: "Your vote has been recorded",
      variant: "default",
    });
    
    return true;
  };
  
  const getTotalVotes = (): number => {
    if (!currentElection) return 0;
    return currentElection.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  };
  
  const updateCandidates = (candidates: Candidate[]): void => {
    if (!currentElection) return;
    
    const updatedElections = elections.map(election => {
      if (election.id === currentElection.id) {
        return { ...election, candidates };
      }
      return election;
    });
    
    setElections(updatedElections);
    const updatedElection = updatedElections.find(e => e.id === currentElection.id) || null;
    setCurrentElection(updatedElection);
  };
  
  const setActiveElection = (electionId: string): void => {
    const election = elections.find(e => e.id === electionId) || null;
    setCurrentElection(election);
  };
  
  return (
    <VoteContext.Provider value={{ 
      elections, 
      currentElection, 
      castVote, 
      getTotalVotes,
      updateCandidates,
      setActiveElection
    }}>
      {children}
    </VoteContext.Provider>
  );
}

export function useVote() {
  const context = useContext(VoteContext);
  if (context === undefined) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
}
