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
| 'video-set-next'
| 'video-selected'
| 'video-play-selected'
| 'video-fetch-list'
| 'game-count-select'
| 'game-type-select'
| 'game-type-shuffle'
| 'game-reset'
| 'game-increase'
| 'card-next'

export type PagesType = 'search' | 'game-selector' | 'game' | 'video'

export type GameType = 'letters' | 'numbers' | 'letters-numbers' | 'maths'

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
  gameLength: number
  gameType: GameType
  games: {
    'letters': string[]
    'numbers': number[]
    ['letters-numbers']: (string|number)[]
    'maths': number[]
  }
  score?: { active: boolean; id: number }[]
  currentTrack: number
  currentCard: number
  videos?: string[]
  player: typeof YT
}

export interface AppState {
  state: ContextState
  dispatch: Dispatch<Actions>
}
