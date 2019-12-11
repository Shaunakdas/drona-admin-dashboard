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

      fetch(`http://localhost:3000/api/v1/chapters?standard_id=${standardId}`, {
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

              dispatch(chaptersIsLoading(false));

              return response;
          })
          .then((response) => response.json())
          .then((chapters) => dispatch(chaptersFetchDataSuccess(chapters)))
          .catch(() => dispatch(chaptersHasErrored(true)));
  };
}