import { Dispatch } from 'react'

export type ActionsTypes = 'game-init' | 'game-reset'

export interface Actions {
  type: ActionsTypes
  payload?: unknown
}

export interface ContextState {
  scoreCount: number
  score?: { active: boolean; id: number }[]
}

export interface AppState {
  state: ContextState
  dispatch: Dispatch<Actions>
}
