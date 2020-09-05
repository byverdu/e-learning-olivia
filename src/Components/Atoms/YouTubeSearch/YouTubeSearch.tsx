import React, { FunctionComponent, useCallback, useState } from 'react'

import { YoutubeRequest } from 'utils/getYouTubeSearchResults'
import styles from './youTubeSearch.scss'

interface Props {
  onClickSearch: (params: YoutubeRequest) => void
}

const YouTubeSearch: FunctionComponent<Props> = ({ onClickSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [videoDuration, setVideoDuration] = useState<'short'|'medium'|'long'>('short')
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
        onChange={changeValueHandler}
        type="text"
        autoComplete="true"
      />
      <fieldset className={styles['video-duration']}>
        <label htmlFor="long">
          <input
            onChange={changeVideoDurationHandler}
            name="videoDuration"
            id="long"
            value="long"
            type="radio"
          />
          + 20 minutes
        </label>
        <label htmlFor="medium">
          <input
            onChange={changeVideoDurationHandler}
            name="videoDuration"
            id="medium"
            value="medium"
            type="radio"
          />
          4 to 20 minutes
        </label>
        <label htmlFor="short">
          <input
            onChange={changeVideoDurationHandler}
            defaultChecked
            name="videoDuration"
            id="short"
            value="short"
            type="radio"
          />
          4 minutes
        </label>
      </fieldset>
      <button
        type="button"
        onClick={clickHandler}
      >
        Submit
      </button>
    </section>
  )
}

export default YouTubeSearch
