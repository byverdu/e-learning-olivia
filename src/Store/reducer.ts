import { ContextState, Actions } from './store.types'

const reducer = (
  state: ContextState,
  action: Actions,
): ContextState => {
  const { type, payload } = action
  switch (type) {
    case 'game-init': {
      const score = Array.from(
        { length: Number(payload) },
        (_, index) => ({
          id: index,
          active: false,
        }),
      )

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
