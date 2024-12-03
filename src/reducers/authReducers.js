const initialState = {
    isAuthenticated: !!localStorage.getItem('Mytoken'),
    user: null,
    token: localStorage.getItem('Mytoken') || null,
  };

  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          user: null,
          token: null,
        };
        case 'UPDATE_USER_SETTINGS':
            return {
                ...state,
                user: action.payload,
            };

      default:
        return state;
    }
  }
