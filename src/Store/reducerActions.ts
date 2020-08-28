import {
  ContextState, SearchResult, VideoItem, PagesType, GameType,
} from './store.types'

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

export const searchResolvedReducer = (
  state: ContextState,
  payload: SearchResult[],
): ContextState => {
  const payloadCopy = payload.slice()
  Object.keys(state.playlist)
    .forEach(videoId => {
      const indexInPlaylist = payloadCopy.findIndex(result => result.videoId === videoId)

      if (indexInPlaylist !== -1) {
        payloadCopy[indexInPlaylist].selected = true
      }
    })

  return {
    ...state,
    searchResult: payloadCopy.reduce((prev, curr) => ({
      ...prev,
      [curr.videoId]: curr,
    }), {}),
  }
}

export const searchClearReducer = (
  state: ContextState,
): ContextState => ({
  ...state,
  searchResult: {},
})

export const videoSelectedReducer = (
  state: ContextState,
  payload: string,
): ContextState => {
  const selectedVideo = state.searchResult[payload]

  return ({
    ...state,
    searchResult: {
      ...state.searchResult,
      [selectedVideo.videoId]: {
        ...selectedVideo,
        selected: !selectedVideo.selected,
      },
    },
  })
}

export const videoSetPlaylistReducer = (
  state: ContextState,
): ContextState => {
  const playlist: {[key: string]: VideoItem} = Object.values(state.searchResult)
    .filter((item: SearchResult) => item.selected)
    .reduce((prev: {[key: string]: VideoItem}, curr: SearchResult) => ({
      ...prev,
      [curr.videoId]: {
        videoId: curr.videoId,
        thumbnail: curr.thumbnail,
      },
    }), {})

  return {
    ...state,
    playlist: {
      ...playlist,
    },
  }
}

export const videoPlaylistClearReducer = (
  state: ContextState,
): ContextState => {
  const searchResult = Object.values(state.searchResult)
    .reduce((prev, curr: SearchResult) => ({
      ...prev,
      [curr.videoId]: {
        ...curr,
        selected: false,
      },
    }), {})

  return {
    ...state,
    playlist: {},
    searchResult,
    videos: [],
  }
}

export const videoRemoveItemPlaylistReducer = (
  state: ContextState,
  payload: string,
): ContextState => {
  const searchResultItem = state.searchResult[payload]
  const playlist = {
    ...state.playlist,
  }
  delete playlist[payload]
  return {
    ...state,
    playlist,
    searchResult: {
      ...state.searchResult,
      [payload]: {
        ...searchResultItem,
        selected: false,
      },
    },
  }
}

export const videoReadyPlaylistReducer = (
  state: ContextState,
  payload: string[],
): ContextState => ({
  ...state,
  videos: payload.length === 1 ? [...state.videos, ...payload] : payload,
})

export const gameCountSelectReducer = (
  state: ContextState,
  payload: number,
): ContextState => {
  const length = payload
  const score = Array.from({ length }, (_, index) => ({
    id: index,
    active: false,
  }))

  return {
    ...state,
    gameLength: length,
    score,
  }
}

export const gameTypeSelectReducer = (
  state: ContextState,
  payload: GameType,
): ContextState => ({
  ...state,
  gameType: payload,
})

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
