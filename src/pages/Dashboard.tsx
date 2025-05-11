
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Layout/Navbar';
import CandidateList from '@/components/Voting/CandidateList';
import ResultsChart from '@/components/Voting/ResultsChart';
import CandidateManager from '@/components/Admin/CandidateManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, BarChart, Users } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-vote-purple">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {currentUser?.username}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Vote className="text-vote-purple" size={20} />
                <span>Vote Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {currentUser?.hasVoted ? "Vote Cast" : "Not Voted Yet"}
              </p>
              <p className="text-sm text-gray-500">
                {currentUser?.hasVoted 
                  ? "Thank you for participating in this election" 
                  : "You can still cast your vote in the current election"
                }
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="text-vote-blue" size={20} />
                <span>Election Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-gray-500">
                Results are updated in real-time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="text-vote-purple-dark" size={20} />
                <span>My Role</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold capitalize">
                {currentUser?.role}
              </p>
              <p className="text-sm text-gray-500">
                {isAdmin 
                  ? "You have full administrative privileges" 
                  : "You can view candidates and cast your vote"
                }
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-vote-purple">Cast Your Vote</h2>
              <CandidateList />
            </div>
            
            {isAdmin && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-vote-purple">Admin Actions</h2>
                <CandidateManager />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-vote-purple">Election Results</h2>
            <ResultsChart />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} VoteSecure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
