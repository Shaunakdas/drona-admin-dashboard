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
export function questionUpdateValidationErrored(error) {
  return {
      type: 'QUESTION_UPDATE_VALIDATION_ERRORED',
      error
  };
}
export function questionUpdateErrorDismissed() {
  return {
      type: 'QUESTION_UPDATE_ERROR_DISMISSED'
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
          .then((questionResp) => {
            if('error' in questionResp){
              questionUpdateValidationErrored(questionResp.error)
            }else{
              if(questionResp._has_parent_question){
                dispatch(childQuestionUpdateSuccess(questionResp))
              }else{
                dispatch(questionUpdateSuccess(questionResp))
              }
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
          .then((questionResp) => {
            if('error' in questionResp){
              dispatch(questionUpdateValidationErrored(questionResp.error))
            }else{
              dispatch(questionCreateSuccess(questionResp));
            }
          })
          .catch(() => dispatch(questionCreateHasErrored(true)));
  };
}
export function childQuestionCreateCalled(parentQuestion, question) {
  return (dispatch) => {
      dispatch(questionCreatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/${parentQuestion.id}/child`, {
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
          .then((questionResp) => {
            if('error' in questionResp){
              dispatch(questionUpdateValidationErrored(questionResp.error))
            }else{
              dispatch(childQuestionCreateSuccess(questionResp));
            }
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
          .then((optionResponse) => {
            if('error' in optionResponse){
              dispatch(questionUpdateValidationErrored(option.error))
            }else{
              const completeOptionObj = { ...optionResponse, questionObj}
              if( questionObj && questionObj._has_parent_question){
                dispatch(childOptionUpdateSuccess(completeOptionObj));
              }else{
                dispatch(optionUpdateSuccess(completeOptionObj));
              }
            }
            
          })
          .catch(() => dispatch(optionUpdateHasErrored(true)));
  };
}
export function optionCreatePending(bool) {
  return {
      type: 'OPTION_CREATE_PENDING',
      isPending: bool
  };
}
export function optionCreateHasErrored(bool) {
  return {
      type: 'OPTION_CREATE_HAS_ERRORED',
      hasErrored: bool
  };
}
export function optionCreateSuccess(question, option) {
  return {
      type: 'OPTION_CREATE_SUCCESS',
      question,
      option
  };
}
export function childOptionCreateSuccess(question, option) {
  return {
      type: 'CHILD_OPTION_CREATE_SUCCESS',
      question,
      option
  };
}
export function optionCreateValidationErrored(error) {
  return {
      type: 'OPTION_CREATE_VALIDATION_ERRORED',
      error
  };
}
export function optionCreateCalled(question, option) {
  return (dispatch) => {
      dispatch(optionCreatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/${question.id}/option`, {
        method: 'post',
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

              dispatch(optionCreatePending(false));

              return response;
          })
          .then((response) => response.json())
          .then((optionResponse) => {
            if('error' in optionResponse){
              dispatch(optionCreateValidationErrored(option.error))
            }else{
              if( question && question._has_parent_question){
                dispatch(childOptionCreateSuccess(question, optionResponse));
              }else{
                dispatch(optionCreateSuccess(question, optionResponse));
              }
            }
            
          })
          .catch(() => dispatch(optionUpdateHasErrored(true)));
  };
}