
import React from 'react';
import { useVote } from '@/context/VoteContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Bar, Cell, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#9b87f5', '#1EAEDB', '#7E69AB', '#33C3F0', '#E5DEFF', '#D3E4FD'];

const ResultsChart: React.FC = () => {
  const { currentElection, getTotalVotes } = useVote();
  const totalVotes = getTotalVotes();
  
  if (!currentElection) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Election Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No active election data available.</p>
        </CardContent>
      </Card>
    );
  }
  
  const data = currentElection.candidates.map((candidate, index) => ({
    name: candidate.name,
    votes: candidate.votes,
    percentage: totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0,
    fill: COLORS[index % COLORS.length]
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-vote-purple">Election Results</CardTitle>
        <p className="text-center text-gray-500">Total votes: {totalVotes}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} votes`, 'Votes']} />
                <Legend />
                <Bar dataKey="votes" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="votes"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} votes (${data.find(d => d.votes === value)?.percentage}%)`, 'Votes']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-medium text-center mb-2">Results Breakdown</h3>
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-medium">{item.votes} votes ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.fill
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
