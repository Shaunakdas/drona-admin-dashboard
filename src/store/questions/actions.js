export function questionsHasErrored(bool) {
  return {
      type: 'QUESTIONS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function questionsIsLoading(bool) {
  return {
      type: 'QUESTIONS_IS_LOADING',
      isLoading: bool
  };
}
export function questionsFetchDataSuccess(questions) {
  return {
      type: 'QUESTIONS_FETCH_DATA_SUCCESS',
      questions
  };
}
export function questionSelected(questionId) {
  return {
      type: 'QUESTION_SELECTED',
      questionId
  };
}
export function questionCreating(){
  return {
      type: 'QUESTION_CREATING'
  };
}
export function questionsFetchData(gameId) {
  return (dispatch) => {
      dispatch(questionsIsLoading(true));

      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/game/${gameId}/details`, {
        method: 'get',
        headers: {
          'Content-Type':'application/json',
          'Authorization':process.env.REACT_APP_AUTH_TOKEN
        }
       })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(questionsIsLoading(false));

              return response;
          })
          .then((response) => response.json())
          .then((questions) => dispatch(questionsFetchDataSuccess(questions)))
          .catch(() => dispatch(questionsHasErrored(true)));
  };
}
export function questionUpdatePending(bool) {
  return {
      type: 'QUESTION_UPDATE_PENDING',
      bool
  };
}
export function questionUpdateHasErrored(bool) {
  return {
      type: 'QUESTION_UPDATE_HAS_ERRORED',
      hasErrored: bool
  };
}
export function questionUpdateSuccess(question) {
  return {
      type: 'QUESTION_UPDATE_SUCCESS',
      question
  };
}
export function childQuestionUpdateSuccess(question) {
  return {
      type: 'CHILD_QUESTION_UPDATE_SUCCESS',
      question
  };
}
export function questionUpdateCalled(question) {
  return (dispatch) => {
      dispatch(questionUpdatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/update`, {
        method: 'put',
        body: JSON.stringify(question),
        headers: {
          'Content-Type':'application/json',
          'Authorization':process.env.REACT_APP_AUTH_TOKEN
        }
       })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(questionUpdatePending(false));

              return response;
          })
          .then((response) => response.json())
          .then((question) => {
            if(question._has_parent_question){
              dispatch(childQuestionUpdateSuccess(question))
            }else{
              dispatch(questionUpdateSuccess(question))
            }
          })
          .catch(() => dispatch(questionUpdateHasErrored(true)));
  };
}

export function questionCreatePending(bool) {
  return {
      type: 'QUESTION_CREATE_PENDING',
      bool
  };
}
export function questionCreateHasErrored(bool) {
  return {
      type: 'QUESTION_CREATE_HAS_ERRORED',
      hasErrored: bool
  };
}
export function questionCreateSuccess(question) {
  return {
      type: 'QUESTION_CREATE_SUCCESS',
      question
  };
}
export function childQuestionCreateSuccess(question) {
  return {
      type: 'CHILD_QUESTION_CREATE_SUCCESS',
      question
  };
}
export function questionCreateCalled(question, gameId) {
  return (dispatch) => {
      dispatch(questionCreatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/${gameId}/create`, {
        method: 'post',
        body: JSON.stringify(question),
        headers: {
          'Content-Type':'application/json',
          'Authorization':process.env.REACT_APP_AUTH_TOKEN
        }
       })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(questionCreatePending(false));

              return response;
          })
          .then((response) => response.json())
          .then((question) => {
            dispatch(questionCreateSuccess(question));
          })
          .catch(() => dispatch(questionCreateHasErrored(true)));
  };
}
export function optionUpdatePending(bool) {
  return {
      type: 'OPTION_UPDATE_PENDING',
      bool
  };
}
export function optionUpdateHasErrored(bool) {
  return {
      type: 'OPTION_UPDATE_HAS_ERRORED',
      hasErrored: bool
  };
}
export function optionUpdateSuccess(option) {
  return {
      type: 'OPTION_UPDATE_SUCCESS',
      option
  };
}
export function childOptionUpdateSuccess(option) {
  return {
      type: 'CHILD_OPTION_UPDATE_SUCCESS',
      option
  };
}
export function optionUpdateCalled(optionObj) {
  console.log(optionObj)
  const { questionObj, ...option} = optionObj
  return (dispatch) => {
      dispatch(optionUpdatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/update`, {
        method: 'put',
        body: JSON.stringify(option),
        headers: {
          'Content-Type':'application/json',
          'Authorization':process.env.REACT_APP_AUTH_TOKEN
        }
       })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(optionUpdatePending(false));

              return response;
          })
          .then((response) => response.json())
          .then((option) => {
            if( questionObj._has_parent_question){
              dispatch(childOptionUpdateSuccess(option));
            }else{
              dispatch(optionUpdateSuccess(optionObj));
            }
            
          })
          .catch(() => dispatch(optionUpdateHasErrored(true)));
  };
}