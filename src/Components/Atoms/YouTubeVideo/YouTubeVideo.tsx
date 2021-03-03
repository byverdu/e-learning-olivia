/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react'
import { AppContext, Actions } from 'Store'

interface Props {
  currentTrack: number
}
interface State {
  currentTrack: number
}type Context = typeof AppContext

export default class YouTubeVideo extends Component<Props, State, Context> {
  static contextType = AppContext

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.currentTrack !== prevState.currentTrack) {
      return { currentTrack: nextProps.currentTrack };
    }
    return null
  }

  context: React.ContextType<typeof AppContext>

  player: YT.Player

  constructor(props: Props) {
    super(props)

    this.state = {
      currentTrack: props.currentTrack,
    }

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
  }

  componentDidMount() {
    const { state: { player, videos } } = this.context
    const { currentTrack } = this.state

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

  componentDidUpdate(prevProps: Props) {
    const { state: { videos } } = this.context
    const { currentTrack } = this.state

    if (currentTrack !== prevProps.currentTrack) {
      this.player.loadVideoById(videos[currentTrack])
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.context

    dispatch(Actions.gameReset())
    this.player.destroy()
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
