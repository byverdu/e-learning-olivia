import React, {
  createContext,
  FunctionComponent,
  useReducer,
} from 'react'
import { getDefaultValues } from 'utils'
import { ContextState, AppState } from './store.types'
import reducer from './reducer'
import withScriptLoader from '../HOC'

export const AppContext = createContext<AppState | undefined>(
  undefined,
)

interface Props {
  player: typeof YT
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
    gameLength: 0,
    gameType: 'letters-numbers',
    playlist: {},
    games: {
      letters: [...getDefaultValues('letters') as string[]],
      numbers: [...getDefaultValues('numbers') as number[]],
      'letters-numbers': [...getDefaultValues('letters-numbers')],
      maths: [],
      spelling: [...getDefaultValues('letters') as string[]],
    },
    score: [],
    currentTrack: 0,
    currentCard: 0,
    videos: [],
    player,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default withScriptLoader(Store)
