import { Link } from 'react-router-dom';
import UserDashboard from '../pages/userDashboard';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/profile" className="block hover:text-indigo-300">Profile</Link>
        <Link to="/settings" className="block hover:text-indigo-300">Setting</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
