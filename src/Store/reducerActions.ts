import { ContextState, SearchResult } from './store.types'

export const gameInitReducer = (
  state: ContextState,
  payload: unknown,
): ContextState => {
  const length = payload as number
  const score = Array.from({ length }, (_, index) => ({
    id: index,
    active: false,
  }))

  return {
    ...state,
    score,
  }
}

export const gameResetReducer = (
  state: ContextState,
): ContextState => ({
  ...state,
  score: state.score.map((_, index) => ({
    id: index,
    active: false,
  })),
})

export const gameInCreaseReducer = (
  state: ContextState,
): ContextState => {
  const cloneState = [...state.score]
  const activeItems = cloneState.filter(score => score.active).length

  if (cloneState.every(item => item.active)) {
    return state
  }

  return {
    ...state,
    score: cloneState.map((item, index) => ({
      ...item,
      active: index === activeItems ? true : item.active,
    })),
  }
}

export const fetchVideosReducer = (
  state: ContextState,
  payload: unknown,
): ContextState => ({
  ...state,
  videos: payload as ContextState['videos'],
})

export const playVideoReducer = (
  state: ContextState,
): ContextState => {
  const currentVideo = state.playback.track
  const src = state.videos.list[currentVideo]
  return ({
    ...state,
    playback: {
      track: currentVideo + 1,
      src,
      isPlaying: true,
    },
  })
}

export const videoSelectedReducer = (
  state: ContextState,
  payload: string,
): ContextState => {
  const resultsCopy = [...state.searchResult]
  const selectedVideo = state.searchResult.findIndex(video => video.videoId === payload)
  resultsCopy[selectedVideo].selected = !resultsCopy[selectedVideo].selected

  resultsCopy.splice(selectedVideo, 1, resultsCopy[selectedVideo])
  return ({
    ...state,
    searchResult: resultsCopy,
  })
}

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
  payload: unknown,
): ContextState => ({
  ...state,
  loader: {
    active: false,
    text: 'Loading...',
  },
})

export const searchResolvedReducer = (
  state: ContextState,
  payload: SearchResult[],
): ContextState => ({
  ...state,
  searchResult: payload,
})
