import { Actions, ActionsTypes } from './store.types'

const actionCreators = (
  type: ActionsTypes,
  payload?: unknown,
): Actions => ({ type, payload })

export const gameInit = (payload: number): Actions =>
  actionCreators('game-init', payload)

export const gameReset = (): Actions => actionCreators('game-reset')

export const gameIncrease = (): Actions =>
  actionCreators('game-increase')
