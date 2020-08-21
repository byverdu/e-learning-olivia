import { Actions, ActionsTypes, ContextState } from './store.types'

const actionCreators = (
  type: ActionsTypes,
  payload?: unknown,
): Actions => ({ type, payload })

export const gameInit = (payload: number): Actions =>
  actionCreators('game-init', payload)

export const gameReset = (): Actions => actionCreators('game-reset')

export const gameIncrease = (): Actions =>
  actionCreators('game-increase')

export const fetchVideos = (payload: ContextState['videos']): Actions =>
  actionCreators('video-fetch-list', payload)

export const playVideo = (): Actions =>
  actionCreators('video-play-list')

export const getVideoPlayer = (payload: unknown): Actions =>
  actionCreators('video-get-player', payload)
