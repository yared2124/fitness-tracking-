import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Dumbbell,
  LogOut,
  User,
  BarChart3,
  Calendar,
  Home,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600">
            <Dumbbell className="w-6 h-6" />
            <span className="font-bold text-xl">FitnessTrack</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              icon={<Home className="w-4 h-4" />}
              text="Dashboard"
            />
            <NavLink
              to="/workouts"
              icon={<Calendar className="w-4 h-4" />}
              text="Workouts"
            />
            <NavLink
              to="/workouts/new"
              icon={<Dumbbell className="w-4 h-4" />}
              text="Log"
            />
            <NavLink
              to="/progress"
              icon={<BarChart3 className="w-4 h-4" />}
              text="Progress"
            />
            <NavLink
              to="/profile"
              icon={<User className="w-4 h-4" />}
              text="Profile"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
