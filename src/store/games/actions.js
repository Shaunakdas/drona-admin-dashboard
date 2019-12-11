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

      fetch(`http://localhost:3000/api/v1/games?chapter_id=${chapterId}`, {
        method: 'get',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.sQctDMF9Cc5BmIbBhSAcOZ3Oxf2POFY-HcKxYlnbspM'
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