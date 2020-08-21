import React from 'react'
import { AppContext, Actions } from 'Store'
import { getYouTubeSearchResults } from 'utils'

const YouTubeSearch = () => {
  const [value, setValue] = React.useState('')
  const {
    state,
    dispatch,
  } = React.useContext(AppContext)

  const fetchYoutube = React.useCallback(() => {
    console.log(value)
    getYouTubeSearchResults(value).then(resp =>
      dispatch(Actions.fetchVideos({ list: resp, fetched: true })),
    )
  }, [dispatch, value])

  console.log(state)
  return (
    <>
      <input
        onChange={e => setValue(e.target.value)}
        type="text"
      />
      <button
        type="button"
        onClick={fetchYoutube}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => dispatch(Actions.playVideo())}
      >
        Play video
      </button>
    </>
  )
}

export default YouTubeSearch
