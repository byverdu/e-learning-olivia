/* eslint-disable @typescript-eslint/no-extra-semi */
import { useEffect, useState } from 'react'
import { getYouTubeSearchResults } from 'utils'

export const useYouTubeSearch = (query: string) => {
  const [resp, setResp] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      const youtubeResp = await getYouTubeSearchResults(query)
      setResp(youtubeResp)
    })()
  }, [query])

  return resp
}
