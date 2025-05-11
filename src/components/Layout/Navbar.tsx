
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut, User, Vote } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <header className="bg-vote-purple-dark shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Vote size={24} className="text-white" />
          <span className="font-bold text-xl text-white">VoteSecure</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-white">
                <User size={18} />
                <span>
                  {currentUser?.username} ({currentUser?.role})
                </span>
              </div>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-vote-purple-dark"
                onClick={logout}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-white text-vote-purple-dark hover:bg-gray-100">
                <LogIn size={18} className="mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
