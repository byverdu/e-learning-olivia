import { ContextState, GameType } from 'Store/store.types'
import { getDefaultValues, arrayShuffle } from 'utils'

export const gameCountSelectReducer = (
  state: ContextState,
  payload: number,
): ContextState => {
  const length = payload
  const score = Array.from({ length }, (_, index) => ({
    id: index,
    active: false,
  }))

  return {
    ...state,
    gameLength: length,
    score,
  }
}

export const gameTypeSelectReducer = (
  state: ContextState,
  payload: GameType,
): ContextState => ({
  ...state,
  gameType: payload,
  games: {
    ...state.games,
    [payload]: getDefaultValues(payload),
  },
})

export const gameTypeShuffleReducer = (
  state: ContextState,
  payload: boolean,
): ContextState => ({
  ...state,
  games: {
    ...state.games,
    [state.gameType]: payload
      ? arrayShuffle(state.games[state.gameType])
      : [...getDefaultValues(state.gameType)],
  },
})

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
