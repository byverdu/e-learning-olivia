import { from, of, Observable } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import {
  map, switchMap, catchError, tap,
} from 'rxjs/operators'

type ThumbNail = { url: string, width: number, height: number }

interface YoutubeItem {
  id: {
    videoId: string
  }
  snippet: {
    liveBroadcastContent: 'live' | 'none',
    thumbnails: {
      default: ThumbNail
      medium: ThumbNail
      high: ThumbNail
    }
  }
}

interface YoutubeResp {
  items: YoutubeItem[]
}

const fetchData = async (params: string): Promise<Observable<YoutubeResp>> =>
  fromFetch(
    `http://localhost:9000/youtube-search?search=${params}`,
  )
  // const fetchData = async () =>
  //   from(fetch('/mockData'))
    .pipe(
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

export const getYouTubeSearchResults = async (params: string): Promise<{
  videoId: string,
  thumbnail: string,
  selected: boolean
}[]> =>
  from(
    (await fetchData(params)).pipe(
      map((apiResp: YoutubeResp) =>
        apiResp.items
          .filter(
            ({ snippet: { liveBroadcastContent } }) =>
              liveBroadcastContent === 'none',
          )
          .map(({
            id: { videoId },
            snippet: { thumbnails: { medium: { url: thumbnail } } },
          }) => ({ videoId, thumbnail, selected: false })),
      ),
      tap(console.log),
    ),
  ).toPromise()
