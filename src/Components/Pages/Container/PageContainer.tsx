import React, { FunctionComponent, useContext } from 'react'

import { AppContext } from 'Store'
import { PagesType } from 'Store/store.types';

import Loader from 'Components/Atoms/Loader';
import PageSelector from 'Components/Molecules/PageSelector';
import PageSearch from 'Components/Pages/Search';
import GameSelector from 'Components/Pages/GameSelector';
import Game from 'Components/Pages/Game';

import styles from './pageContainer.scss'
import PageVideo from '../Video';

const pageTitles = new Map<PagesType, string>([
  ['search', 'Search Videos on Youtube'],
  ['game-selector', 'Select Your Game type'],
  ['game', 'Let\'s Play!'],
  ['video', 'Video Page'],
])

const PageComponent:FunctionComponent<{page: PagesType}> = ({ page }) => {
  const components: {[key in PagesType]: FunctionComponent} = {
    search: PageSearch,
    'game-selector': GameSelector,
    game: Game,
    video: PageVideo,
  }
  const ToRender = components[page]

  return (
    <ToRender />
  )
}

const PageContainer: FunctionComponent = ({
  children,
}) => {
  const { state: { loader, activePage } } = useContext(AppContext)
  const title = pageTitles.get(activePage)

  return (
    <>
      {loader.active ? (
        <Loader
          size="large"
          text={loader.text}
        />
      )
        : (
          <section className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <PageSelector />
            <PageComponent page={activePage} />
            {children}
          </section>
        )}
    </>
  )
}

export default PageContainer
