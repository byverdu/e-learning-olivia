import { Dispatch } from 'react'

export type ActionsTypes =
| 'loader-show'
| 'loader-hide'
| 'page-set-active'
| 'search-resolved'
| 'search-clear'
| 'video-set-playlist'
| 'video-clear-playlist'
| 'video-remove-from-playlist'
| 'video-ready-playlist'
| 'game-init'
| 'game-reset'
| 'game-increase'
  | 'search-resolved'
  | 'search-clear'
  | 'video-fetch-list'
  | 'video-set-play-list'
  | 'video-clear-play-list'
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

export interface VideoItem {
  videoId: string,
  thumbnail: string
}

export interface ContextState {
  activePage: PagesType
  loader: {
    active: boolean,
    text?: string
  },
  searchResult: {[key: string]: SearchResult}
  playlist: {[key: string]: VideoItem}
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
