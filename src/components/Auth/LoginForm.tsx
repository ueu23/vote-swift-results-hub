
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      
      if (success) {
        navigate('/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-vote-blue-lighter">
      <Card className="w-full max-w-md shadow-lg border-vote-purple-light">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-vote-purple">Voting System Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the voting system
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-vote-purple-light focus:border-vote-purple focus:ring-vote-purple"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-vote-purple-light focus:border-vote-purple focus:ring-vote-purple"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Sample logins:</p>
              <p>Admin: username: "admin" / password: "admin123"</p>
              <p>Voter: username: "voter1" / password: "voter123"</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-vote-purple hover:bg-vote-purple-dark transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Login
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
