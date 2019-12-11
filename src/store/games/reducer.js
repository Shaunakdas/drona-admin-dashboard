const initialState = { game_holders: [] };
export function games(state = initialState, action) {
  switch (action.type) {
    case 'GAMES_IS_LOADING': 
        return { ...state, isLoading: true };
    case 'GAMES_FETCH_DATA_SUCCESS': 
        return { ...state, isLoading: false, games: action.games.game_holders };
    case 'GAMES_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    case 'GAME_SELECTED': 
        return { ...state, selected: action.game };
    default:
        return state;
  }
}