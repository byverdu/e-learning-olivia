import { ContextState, Actions, SearchResult } from './store.types'
import {
  gameInitReducer,
  gameResetReducer,
  gameInCreaseReducer,
  fetchVideosReducer,
  playVideoReducer,
  videoSelectedReducer,
  showLoaderReducer,
  hideLoaderReducer,
  searchResolvedReducer,
  // getVideoPlayerReducer,
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

    case 'video-fetch-list':
      return fetchVideosReducer(state, payload)

    case 'video-play-list':
      return playVideoReducer(state)

    case 'video-selected':
      return videoSelectedReducer(state, payload as string)

    case 'loader-show':
      return showLoaderReducer(state, payload as string)

    case 'loader-hide':
      return hideLoaderReducer(state)

    case 'search-resolved':
      return searchResolvedReducer(state, payload as SearchResult[])

      // case 'video-get-player':
      //   return getVideoPlayerReducer(state, payload)

    default:
      return state
  }
}

export default reducer
