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
export function questionSelected(question) {
  return {
      type: 'QUESTION_SELECTED',
      question
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