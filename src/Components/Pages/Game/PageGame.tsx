import React, {
  FunctionComponent, useContext, useEffect, KeyboardEvent, useCallback,
} from 'react'
import { AppContext, Actions } from 'Store'

import Scoreboard from 'Components/Molecules/Scoreboard'
import GameCard from 'Components/Atoms/GameCard'

const NUMBER_0_KEY_CODE = 47
const LETTER_Z_KEY_CODE = 91

const validateTwoDigitsNumbers = ((e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const { value } = target.dataset
  let isValid = false

  if (value.charAt(0) === e.key) {
    target.setAttribute('id', e.key)
  } else if (`${target.id}${value.charAt(1)}` === value) {
    isValid = true
  }

  return isValid
})

const PageGame: FunctionComponent = () => {
  const {
    state: {
      gameType, games, gameLength, score,
    }, dispatch,
  } = useContext(AppContext)
  const keyupHandler = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    const { value } = target.dataset
    const hasTwoDigits = value.length > 1
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { gameType: _gameType } = target.parentElement.dataset
    let isValid = false

    if (e.keyCode > NUMBER_0_KEY_CODE && e.keyCode < LETTER_Z_KEY_CODE) {
      if (_gameType === 'numbers' && hasTwoDigits) {
        isValid = validateTwoDigitsNumbers(e)
      } else if (e.key === `${value}`) {
        isValid = true
      }

      if (isValid) {
        dispatch(Actions.gameIncrease())
      }
      console.log(e.key, e.keyCode, isValid ? 'yeiii' : 'nope')
    }
  }, [dispatch])
  useEffect(() => {
    // TODO remove once dev is done
    dispatch(Actions.gameCountSelect(5))
  }, [dispatch])

  useEffect(() => {
    const fullScore = score.every((item, index) => index >= 0 && item.active)
    if (score.length === gameLength && fullScore) {
      dispatch(Actions.setActivePage('video'))
    }
  }, [score, dispatch, gameLength])

  console.log(gameLength, score)
  return (
    <>
      <Scoreboard />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
        data-game-type={gameType}
      >
        {games[gameType].map((item: string) => (
          <GameCard
            key={item}
            value={item}
            gameType={gameType}
            keyupHandler={keyupHandler}
          />
        ))}
      </div>
    </>
  )
}

export default PageGame
