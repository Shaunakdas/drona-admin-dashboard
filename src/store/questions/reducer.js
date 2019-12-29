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
        return { ...state, isLoading: false, errorMessage: 'Error in Response' };
    case 'QUESTIONS_HAS_ERRORED': 
        return { ...state, errorMessage: '' };
    case 'QUESTION_SELECTED':
        return { ...state, openForEditing: true, openForCreating: false, selectedId: action.questionId };
    case 'QUESTION_CREATING':
        return { ...state, openForEditing: false, openForCreating: true, selectedId: action.questionId };
    case 'QUESTION_UPDATE_PENDING': 
        return { ...state, isQuestionUpdatePending: true };
    case 'QUESTION_CREATE_SUCCESS':
        return { 
            ...state,
            isQuestionUpdatePending: false,
            questions: state.questions.concat(action.question),
            selectedId: action.question.id,
            openForEditing: true,
            openForCreating: false
            };
    
    case 'QUESTION_UPDATE_SUCCESS':
        return { 
            ...state,
            isQuestionUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? action.question : question
            )
            };
    case 'CHILD_QUESTION_UPDATE_SUCCESS':
        const selectedQuestion = state.questions.find(x => x.id === state.selectedId)
        const blocks = selectedQuestion.blocks.map(
            block => block.id === action.question.id ? action.question : block
        )
        // Now creating the whole state with blocks variable
        const actionQuestion = {
            ...selectedQuestion,
            blocks
        }
        return { 
            ...state,
            isQuestionUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? actionQuestion : question
            )
            };
    case 'QUESTION_UPDATE_HAS_ERRORED': 
        return { ...state, isQuestionUpdatePending: false, errorMessage: 'Error in Response' };
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
    
    case 'CHILD_OPTION_UPDATE_SUCCESS':
        const selectedParentQuestion = state.questions.find(x => x.id === state.selectedId)
        const parentBlocks = selectedParentQuestion.blocks.map(
            block => block.id === action.option.questionObj.id ? 
            {
                ...block,
                options: block.options.map(
                    option => option.id === action.option.id ? action.option : option
                )
            } : block
        )
        // Now creating the whole state with blocks variable
        const actionParentQuestion = {
            ...selectedParentQuestion,
            blocks: parentBlocks
        }
        return { 
            ...state,
            isOptionUpdatePending: false, 
            questions: state.questions.map(
                question => question.id === state.selectedId ? actionParentQuestion : question
            )
        };
    case 'OPTION_UPDATE_HAS_ERRORED': 
        return { ...state, isOptionUpdatePending: false, errorMessage: 'Error in Response' };
    case 'QUESTION_UPDATE_VALIDATION_ERRORED': 
        return { ...state, errorMessage: action.error };    
    default:
        return state;
  }
}