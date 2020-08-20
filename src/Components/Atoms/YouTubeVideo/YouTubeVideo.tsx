import React, { FunctionComponent, useContext } from 'react'
import { AppContext } from 'Store'

const YouTubeVideo: FunctionComponent = () => {
  const {
    state: {
      videos: { fetched },
      playback: { src: videoSrc, isPlaying },
    },
  } = useContext(AppContext)

  return (
    <>
      {fetched && isPlaying && (
      <iframe
        title="paw patroli"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoSrc}`}
    // src="https://www.youtube.com/embed/5mfHff-nvIA?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      )}
    </>
  )
}

export default YouTubeVideo
