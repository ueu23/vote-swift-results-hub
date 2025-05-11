
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useVote } from '@/context/VoteContext';
import { users } from '@/data/mockData';
import { Progress } from "@/components/ui/progress";

const VoterAnalytics: React.FC = () => {
  const { currentElection } = useVote();
  
  if (!currentElection) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No active election data available.</p>
      </div>
    );
  }
  
  // Calculate who voted for whom based on mock data
  // In a real app, this would come from a database
  const voterData = users.map(user => {
    // Only voters appear in this list
    if (user.role !== 'voter') return null;
    
    // If the user has voted, assign a random candidate
    // In a real app, this would be the actual vote cast
    let votedFor = null;
    if (user.hasVoted && currentElection.candidates.length > 0) {
      // For demo purposes, just assign a candidate
      const candidateIndex = parseInt(user.id) % currentElection.candidates.length;
      votedFor = currentElection.candidates[candidateIndex];
    }
    
    return {
      ...user,
      votedFor
    };
  }).filter(Boolean);
  
  // Calculate voting statistics
  const totalVoters = voterData.length;
  const totalVoted = voterData.filter(voter => voter?.hasVoted).length;
  const votingPercentage = totalVoters > 0 ? (totalVoted / totalVoters) * 100 : 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Voter Participation</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {totalVoted} out of {totalVoters} voters ({Math.round(votingPercentage)}%)
            </span>
            <span className="text-sm font-medium">
              {Math.round(votingPercentage)}%
            </span>
          </div>
          <Progress value={votingPercentage} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Voter Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voter ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Voted For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voterData.map((voter) => (
                <TableRow key={voter?.id}>
                  <TableCell className="font-medium">{voter?.id}</TableCell>
                  <TableCell>{voter?.username}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${voter?.hasVoted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {voter?.hasVoted ? 'Voted' : 'Not Voted'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {voter?.votedFor ? voter.votedFor.name : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoterAnalytics;
