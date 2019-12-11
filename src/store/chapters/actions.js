export function chaptersHasErrored(bool) {
  return {
      type: 'CHAPTERS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function chaptersIsLoading(bool) {
  return {
      type: 'CHAPTERS_IS_LOADING',
      isLoading: bool
  };
}
export function chaptersFetchDataSuccess(chapters) {
  return {
      type: 'CHAPTERS_FETCH_DATA_SUCCESS',
      chapters
  };
}
export function chapterSelected(chapter) {
  return {
      type: 'CHAPTER_SELECTED',
      chapter
  };
}
export function chaptersFetchData(standardId) {
  return (dispatch) => {
      dispatch(chaptersIsLoading(true));

      fetch(`${process.env.REACT_APP_DRONA_BACKEND}/api/v1/chapters?standard_id=${standardId}`, {
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

              dispatch(chaptersIsLoading(false));

              return response;
          })
          .then((response) => response.json())
          .then((chapters) => dispatch(chaptersFetchDataSuccess(chapters)))
          .catch(() => dispatch(chaptersHasErrored(true)));
  };
}