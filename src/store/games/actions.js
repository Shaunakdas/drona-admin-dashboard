export function gamesHasErrored(bool) {
  return {
      type: 'GAMES_HAS_ERRORED',
      hasErrored: bool
  };
}
export function gamesIsLoading(bool) {
  return {
      type: 'GAMES_IS_LOADING',
      isLoading: bool
  };
}
export function gamesFetchDataSuccess(games) {
  return {
      type: 'GAMES_FETCH_DATA_SUCCESS',
      games
  };
}
export function gameSelected(game) {
  return {
      type: 'GAME_SELECTED',
      game
  };
}
export function gamesFetchData(chapterId) {
  return (dispatch) => {
      dispatch(gamesIsLoading(true));

      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/games?chapter_id=${chapterId}`, {
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

              dispatch(gamesIsLoading(false));

              return response;
          })
          .then((response) => response.json())
          .then((games) => dispatch(gamesFetchDataSuccess(games)))
          .catch(() => dispatch(gamesHasErrored(true)));
  };
}