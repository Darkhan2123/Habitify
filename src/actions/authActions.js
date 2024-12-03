import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/users?email=${email}&password=${password}`
    );
    const user = response.data[0];
    if (user) {
      const token = 'mockToken123';
      localStorage.setItem('Mytoken', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('Mytoken');
  dispatch({ type: 'LOGOUT' });
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
    const { user } = getState().auth;
    const updatedUser = { ...user, ...settings };

    await axios.put(`http://localhost:8000/users/${user.id}`, updatedUser);

    dispatch({ type: 'UPDATE_USER_SETTINGS', payload: updatedUser });
  };
