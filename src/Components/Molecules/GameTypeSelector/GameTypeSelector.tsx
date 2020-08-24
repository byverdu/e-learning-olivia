import React, {
  FunctionComponent, useContext, useCallback, SyntheticEvent,
} from 'react'
import classNames from 'classnames'

import { GameType } from 'Store/store.types'
import { AppContext, Actions } from 'Store'

import styles from './gameTypeSelector.scss'

const gameTypes = new Map<GameType, string>([
  ['letters', 'Only Letters'],
  ['numbers', 'Only Numbers'],
  ['letters-numbers', 'Letters & Numbers'],
  ['maths', 'Some maths'],
])

const GameTypeSelector: FunctionComponent = () => {
  const { state: { gameType }, dispatch } = useContext(AppContext)
  const clickHandler = useCallback((e: SyntheticEvent) => {
    const gameName = (e.target as HTMLButtonElement).dataset.id
    dispatch(Actions.gameTypeSelect(gameName as GameType))
  }, [dispatch])

  return (
    <div className={styles['game-selector']}>
      {[...gameTypes.entries()].map(([id, text]) => (
        <button
          key={id}
          data-id={id}
          type="button"
          onClick={clickHandler}
          className={classNames(styles['game-btn'], { [styles.selected]: id === gameType })}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export default GameTypeSelector
