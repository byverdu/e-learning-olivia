/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react'
import { AppContext, Actions } from 'Store'

type Props = Record<string, unknown>
type State = null
type Context = typeof AppContext

export default class YouTubeVideo extends Component<Props, State, Context> {
  static contextType = AppContext

  context: React.ContextType<typeof AppContext>

  player: YT.Player

  constructor(props) {
    super(props)

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
  }

  componentDidMount() {
    const { state: { player, videos, currentTrack } } = this.context

    if (player) {
      this.player = new player.Player('player', {
        height: '390',
        width: '640',
        videoId: videos[currentTrack],
        events: {
          onReady: e => {
            e.target.playVideo()
          },
          onStateChange: this.onPlayerStateChange,
        },
      })
    }
  }

  onPlayerStateChange(e: YT.OnStateChangeEvent) {
    const { dispatch } = this.context

    if (e.data === YT.PlayerState.ENDED) {
      dispatch(Actions.gameReset())
      dispatch(Actions.videoSetNext())
      dispatch(Actions.setActivePage('game'))
    }
  }

  render() {
    return (
      <div id="player" />
    )
  }
}
