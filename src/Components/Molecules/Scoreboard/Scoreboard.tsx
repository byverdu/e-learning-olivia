import React, {
  FunctionComponent,
} from 'react'
import Icon from 'Components/Atoms/Icon'
import classNames from 'classnames'

import { Score } from 'Store/store.types'
import styles from './scoreboard.scss'

interface Props {
  score: Score[]
}

const Scoreboard: FunctionComponent<Props> = ({ score }: Props) => (
  <>
    <div>
      {score.map(item => (
        <Icon
          key={item.id}
          className={classNames(styles['score-star'], {
            [styles.active]: item.active,
          })}
          name="star"
        />
      ))}
    </div>
  </>
)

export default Scoreboard
