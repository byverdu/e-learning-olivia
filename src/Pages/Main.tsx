import React, { FunctionComponent } from 'react'

type PagesType = 'main'

interface Props {
  activePage: PagesType
}

const pageTitles = new Map<PagesType, string>([
  ['main', 'Select Your Game Type'],
])

export const Main: FunctionComponent<Props> = ({
  children,
  activePage = 'main',
}) => {
  const title = pageTitles.get(activePage)

  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
