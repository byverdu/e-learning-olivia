import React, {
  FunctionComponent, useContext, useCallback, SyntheticEvent, DragEvent, useState,
} from 'react'
import { AppContext, Actions } from 'Store'
import { getRandomNumber } from 'utils'

import styles from './playlist.scss'

interface Props {
  removeItemHandler: (videoId: string) => void
}

const Playlist: FunctionComponent<Props> = ({ removeItemHandler }) => {
  const { state: { playlist }, dispatch } = useContext(AppContext)

  const removeHandler = useCallback((e: SyntheticEvent) => {
    removeItemHandler((e.target as HTMLButtonElement).dataset.id)
  }, [removeItemHandler])
  const [dragged, setDragged] = useState<HTMLDivElement>(undefined)

  return (
    <section
      className={styles.playlist}
    >
      {/* TODO create a list card */}
      {Object.values(playlist).map(({ videoId, thumbnail }) => (
        <div
          data-id={videoId}
          data-playlist
          draggable
          onDragStart={(ev: DragEvent) => {
            const elem = ev.currentTarget as HTMLDivElement
            setDragged(elem)
            elem.classList.add(styles['drag-start'])
          }}
          onDragOver={(ev: DragEvent) => {
            const elem = (ev.currentTarget as HTMLDivElement)
            ev.preventDefault();
            elem.insertAdjacentElement('beforebegin', dragged);
          }}
          onDragEnd={(ev: DragEvent) => {
            (ev.currentTarget as HTMLDivElement).classList.remove(styles['drag-start'])
            const videoIds = Array.from(document.querySelectorAll('div[data-playlist]'))
              .map((item: HTMLDivElement) => item.dataset.id)
            dispatch(Actions.videoReadyPlaylist(videoIds))
            dispatch(Actions.videoSetPlaylist())
          }}
          className={styles['playlist-item']}
          key={getRandomNumber()}
        >
          <button
            className={styles['clear-btn']}
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
    </section>
  )
}

export default Playlist
