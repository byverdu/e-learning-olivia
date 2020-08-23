import React from 'react'
import Store from 'Store'

import PageContainer from 'Components/Pages/Container'
import ErrorBoundary from 'Components/Atoms/ErrorBoundary'

import './index.scss'

const App: React.FunctionComponent = () => (
  <ErrorBoundary>
    <Store>
      <PageContainer />
    </Store>
  </ErrorBoundary>
)

export default App
