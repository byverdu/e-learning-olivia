import {
  ContextState, PagesType,
} from '../store.types'

export const showLoaderReducer = (
  state: ContextState,
  payload: string,
): ContextState => ({
  ...state,
  loader: {
    active: true,
    text: payload,
  },
})

export const hideLoaderReducer = (
  state: ContextState,
): ContextState => ({
  ...state,
  loader: {
    active: false,
    text: 'Loading...',
  },
})

export const pageSelectorReducer = (
  state: ContextState,
  payload: PagesType,
): ContextState => ({
  ...state,
  activePage: payload,
})

export const videoSetNextReducer = (
  state: ContextState,
): ContextState => {
  const { videos, currentTrack } = state
  const videosLength = videos.length - 1
  const nextTrack = currentTrack === videosLength ? 0 : currentTrack + 1
  return {
    ...state,
    currentTrack: nextTrack,
  }
}

export const videoPlaySelectedReducer = (
  state: ContextState,
  payload: string,
): ContextState => {
  const { videos } = state
  const indexNextVideo = videos.findIndex(videoId => videoId === payload)

  const nextTrack = indexNextVideo === -1 ? 0 : indexNextVideo
  return {
    ...state,
    currentTrack: nextTrack,
  }
}

export const cardNextReducer = (
  state: ContextState,
): ContextState => {
  const { games, gameType } = state
  let { currentCard } = state
  const gameLength = (games[gameType].length - 1)
  const nextCard = currentCard === gameLength ? 0 : currentCard += 1

  return {
    ...state,
    currentCard: nextCard,
  }
}

export {
  searchClearReducer,
  searchResolvedReducer,
  videoPlaylistClearReducer,
  videoReadyPlaylistReducer,
  videoRemoveItemPlaylistReducer,
  videoSelectedReducer,
  videoSetPlaylistReducer,
  videoSetSavedPlaylistReducer,
} from './search'

export {
  gameCountSelectReducer,
  gameInCreaseReducer,
  gameResetReducer,
  gameTypeSelectReducer,
  gameTypeShuffleReducer,
} from './game'
