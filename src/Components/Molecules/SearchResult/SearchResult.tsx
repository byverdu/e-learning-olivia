import React, {
  FunctionComponent, useContext, useCallback,
} from 'react'
import { AppContext, Actions } from 'Store'

import SearchCard from 'Components/Atoms/SearchCard'

import styles from './searchResult.scss'

const SearchResult: FunctionComponent = () => {
  const { state: { searchResult }, dispatch } = useContext(AppContext)
  const clickCardHandler = useCallback((videoId: string) => {
    dispatch(Actions.videoSelected(videoId))
  }, [dispatch])

  return (
    <section className={styles['search-result']}>
      {searchResult.map(({ videoId, thumbnail, selected }) => (
        <SearchCard
          selected={selected}
          onCardClick={clickCardHandler}
          videoId={videoId}
          thumbnail={thumbnail}
        />
      ))}
    </section>
  )
}

export default SearchResult
