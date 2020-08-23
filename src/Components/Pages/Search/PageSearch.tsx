import React, { FunctionComponent, useContext, useCallback } from 'react';
import YouTubeSearch from 'Components/Atoms/YouTubeSearch';
import { AppContext, Actions } from 'Store'

import { getYouTubeSearchResults } from 'utils'
import SearchResult from 'Components/Molecules/SearchResult';

const PageSearch: FunctionComponent = () => {
  const {
    state: { searchResult },
    dispatch,
  } = useContext(AppContext)
  const fetchYoutube = useCallback(async value => {
    dispatch(Actions.showLoader('Searching videos'))

    try {
      const videoSearch = await getYouTubeSearchResults(value)
      dispatch(Actions.searchResolved(videoSearch))
    } catch (e) {
      console.error(e.message)
    } finally {
      dispatch(Actions.hideLoader())
    }
  }, [dispatch])
  const searchClearHandler = useCallback(() => dispatch(Actions.searchClear()), [dispatch])
  return (
    <section>
      <YouTubeSearch onClickSearch={fetchYoutube} />
      <button
        type="button"
        onClick={searchClearHandler}
      >
        Clear Search
      </button>
      {searchResult.length > 0 && <SearchResult />}
    </section>
  )
}

export default PageSearch
