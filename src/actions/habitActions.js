import axios from 'axios';

export const fetchHabits = () => async (dispatch) => {
  const response = await axios.get('http://localhost:8000/habits');
  dispatch({ type: 'SET_HABITS', payload: response.data });
};

export const addHabit = (habit) => async (dispatch) => {
  const response = await axios.post('http://localhost:8000/habits', habit);
  console.log('Added habit:', response.data);
  dispatch({ type: 'ADD_HABIT', payload: response.data });
};

export const updateHabit = (habit) => async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:8000/habits/${habit.id}`, habit);
      dispatch({ type: 'UPDATE_HABIT', payload: response.data });
    } catch (error) {
      console.error('Error updating habit:', error);
      alert('Failed to update habit. Please try again.');
    }
  };

  export const deleteHabit = (id) => async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8000/habits/${id}`);
      dispatch({ type: 'DELETE_HABIT', payload: id });
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit. Please try again.');
    }
  };
