import React, { FunctionComponent, useContext, useCallback } from 'react';
import YouTubeSearch from 'Components/Atoms/YouTubeSearch';
import { AppContext, Actions } from 'Store'

import { getYouTubeSearchResults } from 'utils'
import SearchResult from 'Components/Molecules/SearchResult';
import Playlist from 'Components/Molecules/Playlist';

const PageSearch: FunctionComponent = () => {
  const {
    state: { searchResult, playlist },
    dispatch,
  } = useContext(AppContext)

  const searchClearHandler = useCallback(() => dispatch(Actions.searchClear()), [dispatch])
  const playlistClearHandler = useCallback(() => dispatch(Actions.videoClearPlaylist()), [dispatch])
  const playlistRemoveItemHandler = useCallback(
    (videoId: string) => dispatch(Actions.videoRemoveItemPlaylist(videoId)),
    [dispatch],
  )

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

  return (
    <section>
      {Object.keys(playlist).length > 0 && (
        <Playlist
          clearHandler={playlistClearHandler}
          removeItemHandler={playlistRemoveItemHandler}
        />
      )}
      <YouTubeSearch onClickSearch={fetchYoutube} />
      <button
        type="button"
        onClick={searchClearHandler}
      >
        Clear Search
      </button>
      {Object.keys(searchResult).length > 0 && <SearchResult />}
    </section>
  )
}

export default PageSearch
