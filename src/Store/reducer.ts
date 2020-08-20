import { ContextState, Actions } from './store.types'
import {
  gameInitReducer,
  gameResetReducer,
  gameInCreaseReducer,
  fetchVideosReducer,
  playVideoReducer,
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

    case 'fetch-videos':
      return fetchVideosReducer(state, payload)

    case 'play-video':
      return playVideoReducer(state)

    default:
      return state
  }
}

export default reducer
