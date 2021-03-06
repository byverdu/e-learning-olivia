import React, {
  FunctionComponent, useContext, useMemo, SyntheticEvent, useCallback,
} from 'react'
import { AppContext, Actions } from 'Store'
import { PagesType } from 'Store/store.types'

import styles from './pageSelector.scss';

interface PageButton {
  text: string,
  id: PagesType,
  disabled: boolean,
  onClick: (e: SyntheticEvent) => void
}

const checkCollectionLength = (
  collection: Record<string, unknown>,
  type: 'bigger' | 'equal',
) => (type === 'equal'
  ? Object.keys(collection).length === 0
  : Object.keys(collection).length > 0)

const PageSelector: FunctionComponent = () => {
  const {
    state: {
      playlist, searchResult, gameLength, activePage,
    }, dispatch,
  } = useContext(AppContext)

  const clickHandler = useCallback((e: SyntheticEvent) => {
    const currPage = (e.target as HTMLButtonElement).dataset.id
    dispatch(Actions.setActivePage(currPage as PagesType))
    localStorage.setItem('playList', JSON.stringify(playlist))
  }, [dispatch, playlist])
  const searchPageDone = useCallback(() => {
    if (checkCollectionLength(playlist, 'bigger')) {
      return false
    }

    if (checkCollectionLength(searchResult, 'equal')) {
      return true
    }

    return true
  }, [searchResult, playlist])
  const pageTypes: PageButton[] = useMemo(() => [
    {
      id: 'search', text: 'YouTube Search', disabled: activePage === 'search', onClick: clickHandler,
    },
    {
      id: 'game-selector',
      text: 'Game Options',
      disabled: ((): boolean => {
        if (activePage === 'game-selector') {
          return true
        }

        return searchPageDone()
      })(),
      onClick: clickHandler,
    },
    {
      id: 'game',
      text: 'Play!',
      disabled: ((): boolean => {
        if (activePage === 'game') {
          return true
        }

        if (gameLength === 0) {
          return true
        }

        return searchPageDone()
      })(),
      onClick: clickHandler,
    },
  ], [activePage, clickHandler, searchPageDone, gameLength])

  return (
    <section className={styles['page-selector']}>
      {pageTypes.map(({
        id, text, disabled, onClick,
      }) => (
        <button
          className={styles.btn}
          key={id}
          onClick={onClick}
          disabled={disabled}
          data-id={id}
          type="button"
        >
          {text}
        </button>
      ))}
    </section>
  )
}

export default PageSelector
