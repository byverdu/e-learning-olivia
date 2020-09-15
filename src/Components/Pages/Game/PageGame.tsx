import React, {
  FunctionComponent, useContext, useEffect, KeyboardEvent, useCallback,
} from 'react'
import { AppContext, Actions } from 'Store'

import Scoreboard from 'Components/Molecules/Scoreboard'
import GameCard from 'Components/Atoms/GameCard'

import styles from './pageGame.scss'

const NUMBER_0_KEY_CODE = 47
const LETTER_Z_KEY_CODE = 91

const validateTwoDigitsNumbers = ((e: KeyboardEvent, activeStyle: string) => {
  const target = e.target as HTMLElement
  const { value } = target.dataset
  let isValid = false

  if (value.charAt(0) === e.key && target.id !== e.key) {
    target.setAttribute('id', e.key)
    target.classList.add(activeStyle)
  } else if (`${target.id}${e.key}` === value) {
    isValid = true
  }

  return isValid
})

const PageGame: FunctionComponent = () => {
  const {
    state: {
      gameType, games, gameLength, score, currentCard,
    }, dispatch,
  } = useContext(AppContext)
  const card = games[gameType][currentCard]
  const keyupHandler = useCallback((e: KeyboardEvent, activeStyle: string) => {
    const target = e.target as HTMLElement
    const { value } = target.dataset
    const hasTwoDigits = value.length > 1
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { gameType: _gameType } = target.parentElement.dataset
    let isValid = false

    if (e.keyCode > NUMBER_0_KEY_CODE && e.keyCode < LETTER_Z_KEY_CODE) {
      if (_gameType.includes('numbers') && hasTwoDigits) {
        isValid = validateTwoDigitsNumbers(e, activeStyle)
      } else if (e.key === `${value}`) {
        isValid = true
      }

      if (isValid) {
        dispatch(Actions.gameIncrease())
        dispatch(Actions.cardNext())
      }
      console.log(e.key, e.keyCode, isValid ? 'yeiii' : 'nope')
    }
  }, [dispatch])

  useEffect(() => {
    const fullScore = score.every((item, index) => index >= 0 && item.active)
    if (score.length === gameLength && fullScore) {
      dispatch(Actions.setActivePage('video'))
    }
  }, [score, dispatch, gameLength])

  return (
    <>
      <Scoreboard score={score} />
      <div
        className={styles['page-game']}
        data-game-type={gameType}
      >
        <GameCard
          value={card}
          keyupHandler={keyupHandler}
        />
      </div>
    </>
  )
}

export default PageGame
