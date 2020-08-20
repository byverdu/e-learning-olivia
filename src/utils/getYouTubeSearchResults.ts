import { from, of } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { map, switchMap, catchError, tap } from 'rxjs/operators'

interface YoutubeItem {
  id: {
    videoId: string
  }
  snippet: {
    liveBroadcastContent: 'live' | 'none'
  }
}

interface YoutubeResp {
  items: YoutubeItem[]
}

const fetchData = async (params: string) =>
  fromFetch(
    `http://localhost:9000/youtube-search?search=${params}`,
  ).pipe(
    switchMap(response => {
      if (response.ok) {
        // OK return data
        return response.json()
      }
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` })
    }),
    catchError(err => {
      // Network or other error, handle appropriately
      console.error(err)
      return of({ error: true, message: err.message })
    }),
  )

export const getYouTubeSearchResults = async (params: string) =>
  from(
    (await fetchData(params)).pipe(
      map((apiResp: YoutubeResp) =>
        apiResp.items
          .filter(
            ({ snippet: { liveBroadcastContent } }) =>
              liveBroadcastContent === 'none',
          )
          .map(({ id: { videoId } }) => videoId),
      ),
      tap(console.log),
    ),
  ).toPromise()
