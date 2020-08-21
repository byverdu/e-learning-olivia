import { Dispatch } from 'react'

export type ActionsTypes =
  | 'game-init'
  | 'game-reset'
  | 'game-increase'
  | 'video-fetch-list'
  | 'video-play-list'
  | 'video-get-player'

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
  player: typeof YT
}

export interface AppState {
  state: ContextState
  dispatch: Dispatch<Actions>
}
