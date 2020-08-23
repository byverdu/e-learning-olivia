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
  videoSetPlayListReducer,
  videoPlaylistClearReducer,
  videoRemoveItemPlayListReducer,
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

    case 'video-set-play-list':
      return videoSetPlayListReducer(state)

    case 'video-clear-play-list':
      return videoPlaylistClearReducer(state)

    case 'video-remove-from-play-list':
      return videoRemoveItemPlayListReducer(state, payload as string)

      // case 'video-fetch-list':
      //   return fetchVideosReducer(state, payload)

      // case 'video-play-list':
      //   return playVideoReducer(state)

      // case 'video-get-player':
      //   return getVideoPlayerReducer(state, payload)

    default:
      return state
  }
}

export default reducer
