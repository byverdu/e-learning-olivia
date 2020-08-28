import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useEffect,
} from 'react'
import { Actions } from 'Store'
import { ContextState, AppState } from './store.types'
import reducer from './reducer'
import withScriptLoader from '../HOC'

export const AppContext = createContext<AppState | undefined>(
  undefined,
)

interface Props {
  player: string
}

// eslint-disable-next-line react/prop-types
const Store: FunctionComponent<Props> = ({ children, player }) => {
  const initialState: ContextState = {
    loader: {
      active: false,
      text: 'Loading...',
    },
    activePage: 'search',
    searchResult: {},
    playlist: {},
    gameLength: 0,
    gameType: 'letters',
    score: [],
    videos: [],
    playback: {
      src: '',
      track: 0,
      isPlaying: false,
    },
    player: undefined,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (player) {
      dispatch(Actions.getVideoPlayer(player))
    }
  }, [player])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default withScriptLoader(Store)
