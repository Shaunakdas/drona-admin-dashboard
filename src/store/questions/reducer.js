const initialState = { 
    questions: [],
    isQuestionUpdatePending: false,
    isLoading: false,
    openForEditing: false,
    openForCreating: false
};
export function questions(state = initialState, action) {
  switch (action.type) {
    case 'QUESTIONS_IS_LOADING': 
        return { ...state, isLoading: true };
    case 'QUESTIONS_FETCH_DATA_SUCCESS':
        return { ...state, isLoading: false, questions: action.questions.game_holder_detail.question_input.sections };
    case 'QUESTIONS_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    case 'QUESTION_SELECTED':
        return { ...state, openForEditing: true, openForCreating: false, selectedId: action.questionId };
    case 'QUESTION_CREATING':
        return { ...state, openForEditing: false, openForCreating: true, selectedId: action.questionId };
    case 'QUESTION_UPDATE_PENDING': 
        return { ...state, isQuestionUpdatePending: true };
    case 'QUESTION_UPDATE_SUCCESS':
        return { 
            ...state,
            isQuestionUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? action.question : question
            )
            };
    case 'QUESTION_UPDATE_HAS_ERRORED': 
        return { ...state, isQuestionUpdatePending: false, errorMessage: 'action.payload.message' };
    case 'OPTION_UPDATE_PENDING': 
        return { ...state, isOptionUpdatePending: true };
    case 'OPTION_UPDATE_SUCCESS':
        return { 
            ...state,
            isOptionUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? 
                    {
                        ...question,
                        options: question.options.map(
                            option => option.id === action.option.id ? action.option : option
                        )
                    } : question
            )
            };
    case 'OPTION_UPDATE_HAS_ERRORED': 
        return { ...state, isOptionUpdatePending: false, errorMessage: 'action.payload.message' };
        
    default:
        return state;
  }
}