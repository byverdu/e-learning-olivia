import {
  ContextState, Actions, SearchResult, PagesType, GameType,
} from './store.types'
import {
  gameCountSelectReducer,
  gameTypeSelectReducer,
  gameResetReducer,
  gameInCreaseReducer,
  gameTypeShuffleReducer,
  videoSelectedReducer,
  showLoaderReducer,
  hideLoaderReducer,
  searchResolvedReducer,
  searchClearReducer,
  videoSetPlaylistReducer,
  videoPlaylistClearReducer,
  videoRemoveItemPlaylistReducer,
  videoReadyPlaylistReducer,
  videoSetNextReducer,
  pageSelectorReducer,
  videoPlaySelectedReducer,
  cardNextReducer,
} from './reducerActions'

const reducer = (
  state: ContextState,
  action: Actions,
): ContextState => {
  const { type, payload } = action
  switch (type) {
    case 'loader-show':
      return showLoaderReducer(state, payload as string)

    case 'loader-hide':
      return hideLoaderReducer(state)

    case 'page-set-active':
      return pageSelectorReducer(state, payload as PagesType)

    case 'game-count-select':
      return gameCountSelectReducer(state, payload as number)

    case 'game-type-select':
      return gameTypeSelectReducer(state, payload as GameType)

    case 'game-type-shuffle':
      return gameTypeShuffleReducer(state, payload as boolean)

    case 'game-reset':
      return gameResetReducer(state)

    case 'game-increase':
      return gameInCreaseReducer(state)

    case 'video-selected':
      return videoSelectedReducer(state, payload as string)

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

    case 'video-set-next':
      return videoSetNextReducer(state)

    case 'video-play-selected':
      return videoPlaySelectedReducer(state, payload as string)

    case 'card-next':
      return cardNextReducer(state)

    default:
      return state
  }
}

export default reducer
