
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Vote, BarChart, Shield, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-vote-blue-lighter">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-vote-purple to-vote-purple-dark text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <Vote size={60} className="mx-auto mb-6 animate-vote-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">VoteSecure Online Voting System</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A secure, transparent and easy-to-use platform for conducting elections
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-white text-vote-purple hover:bg-gray-100">
                <Vote size={20} className="mr-2" />
                Login to Vote
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-vote-purple">
                <Shield size={20} className="mr-2" />
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-vote-purple">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="mx-auto mb-4 text-vote-purple" size={40} />
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              Role-based access control with secure authentication mechanisms to protect the integrity of the voting process.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto mb-4 text-vote-blue" size={40} />
            <h3 className="text-xl font-semibold mb-2">Candidate Management</h3>
            <p className="text-gray-600">
              Comprehensive candidate profiles with detailed information to help voters make informed decisions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BarChart className="mx-auto mb-4 text-vote-purple-dark" size={40} />
            <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
            <p className="text-gray-600">
              Live tracking of election results with visual charts and detailed breakdown of voting statistics.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-vote-purple">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-vote-purple-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-vote-purple font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">Login</h3>
              <p className="text-gray-600">Sign in using your secure credentials</p>
            </div>
            <div className="text-center">
              <div className="bg-vote-purple-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-vote-purple font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">Review Candidates</h3>
              <p className="text-gray-600">Browse through candidate profiles</p>
            </div>
            <div className="text-center">
              <div className="bg-vote-purple-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-vote-purple font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">Cast Your Vote</h3>
              <p className="text-gray-600">Select your preferred candidate</p>
            </div>
            <div className="text-center">
              <div className="bg-vote-purple-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-vote-purple font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2">View Results</h3>
              <p className="text-gray-600">Track election results in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-vote-purple text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to participate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our secure voting platform to make your voice heard
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-white text-vote-purple hover:bg-gray-100">
                Login to Vote
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-vote-purple">
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} VoteSecure. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            A secure online voting system developed with React and TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
