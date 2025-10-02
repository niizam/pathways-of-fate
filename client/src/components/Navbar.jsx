import { Link } from 'react-router-dom';
import { useAuthStore } from '../utils/store';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-dark border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary">
              Pathways of Fate
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-primary transition">Dashboard</Link>
              <Link to="/characters" className="hover:text-primary transition">Characters</Link>
              <Link to="/gacha" className="hover:text-primary transition">Gacha</Link>
              <Link to="/battle" className="hover:text-primary transition">Battle</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{user?.username}</span>
            <button
              onClick={logout}
              className="text-sm hover:text-red-400 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
