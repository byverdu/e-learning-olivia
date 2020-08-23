import React from 'react'
import Store from 'Store'

import PageContainer from 'Components/Pages/Container'

import './index.scss'

const App: React.FunctionComponent = () => (
  <Store>
    <PageContainer />
  </Store>
)

export default App
