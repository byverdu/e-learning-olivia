import React, { FunctionComponent, SyntheticEvent } from 'react'
import classNames from 'classnames'

import { GameType } from 'Store/store.types'

import styles from './gameTypeSelector.scss'

interface Props {
  gameTypes: Map<GameType, string>
  gameType: GameType
  shuffledItems: boolean
  setShuffledItemsHandler: () => void
  selectGameTypeHandler: (e: SyntheticEvent) => void
}

const GameTypeSelector: FunctionComponent<Props> = ({
  gameType,
  gameTypes,
  shuffledItems,
  setShuffledItemsHandler,
  selectGameTypeHandler,
}) => (
  <div className={styles['game-selector']}>
    <button
      disabled={!gameType}
      type="button"
      onClick={setShuffledItemsHandler}
      className={classNames(styles['game-btn'], { [styles.selected]: shuffledItems })}
    >
      Shuffle Items
    </button>
    {[...gameTypes.entries()].map(([id, text]) => (
      <button
        key={id}
        data-id={id}
        type="button"
        onClick={selectGameTypeHandler}
        className={classNames(styles['game-btn'], { [styles.selected]: id === gameType })}
      >
        {text}
      </button>
    ))}
  </div>
)

export default GameTypeSelector
