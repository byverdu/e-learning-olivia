import { ContextState, Actions } from './store.types'
import {
  gameInitReducer,
  gameResetReducer,
  gameInCreaseReducer,
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

    default:
      return state
  }
}

export default reducer
