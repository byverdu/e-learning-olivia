import {
  Actions, ActionsTypes, PagesType, SearchResult, GameType,
} from './store.types'

const actionCreators = (
  type: ActionsTypes,
  payload?: unknown,
): Actions => ({ type, payload })

export const showLoader = (payload?: string): Actions =>
  actionCreators('loader-show', payload)

export const hideLoader = (): Actions =>
  actionCreators('loader-hide')

export const setActivePage = (payload: PagesType): Actions =>
  actionCreators('page-set-active', payload)

export const searchResolved = (payload: SearchResult[]): Actions =>
  actionCreators('search-resolved', payload)

export const searchClear = (): Actions =>
  actionCreators('search-clear')

export const videoSelected = (payload: string): Actions =>
  actionCreators('video-selected', payload)

export const videoPlaySelected = (payload: string): Actions =>
  actionCreators('video-play-selected', payload)

export const videoSetPlaylist = (): Actions =>
  actionCreators('video-set-playlist')

export const videoClearPlaylist = (): Actions =>
  actionCreators('video-clear-playlist')

export const videoRemoveItemPlaylist = (payload: string): Actions =>
  actionCreators('video-remove-from-playlist', payload)

export const videoReadyPlaylist = (payload: string[]): Actions =>
  actionCreators('video-ready-playlist', payload)

export const gameCountSelect = (payload: number): Actions =>
  actionCreators('game-count-select', payload)

export const gameTypeSelect = (payload: GameType): Actions =>
  actionCreators('game-type-select', payload)

export const gameTypeShuffle = (payload: boolean): Actions =>
  actionCreators('game-type-shuffle', payload)

export const gameReset = (): Actions => actionCreators('game-reset')

export const gameIncrease = (): Actions =>
  actionCreators('game-increase')

export const videoSetNext = (): Actions =>
  actionCreators('video-set-next')

export const cardNext = (): Actions =>
  actionCreators('card-next')
