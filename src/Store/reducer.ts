import { ContextState, Actions, SearchResult } from './store.types'
import {
  gameInitReducer,
  gameResetReducer,
  gameInCreaseReducer,
  // fetchVideosReducer,
  // playVideoReducer,
  videoSelectedReducer,
  showLoaderReducer,
  hideLoaderReducer,
  searchResolvedReducer,
  searchClearReducer,
  videoSetPlaylistReducer,
  videoPlaylistClearReducer,
  videoRemoveItemPlaylistReducer,
  videoReadyPlaylistReducer,
} from './reducerActions'

const reducer = (
  state: ContextState,
  action: Actions,
): ContextState => {
  const { type, payload } = action
  switch (type) {
    case 'game-init':
      return gameInitReducer(state, payload)

    case 'game-reset':
      return gameResetReducer(state)

    case 'game-increase':
      return gameInCreaseReducer(state)

    case 'video-selected':
      return videoSelectedReducer(state, payload as string)

    case 'loader-show':
      return showLoaderReducer(state, payload as string)

    case 'loader-hide':
      return hideLoaderReducer(state)

    case 'search-resolved':
      return searchResolvedReducer(state, payload as SearchResult[])

    case 'search-clear':
      return searchClearReducer(state)

    case 'video-set-playlist':
      return videoSetPlaylistReducer(state)

    case 'video-clear-playlist':
      return videoPlaylistClearReducer(state)

    case 'video-remove-from-playlist':
      return videoRemoveItemPlaylistReducer(state, payload as string)

    case 'video-ready-playlist':
      return videoReadyPlaylistReducer(state, payload as string[])

      // case 'video-fetch-list':
      //   return fetchVideosReducer(state, payload)

      // case 'video-playlist':
      //   return playVideoReducer(state)

      // case 'video-get-player':
      //   return getVideoPlayerReducer(state, payload)

    default:
      return state
  }
}

export default reducer
