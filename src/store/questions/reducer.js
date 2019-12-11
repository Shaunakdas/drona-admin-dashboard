const initialState = { questions: [] };
export function questions(state = initialState, action) {
  switch (action.type) {
    case 'QUESTIONS_IS_LOADING': 
        return { ...state, isLoading: true };
    case 'QUESTIONS_FETCH_DATA_SUCCESS':
        return { ...state, isLoading: false, questions: action.questions.game_holder_detail.question_input.sections };
    case 'QUESTIONS_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    case 'QUESTION_SELECTED': 
        return { ...state, selected: action.question };
    default:
        return state;
  }
}