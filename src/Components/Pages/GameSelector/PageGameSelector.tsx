import React, { FunctionComponent } from 'react'
import CountSelector from 'Components/Molecules/CountSelector'
import GameTypeSelector from 'Components/Molecules/GameTypeSelector'

const PageGameSelector: FunctionComponent = () => (
  <section>
    <CountSelector />
    <GameTypeSelector />
  </section>
)

export default PageGameSelector
