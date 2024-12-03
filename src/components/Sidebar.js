import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'All Habits', path: '/all-habits' },
    { name: 'Habit Analytics', path: '/habit-analytics' },
    { name: 'New Area', path: '/new-area' },
    { name: 'Settings', path: '/app-settings' },
  ];

  return (
    <div className="flex h-screen w-[240px] flex-col border-r bg-white">
      <div className="flex items-center gap-3 p-4">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
          DA
        </div>
        <span className="text-sm text-gray-500 font-bold">Aukenov Darkhan</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <button
                className={`w-full px-3 py-2 text-left text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } rounded-md`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
