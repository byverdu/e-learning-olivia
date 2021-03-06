import React, { FunctionComponent } from 'react'

import styles from './loader.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
  text?: string
  removeBackground?: boolean
}

const Loader: FunctionComponent<Props> = ({ size = 'small', text, removeBackground = false }) => (
  <div className={`${styles.loader} ${removeBackground ? styles['loader-no-background'] : ''}`}>
    <div className={`${styles['loader-container']} ${styles[size]}`}>
      <img
        className={styles['loader-img']}
        src="https://miro.medium.com/max/978/0*JeAUeQMcb2TcNDvN.gif"
        alt="Monkey Loader"
      />
      {text && <span className={styles['loader-text']}>{text}</span>}
    </div>
  </div>
)

export default Loader
