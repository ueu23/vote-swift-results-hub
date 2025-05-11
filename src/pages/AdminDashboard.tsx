
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Layout/Navbar';
import CandidateManager from '@/components/Admin/CandidateManager';
import VoterAnalytics from '@/components/Admin/VoterAnalytics';
import AdminResultsChart from '@/components/Admin/AdminResultsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, BarChart, Vote } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-vote-purple">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, Admin {currentUser?.username}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Vote className="text-vote-purple" size={20} />
                <span>Total Votes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">10</p>
              <p className="text-sm text-gray-500">
                Votes cast in current election
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="text-vote-blue" size={20} />
                <span>Total Voters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-500">
                Registered voters in system
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="text-vote-purple-dark" size={20} />
                <span>Voted</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-500">
                Voters who have cast their vote
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="text-vote-purple-light" size={20} />
                <span>Election Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Active</p>
              <p className="text-sm text-gray-500">
                Current election is in progress
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="analytics">Voter Analytics</TabsTrigger>
            <TabsTrigger value="results">Election Results</TabsTrigger>
            <TabsTrigger value="candidates">Manage Candidates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-bold text-vote-purple">Voter Analytics</h2>
            <VoterAnalytics />
          </TabsContent>
          
          <TabsContent value="results">
            <h2 className="text-2xl font-bold mb-4 text-vote-purple">Detailed Results</h2>
            <AdminResultsChart />
          </TabsContent>
          
          <TabsContent value="candidates">
            <h2 className="text-2xl font-bold mb-4 text-vote-purple">Manage Candidates</h2>
            <CandidateManager />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} VoteSecure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
