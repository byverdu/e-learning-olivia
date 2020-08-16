import React from 'react'
import Scoreboard from 'Components/Molecules/Scoreboard'
import CountSelector from 'Components/Molecules/CountSelector'
import { Store } from 'Store'

const App: React.FunctionComponent = () => (
  <Store>
    <CountSelector />
    <Scoreboard />
  </Store>
)

export default App
