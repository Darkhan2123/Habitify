const initialState = {
    habits: [],
  };

  export default function habitsReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_HABITS':
        return {
          ...state,
          habits: action.payload,
        };
      case 'ADD_HABIT':
        return {
          ...state,
          habits: [...state.habits, action.payload],
        };
      case 'UPDATE_HABIT':
        return {
          ...state,
          habits: state.habits.map((habit) =>
            habit.id === action.payload.id ? action.payload : habit
          ),
        };
      case 'DELETE_HABIT':
        return {
          ...state,
          habits: state.habits.filter((habit) => habit.id !== action.payload),
        };
      default:
        return state;
    }
  }
