const initialState = { questions: [] };
export function questionAttributes(state = initialState, action) {
  switch (action.type) {
    case 'QUESTION_UPDATE_PENDING': 
        return { ...state, isLoading: true };
    case 'QUESTION_UPDATE_SUCCESS':
        return { ...state, isLoading: false, questionAttributes: action.questionAttributes };
    case 'QUESTION_UPDATE_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    default:
        return state;
  }
}