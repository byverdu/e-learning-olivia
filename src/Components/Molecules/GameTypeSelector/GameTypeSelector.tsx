import React, { FunctionComponent, SyntheticEvent } from 'react'
import classNames from 'classnames'

import { GameType } from 'Store/store.types'

import styles from './gameTypeSelector.scss'

interface Props {
  gameTypes: Map<GameType, string>
  gameType: GameType
  selectGameTypeHandler: (e: SyntheticEvent) => void
}

const GameTypeSelector: FunctionComponent<Props> = ({
  gameType,
  gameTypes,
  selectGameTypeHandler,
}) => (
  <div className={styles['game-selector']}>
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
