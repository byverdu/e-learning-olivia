import React, { FunctionComponent } from 'react'

import styles from './pageContainer.scss'

type PagesType = 'main'

interface Props {
  activePage: PagesType
}

const pageTitles = new Map<PagesType, string>([
  ['main', 'Select Your Game Type'],
])

const PageContainer: FunctionComponent<Props> = ({
  children,
  activePage,
}) => {
  const title = pageTitles.get(activePage)

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  )
}

export default PageContainer
