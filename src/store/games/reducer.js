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
    case 'GAME_QUESTION_STRUCTURE_IS_LOADING': 
        return { ...state, isQuestionStructureLoading: true };
    case 'GAME_FETCH_QUESTION_STRUCTURE_DATA_SUCCESS': 
        return { ...state, isQuestionStructureLoading: false, questionStructure: action.questionStructure };
    case 'GAME_QUESTION_STRUCTURE_HAS_ERRORED': 
        return { ...state, isQuestionStructureLoading: false, errorMessage: 'action.payload.message' };
    default:
        return state;
  }
}