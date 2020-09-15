import React, { FunctionComponent, useCallback, useState } from 'react'

import { YoutubeRequest } from 'utils/getYouTubeSearchResults'
import Icon from 'Components/Atoms/Icon'
import styles from './youTubeSearch.scss'

interface Props {
  hasSearchResults: boolean
  hasPlaylist: boolean
  onClickSearch: (params: YoutubeRequest) => void
  searchClearHandler: () => void
  playlistClearHandler: (params: YoutubeRequest) => void
}

type VideoDuration = 'short' | 'medium' | 'long'

const videoLengths = new Map<VideoDuration, string>([
  ['long', '+ 20 minutes'],
  ['medium', '4 to 20 minutes'],
  ['short', '4 minutes'],
])

const YouTubeSearch: FunctionComponent<Props> = ({
  hasPlaylist,
  hasSearchResults,
  onClickSearch,
  searchClearHandler,
  playlistClearHandler,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [videoDuration, setVideoDuration] = useState<VideoDuration>('short')
  const clickHandler = useCallback(() => {
    onClickSearch({ searchTerm, videoDuration })
  }, [searchTerm, onClickSearch, videoDuration])

  const changeValueHandler = useCallback(e => {
    setSearchTerm(e.target.value)
  }, [setSearchTerm])
  const changeVideoDurationHandler = useCallback(e => {
    setVideoDuration(e.target.value)
  }, [setVideoDuration])

  return (
    <section className={styles['youtube-search']}>
      <input
        className={styles['search-text']}
        onChange={changeValueHandler}
        type="text"
        autoComplete="true"
        placeholder="Search Term..."
      />
      <div className={styles['video-duration']}>
        <div className={styles.wrapper}>
          {[...videoLengths.entries()].map(([value, text]) => (
            <label htmlFor={value}>
              <input
                defaultChecked={value === 'short'}
                onChange={changeVideoDurationHandler}
                name="videoDuration"
                id={value}
                value={value}
                type="radio"
              />
              {text}
            </label>
          ))}
        </div>
      </div>
      <div
        className={styles.search}
        tabIndex={0}
        role="button"
        onClick={clickHandler}
      >
        <Icon
          name="magnifier"
        />
      </div>
      <button
        className={styles.btn}
        disabled={!hasSearchResults}
        type="button"
        onClick={searchClearHandler}
      >
        Clear Search
      </button>
      <button
        className={styles.btn}
        disabled={!hasPlaylist}
        type="button"
        onClick={playlistClearHandler}
      >
        Clear Playlist
      </button>
    </section>
  )
}

export default YouTubeSearch
