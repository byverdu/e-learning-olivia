import React, { FunctionComponent, useContext, useCallback } from 'react'
import CountSelector from 'Components/Molecules/CountSelector'
import GameTypeSelector from 'Components/Molecules/GameTypeSelector'
import { AppContext, Actions } from 'Store'

const PageGameSelector: FunctionComponent = () => {
  const { dispatch } = useContext(AppContext)
  const clickHandler = useCallback(() => {
    dispatch(Actions.setActivePage('game'))
  }, [dispatch])
  return (
    <section>
      <CountSelector />
      <GameTypeSelector />
      <button
        onClick={clickHandler}
        type="button"
      >
        Done!
      </button>
    </section>
  )
}

export default PageGameSelector
