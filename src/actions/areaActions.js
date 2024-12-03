// src/actions/areaActions.js
import axios from 'axios';

export const fetchAreas = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/areas');
    dispatch({ type: 'FETCH_AREAS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching areas:', error);
    // Handle error accordingly
  }
};

