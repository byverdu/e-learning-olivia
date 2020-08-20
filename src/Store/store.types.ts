import { Dispatch } from 'react'

export type ActionsTypes =
  | 'game-init'
  | 'game-reset'
  | 'game-increase'
  | 'fetch-videos'
  | 'play-video'

export interface Actions {
  type: ActionsTypes
  payload?: unknown
}

export interface ContextState {
  scoreCount: number
  score?: { active: boolean; id: number }[]
  videos?: {
    fetched: boolean
    list: string[]
  }
  playback: {
    src: string
    track: number
    isPlaying: boolean
  }
}

export interface AppState {
  state: ContextState
  dispatch: Dispatch<Actions>
}
