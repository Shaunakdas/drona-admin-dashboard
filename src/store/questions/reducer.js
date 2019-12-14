const initialState = { questions: [], isUpdatePending: false };
export function questions(state = initialState, action) {
  switch (action.type) {
    case 'QUESTIONS_IS_LOADING': 
        return { ...state, isLoading: true };
    case 'QUESTIONS_FETCH_DATA_SUCCESS':
        return { ...state, isLoading: false, questions: action.questions.game_holder_detail.question_input.sections };
    case 'QUESTIONS_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    case 'QUESTION_SELECTED': 
        return { ...state, selectedId: action.questionId };
    case 'QUESTION_UPDATE_PENDING': 
        return { ...state, isUpdatePending: true };
    case 'QUESTION_UPDATE_SUCCESS':
        return { 
            ...state,
            isUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? action.question : question
            )
         };
    case 'QUESTION_UPDATE_HAS_ERRORED': 
        return { ...state, isUpdatePending: false, errorMessage: 'action.payload.message' };
    
    default:
        return state;
  }
}