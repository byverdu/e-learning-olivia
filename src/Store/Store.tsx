import React, {
  createContext,
  FunctionComponent,
  useReducer,
} from 'react'
import { ContextState, AppState } from './store.types'
import reducer from './reducer'

export const AppContext = createContext<AppState | undefined>(
  undefined,
)

// eslint-disable-next-line react/prop-types
export const Store: FunctionComponent = ({ children }) => {
  const initialState: ContextState = {
    scoreCount: 0,
    score: [],
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
