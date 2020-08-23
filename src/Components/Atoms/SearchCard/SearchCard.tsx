import React, { FunctionComponent, useCallback, SyntheticEvent } from 'react'
import classnames from 'classnames';

import { SearchResult } from 'Store/store.types'

import styles from './searchCard.scss'

interface Props extends SearchResult {
  onCardClick: (videoId: string) => void
}

const SearchCard: FunctionComponent<Props> = ({
  videoId, thumbnail, onCardClick, selected,
}) => {
  const clickHandler = useCallback((e: SyntheticEvent) => {
    onCardClick((e.target as HTMLDivElement).dataset.id)
  }, [onCardClick])
  return (
    <div
      tabIndex={0}
      role="button"
      className={classnames(styles['search-card'], { [styles.selected]: selected })}
      data-id={videoId}
      key={videoId}
      onClick={clickHandler}
    >
      <img
        data-id={videoId}
        src={thumbnail}
        alt="video poster"
      />
    </div>
  )
}

export default SearchCard
