import React, {
  FunctionComponent,
  useCallback,
  useContext,
} from 'react'
import classNames from 'classnames'
import { AppContext, Actions } from 'Store'

import Icon from 'Components/Atoms/Icon'
import styles from './countSelector.scss'

const CountSelector: FunctionComponent = () => {
  const options = [3, 5, 8, 10]
  const { dispatch, state: { scoreCount } } = useContext(AppContext)
  const selectOptions = useCallback(
    (e: React.SyntheticEvent) => {
      const payload = (e.currentTarget as HTMLElement).dataset.id
      dispatch(Actions.gameInit(Number(payload)))
    },
    [dispatch],
  )
  return (
    <div className={styles['count-selector']}>
      <h6>Select Game Length</h6>
      <ul className={styles.list}>
        {options.map(item => (
          <li
            className={styles['list-item']}
            key={item}
            data-id={item}
            onClick={selectOptions}
          >
            {item}
            {' '}
            <Icon
              name="star"
              className={classNames(styles['icon-star'], { [styles.selected]: scoreCount === item })}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountSelector
