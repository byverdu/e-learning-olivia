import { ContextState, SearchResult, PlayList } from 'Store/store.types'

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
      ...state.playlist,
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
): ContextState => {
  const videos = payload.length === 1 ? [...state.videos, ...payload] : payload
  const playlist = videos.reduce((prev, curr) => ({
    ...prev,
    [curr]: {
      ...state.playlist[curr],
    },
  }), {})

  return ({
    ...state,
    videos,
    playlist,
  })
}
