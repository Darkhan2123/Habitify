import React, { useState, useEffect, useCallback } from 'react';
import HabitCard from '../components/HabitCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits, addHabit, updateHabit, deleteHabit } from '../actions/habitActions';

function AllHabitsPage() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);

  const [isModalOpen, setModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  useEffect(() => {
    console.log('Habits:', habits);
  }, [habits]);

  const addNewHabit = useCallback(() => {
    if (newHabit.trim()) {
      const habit = {
        name: newHabit,
        streak: 0,
        completed: false,
      };
      dispatch(addHabit(habit));
      setNewHabit('');
      setModalOpen(false);
    }
  }, [newHabit, dispatch]);

  const toggleHabitCompletion = useCallback(
    (habit) => {
      console.log('Toggling habit:', habit);
      const updatedHabit = {
        ...habit,
        completed: !habit.completed,
        streak: habit.completed ? habit.streak - 1 : habit.streak + 1,
      };
      dispatch(updateHabit(updatedHabit));
    },
    [dispatch]
  );

  const deleteHabitHandler = useCallback(
    (id) => {
      console.log('Deleting habit with id:', id);
      dispatch(deleteHabit(id));
    },
    [dispatch]
  );

  const editHabit = useCallback(() => {
    console.log('Editing habit:', selectedHabit);
    dispatch(updateHabit(selectedHabit));
    setSelectedHabit(null);
    setModalOpen(false);
  }, [dispatch, selectedHabit]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Habits</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleCompletion={toggleHabitCompletion}
            onDelete={deleteHabitHandler}
            onEdit={() => {
              setSelectedHabit(habit);
              setModalOpen(true);
            }}
          />
        ))}
      </div>
      {/* Add Habit Button */}
      <button
        onClick={() => {
          setSelectedHabit(null); // Reset editing state
          setModalOpen(true);
        }}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        {/* ... SVG icon */}
        Add New Habit
      </button>

      {/* Modal for Adding/Editing Habit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {selectedHabit ? 'Edit Habit' : 'Add New Habit'}
            </h2>
            <input
              type="text"
              value={selectedHabit ? selectedHabit.name : newHabit}
              onChange={(e) =>
                selectedHabit
                  ? setSelectedHabit({ ...selectedHabit, name: e.target.value })
                  : setNewHabit(e.target.value)
              }
              placeholder="Enter habit name"
              className="w-full px-3 py-2 border rounded-lg mb-4 bg-gray-100"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => (selectedHabit ? editHabit() : addNewHabit())}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {selectedHabit ? 'Save Changes' : 'Add Habit'}
              </button>
              <button
                onClick={() => {
                  setSelectedHabit(null);
                  setModalOpen(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllHabitsPage;
