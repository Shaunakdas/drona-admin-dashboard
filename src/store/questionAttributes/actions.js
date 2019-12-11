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
export function questionUpdateSuccess(questions) {
  return {
      type: 'QUESTION_UPDATE_SUCCESS',
      questions
  };
}
export function questionAttributeUpdateCalled(questionAttributes) {
  return (dispatch) => {
      dispatch(questionUpdatePending(true));
      console.log(questionAttributes);  
      fetch(`http://localhost:3000/api/v1/question/update`, {
        method: 'put',
        body: JSON.stringify(questionAttributes),
        headers: {
          'Content-Type':'application/json',
          'Authorization':'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.sQctDMF9Cc5BmIbBhSAcOZ3Oxf2POFY-HcKxYlnbspM'
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