import React, {
  FunctionComponent,
  useState,
  useCallback,
  useContext,
} from 'react'
import classNames from 'classnames'
import { AppContext, Actions } from 'Store'

import styles from './countSelector.scss'

const CountSelector: FunctionComponent = () => {
  const options = [3, 5, 8, 10]
  const [hideOptions, setHideOptions] = useState(true)
  const { dispatch } = useContext(AppContext)
  const toggleOptions = () => {
    setHideOptions(!hideOptions)
  }
  const selectOptions = useCallback(
    (e: React.SyntheticEvent) => {
      const payload = (e.target as HTMLElement).dataset.id
      dispatch(Actions.gameInit(Number(payload)))
      setHideOptions(!hideOptions)
    },
    [dispatch, hideOptions],
  )
  return (
    <div>
      <h6 onClick={toggleOptions}>Select Game Length</h6>
      <ul className={classNames({ [styles.hidden]: hideOptions })}>
        {options.map(item => (
          <li
            key={item}
            data-id={item}
            onClick={selectOptions}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountSelector
