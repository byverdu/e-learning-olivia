import React from 'react'
import Store from 'Store'

import Scoreboard from 'Components/Molecules/Scoreboard'
import CountSelector from 'Components/Molecules/CountSelector'
import PageContainer from 'Components/Molecules/PageContainer'
import YouTubeVideo from 'Components/Atoms/YouTubeVideo'
import YouTubeSearch from 'Components/Atoms/YouTubeSearch'

import './index.scss'

const App: React.FunctionComponent = () => (
  <Store>
    <PageContainer activePage="main">
      <YouTubeSearch />
      <CountSelector />
      <Scoreboard />
      <YouTubeVideo />
    </PageContainer>
  </Store>
)

export default App
