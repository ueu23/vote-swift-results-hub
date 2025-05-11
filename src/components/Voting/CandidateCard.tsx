
import React from 'react';
import { Candidate } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVote } from '@/context/VoteContext';
import { useAuth } from '@/context/AuthContext';
import { Vote, CheckCircle } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { castVote } = useVote();
  const { currentUser } = useAuth();
  
  const handleVote = () => {
    castVote(candidate.id);
  };
  
  return (
    <Card className="h-full border border-vote-purple-light hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-vote-blue-lighter">
          <img 
            src={candidate.photo} 
            alt={candidate.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-center text-xl text-vote-purple-dark">{candidate.name}</CardTitle>
        <CardDescription className="text-center font-medium">{candidate.party}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{candidate.manifesto}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-center">
        {currentUser?.hasVoted ? (
          <div className="text-gray-500 flex items-center gap-2">
            <CheckCircle size={16} className="text-gray-400" />
            <span>Vote already cast</span>
          </div>
        ) : (
          <Button 
            onClick={handleVote} 
            className="w-full bg-vote-purple hover:bg-vote-purple-dark transition-colors"
          >
            <Vote size={18} className="mr-2" />
            Vote for {candidate.name}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
