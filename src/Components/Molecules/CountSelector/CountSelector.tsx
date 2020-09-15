import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

import Icon from 'Components/Atoms/Icon'
import styles from './countSelector.scss'

interface Props {
  getSelectedOption: (e: React.SyntheticEvent) => void
  gameLength: number
  gameLengthOptions: number[]
}

const CountSelector: FunctionComponent<Props> = ({
  getSelectedOption,
  gameLength,
  gameLengthOptions,
}) => (
  <div className={styles['count-selector']}>
    <h6 className={styles.title}>Select Game Options</h6>
    <ul className={styles.list}>
      {gameLengthOptions.map(item => (
        <li
          className={styles['list-item']}
          key={item}
          data-id={item}
          onClick={getSelectedOption}
        >
          {item}
          {' '}
          <Icon
            name="star"
            className={classNames(styles['icon-star'], { [styles.selected]: gameLength === item })}
          />
        </li>
      ))}
    </ul>
  </div>
)

export default CountSelector
