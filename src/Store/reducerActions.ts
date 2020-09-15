import { arrayShuffle, getDefaultValues } from 'utils'
import {
  ContextState, SearchResult, PagesType, GameType, PlayList,
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
  const playlist: PlayList = Object.values(state.searchResult)
    .filter((item: SearchResult) => item.selected)
    .reduce((prev: PlayList, curr: SearchResult) => ({
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

export const videoSetSavedPlaylistReducer = (
  state: ContextState,
  payload: PlayList,
): ContextState => ({
  ...state,
  playlist: {
    ...payload,
  },
  videos: Object.keys(payload),
})

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
  games: {
    ...state.games,
    [payload]: getDefaultValues(payload),
  },
})

export const gameTypeShuffleReducer = (
  state: ContextState,
  payload: boolean,
): ContextState => ({
  ...state,
  games: {
    ...state.games,
    [state.gameType]: payload
      ? arrayShuffle(state.games[state.gameType])
      : [...getDefaultValues(state.gameType)],
  },
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
