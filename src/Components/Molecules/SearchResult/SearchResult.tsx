import React, { FunctionComponent } from 'react'
import { getRandomNumber } from 'utils'
import { AppState } from 'Store/store.types'

import SearchCard from 'Components/Atoms/SearchCard'

import styles from './searchResult.scss'

interface Props {
  setVideoPlayLis: (videoId: string) => void,
  searchResult: AppState['state']['searchResult']
}

const SearchResult: FunctionComponent<Props> = ({ setVideoPlayLis, searchResult }) =>
  (
    <section className={styles['search-result']}>
      {Object.values(searchResult).map(({ videoId, thumbnail, selected }) => (
        <SearchCard
          key={getRandomNumber()}
          selected={selected}
          onCardClick={setVideoPlayLis}
          videoId={videoId}
          thumbnail={thumbnail}
        />
      ))}
    </section>
  )

export default SearchResult
