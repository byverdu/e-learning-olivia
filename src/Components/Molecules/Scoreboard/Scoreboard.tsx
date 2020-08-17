import React, {
  FunctionComponent,
  useContext,
  useCallback,
} from 'react'
import Icon from 'Components/Atoms/Icon'
import { AppContext, Actions } from 'Store'
import classNames from 'classnames'

import styles from './scoreboard.scss'

const Scoreboard: FunctionComponent = () => {
  const {
    state: { score },
    dispatch,
  } = useContext(AppContext)
  const icons = score.map(item => (
    <Icon
      key={item.id}
      className={classNames(styles['score-star'], {
        [styles.active]: item.active,
      })}
      name="star"
    />
  ))
  const resetGame = useCallback(() => {
    dispatch(Actions.gameReset())
  }, [dispatch])
  const increaseGame = useCallback(() => {
    dispatch(Actions.gameIncrease())
  }, [dispatch])
  return (
    <>
      <button onClick={resetGame} type="button">
        Reset
      </button>
      <button onClick={increaseGame} type="button">
        UP UP
      </button>
      <div>{icons}</div>
    </>
  )
}

export default Scoreboard
