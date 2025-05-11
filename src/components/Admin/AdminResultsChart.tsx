
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useVote } from '@/context/VoteContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const AdminResultsChart: React.FC = () => {
  const { currentElection, getTotalVotes } = useVote();
  
  if (!currentElection) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No active election data available.</p>
      </div>
    );
  }
  
  const totalVotes = getTotalVotes();
  
  // Prepare data for charts
  const candidateData = currentElection.candidates.map(candidate => ({
    name: candidate.name,
    votes: candidate.votes,
    percentage: totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0
  }));
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Vote Distribution (Bar Chart)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={candidateData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} votes`, 'Votes']} />
                  <Bar dataKey="votes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Vote Percentage (Pie Chart)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={candidateData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="votes"
                    nameKey="name"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {candidateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} votes`, 'Votes']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Detailed Vote Counts</h3>
          <div className="space-y-4">
            {candidateData.map((candidate, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{candidate.name}</span>
                  <span className="text-sm">
                    {candidate.votes} votes ({candidate.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-vote-purple h-2.5 rounded-full" 
                    style={{ width: `${candidate.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResultsChart;
