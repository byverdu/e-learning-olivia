import { Dispatch } from 'react'

export type ActionsTypes =
  | 'game-init'
  | 'game-reset'
  | 'game-increase'
  | 'video-fetch-list'
  | 'video-play-list'
  | 'loader-show'
  | 'loader-hide'
  | 'page-set-active'

export type PagesType = 'main' | 'search'

export interface Actions {
  type: ActionsTypes
  payload?: unknown
}

export interface ContextState {
  activePage: PagesType
  loader: {
    active: boolean,
    text?: string
  },
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
