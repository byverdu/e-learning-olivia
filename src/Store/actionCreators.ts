import {
  Actions, ActionsTypes, ContextState, PagesType, SearchResult,
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

export const videoSetPlayList = (): Actions =>
  actionCreators('video-set-play-list')

export const videoClearPlayList = (): Actions =>
  actionCreators('video-clear-play-list')

export const videoRemoveItemPlayList = (payload: string): Actions =>
  actionCreators('video-remove-from-play-list', payload)

export const gameReset = (): Actions => actionCreators('game-reset')

export const gameIncrease = (): Actions =>
  actionCreators('game-increase')

export const fetchVideos = (payload: ContextState['videos']): Actions =>
  actionCreators('video-fetch-list', payload)

export const playVideo = (): Actions =>
  actionCreators('video-play-list')

// export const getVideoPlayer = (payload: unknown): Actions =>
//   actionCreators('video-get-player', payload)
