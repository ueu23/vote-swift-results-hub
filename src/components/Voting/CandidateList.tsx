
import React from 'react';
import { useVote } from '@/context/VoteContext';
import CandidateCard from './CandidateCard';

const CandidateList: React.FC = () => {
  const { currentElection } = useVote();
  
  if (!currentElection) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No active election available.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-vote-purple">{currentElection.title}</h2>
      <p className="text-gray-600 mb-6">{currentElection.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentElection.candidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
