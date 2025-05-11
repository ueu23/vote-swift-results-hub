
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLoginForm = () => {
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
        navigate('/admin-dashboard');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-vote-purple-light">
      <Card className="w-full max-w-md shadow-lg border-vote-purple">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <Shield size={48} className="text-vote-purple" />
          </div>
          <CardTitle className="text-3xl font-bold text-vote-purple">Admin Login</CardTitle>
          <CardDescription>
            Secure access for election administrators only
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter admin username"
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
              <p>Admin login: username: "admin" / password: "admin123"</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
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
                  Admin Login
                </span>
              )}
            </Button>
            <div className="text-center text-sm">
              <Link to="/login" className="text-vote-purple hover:underline">
                Login as Voter
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
