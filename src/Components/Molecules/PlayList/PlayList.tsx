import React, { FunctionComponent, useContext } from 'react'
import { AppContext } from 'Store'

const PlayList: FunctionComponent = () => {
  const { state: { playList } } = useContext(AppContext)

  return (
    <>
      {Object.values(playList).map(({ videoId, thumbnail }) => (
        <div
          data-id={videoId}
          key={videoId}
        >
          <img
            src={thumbnail}
            alt=""
          />
        </div>
      ),
      )}
    </>
  )
}

export default PlayList
