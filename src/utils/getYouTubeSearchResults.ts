import { from } from 'rxjs'
import { map } from 'rxjs/operators'

export const getYouTubeSearchResults = async (params: string) =>
  from(fetch(`http://localhost:9000/youtube-search?search=${params}`))
    .pipe(map(apiResp => apiResp.json()))
    .toPromise()
