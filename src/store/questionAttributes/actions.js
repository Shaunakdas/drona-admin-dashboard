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
export function questionUpdateSuccess(questionAttributes) {
  return {
      type: 'QUESTION_UPDATE_SUCCESS',
      questionAttributes
  };
}
export function questionAttributeUpdateCalled(questionAttributes) {
  return (dispatch) => {
      dispatch(questionUpdatePending(true));
      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/question/update`, {
        method: 'put',
        body: JSON.stringify(questionAttributes),
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
          .then((questionAttributes) => dispatch(questionUpdateSuccess(questionAttributes)))
          .catch(() => dispatch(questionUpdateHasErrored(true)));
  };
}