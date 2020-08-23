import React, {
  FunctionComponent, useContext, useCallback, SyntheticEvent,
} from 'react'
import { AppContext } from 'Store'

import styles from './playlist.scss'

interface Props {
  clearHandler: () => void
  removeItemHandler: (videoId: string) => void
}

const PlayList: FunctionComponent<Props> = ({ clearHandler, removeItemHandler }) => {
  const { state: { playList } } = useContext(AppContext)

  const removeHandler = useCallback((e: SyntheticEvent) => {
    removeItemHandler((e.target as HTMLButtonElement).dataset.id)
  }, [removeItemHandler])

  return (
    <section className={styles.playlist}>
      {Object.values(playList).map(({ videoId, thumbnail }) => (
        <div
          key={videoId}
        >
          <button
            data-id={videoId}
            type="button"
            onClick={removeHandler}
          >
            X
          </button>
          <img
            src={thumbnail}
            alt=""
          />
        </div>
      ),
      )}
      <button
        type="button"
        onClick={clearHandler}
      >
        Clear Playlist
      </button>
    </section>
  )
}

export default PlayList
