import { ContextState, Actions } from './store.types'

const reducer = (
  state: ContextState,
  action: Actions,
): ContextState => {
  const { type, payload } = action
  switch (type) {
    case 'game-init': {
      const length = payload as number
      const score = Array.from({ length }, (_, index) => ({
        id: index,
        active: true,
      }))

      return {
        ...state,
        score,
      }
    }
    case 'game-reset': {
      const score = state.score.map((_, index) => ({
        id: index,
        active: false,
      }))

      return {
        ...state,
        score,
      }
    }
    default:
      return state
  }
}

export default reducer
