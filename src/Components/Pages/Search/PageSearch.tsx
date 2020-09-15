import React, {
  FunctionComponent, useContext, useCallback, useMemo,
} from 'react';
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
  const playlistClearHandler = useCallback(() => {
    dispatch(Actions.videoClearPlaylist())
    localStorage.removeItem('playList')
  }, [dispatch])
  const playlistRemoveItemHandler = useCallback(
    (videoId: string) => dispatch(Actions.videoRemoveItemPlaylist(videoId)),
    [dispatch],
  )
  const setVideoPlayLisHandler = useCallback((videoId: string) => {
    dispatch(Actions.videoSelected(videoId))
    dispatch(Actions.videoReadyPlaylist([videoId]))
    dispatch(Actions.videoSetPlaylist())
  }, [dispatch])
  const hasPlaylist = useMemo(() => Object.keys(playlist).length > 0, [playlist])
  const hasSearchResults = useMemo(() => Object.keys(searchResult).length > 0, [searchResult])

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
      {hasPlaylist && (
        <Playlist
          removeItemHandler={playlistRemoveItemHandler}
        />
      )}
      <YouTubeSearch
        onClickSearch={fetchYoutube}
        hasPlaylist={hasPlaylist}
        hasSearchResults={hasSearchResults}
        searchClearHandler={searchClearHandler}
        playlistClearHandler={playlistClearHandler}
      />
      {hasSearchResults && (
      <SearchResult
        searchResult={searchResult}
        setVideoPlayLis={setVideoPlayLisHandler}
      />
      )}
    </section>
  )
}

export default PageSearch
