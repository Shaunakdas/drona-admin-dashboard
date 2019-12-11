const initialState = { chapters: [] };
export function chapters(state = initialState, action) {
  switch (action.type) {
    case 'CHAPTERS_IS_LOADING': 
        return { ...state, isLoading: true };
    case 'CHAPTERS_FETCH_DATA_SUCCESS': 
        return { ...state, isLoading: false, chapters: action.chapters.chapters };
    case 'CHAPTERS_HAS_ERRORED': 
        return { ...state, isLoading: false, errorMessage: 'action.payload.message' };
    case 'CHAPTER_SELECTED': 
        return { ...state, selected: action.chapter };
    default:
        return state;
  }
}