import React, {
  FunctionComponent, useContext, createRef, useCallback, SyntheticEvent,
} from 'react'
import classnames from 'classnames'
import { AppContext, Actions } from 'Store'

import styles from './videoSelector.scss'

function smoothScrollTo(elem: HTMLElement, direction: 'left' | 'right') {
  const newMaxScroll = 150
  const intervalScroll = 60
  const newScrollLeft = direction === 'right' ? elem.scrollLeft + newMaxScroll : elem.scrollLeft - newMaxScroll

  const interval = setInterval(() => {
    let { scrollLeft } = elem
    const stopInterval = direction === 'right' ? scrollLeft >= newScrollLeft : scrollLeft <= newScrollLeft
    if (stopInterval) {
      clearInterval(interval)
    } else {
      elem.scrollTo({
        left: direction === 'right' ? scrollLeft += intervalScroll : scrollLeft -= intervalScroll,
        behavior: 'smooth',
      });
    }
  }, 25)
}

const VideoSelector: FunctionComponent = () => {
  const { state: { playlist, videos }, dispatch } = useContext(AppContext)
  const scrollAbleArea = createRef<HTMLElement>()
  const scrollHandler = useCallback((e: SyntheticEvent) => {
    smoothScrollTo(scrollAbleArea.current, (e.target as HTMLElement).dataset.direction as 'left' | 'right')
  }, [scrollAbleArea])
  const clickSelectVideoHandler = useCallback((e: SyntheticEvent) => {
    dispatch(Actions.videoPlaySelected((e.target as HTMLElement).dataset.id))
  }, [dispatch])

  return (
    <section
      className={styles['video-selector']}
    >
      <div className={styles.navigation}>
        <span
          role="button"
          tabIndex={0}
          onClick={scrollHandler}
          data-direction="left"
          className={classnames(styles.item, styles.left)}
        >
          &lt;
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={scrollHandler}
          data-direction="right"
          className={classnames(styles.item, styles.right)}
        >
          &gt;
        </span>
      </div>

      <section
        className={styles.container}
        ref={scrollAbleArea}
      >
        {videos.map(videoId => {
          const playlistItem = playlist[videoId]
          return (
            <img
              onClick={clickSelectVideoHandler}
              className={styles.thumbnail}
              key={playlistItem.videoId}
              data-id={playlistItem.videoId}
              alt="video"
              src={playlistItem.thumbnail}
            />
          )
        }) }
      </section>
    </section>
  )
}

export default VideoSelector
