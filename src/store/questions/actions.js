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
          .then((question) => dispatch(questionUpdateSuccess(question)))
          .catch(() => dispatch(questionUpdateHasErrored(true)));
  };
}