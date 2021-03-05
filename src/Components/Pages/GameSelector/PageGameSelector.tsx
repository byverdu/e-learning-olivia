import React, {
  FunctionComponent, useCallback, useContext, SyntheticEvent, useState,
} from 'react'
import CountSelector from 'Components/Molecules/CountSelector'
import GameTypeSelector from 'Components/Molecules/GameTypeSelector'
import { Actions, AppContext } from 'Store'
import { GameType } from 'Store/store.types'

const gameTypes = new Map<GameType, string>([
  ['letters', 'Only Letters'],
  ['numbers', 'Only Numbers'],
  ['letters-numbers', 'Letters & Numbers'],
  ['spelling', 'Some Spelling'],
  ['maths', 'Some maths'],
])

const PageGameSelector: FunctionComponent = () => {
  const [shuffledItems, setShuffledItems] = useState(false)
  const { dispatch, state: { gameLength, gameType } } = useContext(AppContext)
  const selectOptionHandler = useCallback(
    (e: React.SyntheticEvent) => {
      const payload = (e.currentTarget as HTMLElement).dataset.id
      dispatch(Actions.gameCountSelect(Number(payload)))
    },
    [dispatch])
  const selectGameTypeHandler = useCallback((e: SyntheticEvent) => {
    const gameName = (e.target as HTMLButtonElement).dataset.id
    dispatch(Actions.gameTypeSelect(gameName as GameType))
    setShuffledItems(false)
  }, [dispatch])
  const setShuffledItemsHandler = useCallback(() => {
    const newValue = !shuffledItems
    setShuffledItems(newValue)
    dispatch(Actions.gameTypeShuffle(newValue))
  }, [setShuffledItems, shuffledItems, dispatch])

  return (
    <section>
      <CountSelector
        gameLength={gameLength}
        getSelectedOption={selectOptionHandler}
        gameLengthOptions={[3, 5, 8, 10]}
      />
      <GameTypeSelector
        setShuffledItemsHandler={setShuffledItemsHandler}
        shuffledItems={shuffledItems}
        selectGameTypeHandler={selectGameTypeHandler}
        gameType={gameType}
        gameTypes={gameTypes}
      />
    </section>
  )
}

export default PageGameSelector
