// src/reducers/areaReducer.js
const initialState = {
    areas: [],
  };

  const areaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_AREAS_SUCCESS':
        return {
          ...state,
          areas: action.payload,
        };
      default:
        return state;
    }
  };

  export default areaReducer;
