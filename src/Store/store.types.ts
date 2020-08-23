import { Dispatch } from 'react'

export type ActionsTypes =
  | 'game-init'
  | 'game-reset'
  | 'game-increase'
  | 'search-resolved'
  | 'video-fetch-list'
  | 'video-play-list'
  | 'video-selected'
  | 'loader-show'
  | 'loader-hide'
  | 'page-set-active'

export type PagesType = 'main' | 'search'

export interface Actions {
  type: ActionsTypes
  payload?: unknown
}

export interface SearchResult {
  videoId: string,
  thumbnail: string
  selected: boolean
}

export interface ContextState {
  activePage: PagesType
  loader: {
    active: boolean,
    text?: string
  },
  searchResult: SearchResult[]
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
