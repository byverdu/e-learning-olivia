import React, { useContext } from 'react'
import YouTubeVideo from 'Components/Atoms/YouTubeVideo'
import VideoSelector from 'Components/Molecules/VideoSelector'
import { AppContext } from 'Store'

const PageVideo = () => {
  const { state: { currentTrack } } = useContext(AppContext)

  return (
    <>
      <YouTubeVideo currentTrack={currentTrack} />
      <VideoSelector />
    </>
  )
}

export default PageVideo
