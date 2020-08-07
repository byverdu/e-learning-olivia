import React from 'react'
import styles from './main.scss'

const Main: React.FunctionComponent = () => (
  <>
    <h1 className={styles.title}>Hello World</h1>
    <p
      id="xoxo"
      className={styles.xoxo}
      draggable
    >
      Live is ok
    </p>
  </>
)

export default Main
