import React from 'react'
import Scoreboard from 'Components/Molecules/Scoreboard'
import CountSelector from 'Components/Molecules/CountSelector'
import PageContainer from 'Components/Molecules/PageContainer'
import { Store } from 'Store'

const App: React.FunctionComponent = () => (
  <Store>
    <PageContainer activePage="main">
      <CountSelector />
      <Scoreboard />
    </PageContainer>
  </Store>
)

export default App
