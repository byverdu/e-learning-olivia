import { ContextState } from './store.types'

export const gameInitReducer = (
  state: ContextState,
  payload: unknown,
): ContextState => {
  const length = payload as number
  const score = Array.from({ length }, (_, index) => ({
    id: index,
    active: false,
  }))

  return {
    ...state,
    score,
  }
}

export const gameResetReducer = (
  state: ContextState,
): ContextState => ({
  ...state,
  score: state.score.map((_, index) => ({
    id: index,
    active: false,
  })),
})

export const gameInCreaseReducer = (
  state: ContextState,
): ContextState => {
  const cloneState = [...state.score]
  const activeItems = cloneState.filter(score => score.active).length

  if (cloneState.every(item => item.active)) {
    return state
  }

  return {
    ...state,
    score: cloneState.map((item, index) => ({
      ...item,
      active: index === activeItems ? true : item.active,
    })),
  }
}
