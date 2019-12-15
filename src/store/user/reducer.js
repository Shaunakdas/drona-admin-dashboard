const initialState = { user: {}, authToken: "", errorMsg: "", loggedIn: false };
export function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_IN_PROGRESS': 
        return { ...state, isLoading: action.bool };
    case 'LOGIN_SUCCESS':
        return { ...state, isLoading: false, errorMsg: '',user: action.user.user, authToken: action.user.auth_token, loggedIn: true };
    case 'STORE_TOKEN':
        return { ...state, isLoading: false, errorMsg: '',authToken: action.authToken, loggedIn: true };
    case 'LOGIN_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMsg: action.errorMsg };
    default:
        return state;
  }
}