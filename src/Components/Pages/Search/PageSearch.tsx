import React, { FunctionComponent, useContext, useCallback } from 'react';
import YouTubeSearch from 'Components/Atoms/YouTubeSearch';
import { AppContext, Actions } from 'Store'

import { getYouTubeSearchResults } from 'utils'

const PageSearch: FunctionComponent = () => {
  const {
    dispatch,
  } = useContext(AppContext)
  const fetchYoutube = useCallback(async value => {
    dispatch(Actions.showLoader('Searching videos'))

    try {
      const videoSearch = await getYouTubeSearchResults(value)
      dispatch(Actions.fetchVideos({ list: videoSearch, fetched: true }))
    } catch (e) {
      dispatch(Actions.setErrorPage(e.message))
    } finally {
      dispatch(Actions.hideLoader())
    }
  }, [dispatch])
  return (
    <section>
      <YouTubeSearch onClickSearch={fetchYoutube} />
    </section>
  )
}

export default PageSearch
