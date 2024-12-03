import React, { useState, useCallback } from 'react';

export default function HabitCard({ habit, onToggleCompletion, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    setMenuOpen(false);
    onEdit(habit);
  }, [habit, onEdit]);

  const handleDelete = useCallback(() => {
    setMenuOpen(false);
    onDelete(habit.id);
  }, [habit.id, onDelete]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{habit.name}</h2>
        <span className="text-sm text-gray-500">Streak: {habit.streak} days</span>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => onToggleCompletion(habit)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            habit.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {habit.completed ? 'Completed' : 'Mark as Done'}
        </button>
        {/* Three Dots Menu */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700"
          >
            {/* Three Dots Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-1 z-50"
            >
              <button
                onClick={handleEdit}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full flex items-center gap-2"
              >
                {/* Edit Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full flex items-center gap-2"
              >
                {/* Delete Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
