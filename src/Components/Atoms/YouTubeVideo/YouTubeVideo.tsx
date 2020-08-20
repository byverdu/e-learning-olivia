import React, { FunctionComponent, useContext, useEffect } from 'react'
import { AppContext } from 'Store'

const YouTubeVideo: FunctionComponent = () => {
  const {
    state: {
      player,
      videos: { fetched },
      playback: { src: videoSrc, isPlaying },
    },
  } = useContext(AppContext)

  useEffect(() => {
    // eslint-disable-next-line no-new
    new player.Player('player', {
      height: '390',
      width: '640',
      videoId: videoSrc,
    })
  }, [player, videoSrc])

  return (
    <>
      {fetched && isPlaying && (
        <div id="player" />
      )}
    </>
  )
}

export default YouTubeVideo
