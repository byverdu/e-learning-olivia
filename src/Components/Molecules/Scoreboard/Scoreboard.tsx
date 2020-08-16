import React, { FunctionComponent, useContext } from 'react'
import Icon from 'Components/Atoms/Icon'
import { AppContext } from 'Store'
import classNames from 'classnames'

import styles from './scoreboard.scss'

const Scoreboard: FunctionComponent = () => {
  const {
    state: { score },
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
  return <div>{icons}</div>
}

export default Scoreboard
