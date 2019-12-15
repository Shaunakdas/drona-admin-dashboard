export function loginHasErrored(errorMsg) {
  return {
      type: 'LOGIN_HAS_ERRORED',
      errorMsg
  };
}
export function loginInProgress(bool) {
  return {
      type: 'LOGIN_IN_PROGRESS',
      isLoading: bool
  };
}
export function loginSuccess(user) {
  return {
      type: 'LOGIN_SUCCESS',
      user
  };
}
export function performLogin({email,password, cookies}) {
  return (dispatch) => {
      dispatch(loginInProgress(true));

      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/login/email`, {
        method: 'post',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type':'application/json'
        }
       })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(loginInProgress(false));

              return response;
          })
          .then((response) => response.json())
          .then((user) => {
            if (user.error) {
              dispatch(loginHasErrored(user.error));
            }else{
              cookies.set('AuthToken', user.auth_token, { path: '/', domain: 'docgenius.in' });
              dispatch(loginSuccess(user))
              }
            })
          .catch((errorMsg) => dispatch(loginHasErrored(errorMsg)));
  };
}