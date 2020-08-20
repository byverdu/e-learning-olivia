import React, { Component, ReactNode } from 'react'
import Loader from '../Components/Atoms/Loader/Loader';

interface State { player: unknown }

interface Props { children: ReactNode }

export default function withScriptLoader(WrappedComponent) {
  return class extends Component<Props, State> {
    scriptSrc = 'https://www.youtube.com/iframe_api'

    constructor(props) {
      super(props)

      this.state = {
        player: undefined,
      }

      this.loadScript = this.loadScript.bind(this)
    }

    componentDidMount() {
      this.loadScript()
        .then(resp => {
          resp.previousElementSibling.addEventListener('load', () => {
            if (YT) {
              this.setState({
                player: YT,
              })
            } else {
              throw new Error('YouTube Player hasn\'t been loaded')
            }
          })
        })
    }

    loadScript() {
      return new Promise<HTMLScriptElement>((resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.src = this.scriptSrc
        script.onload = () => resolve(script)
        script.onerror = reject

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      })
    }

    render() {
      const { player } = this.state
      const { children } = this.props

      return (
        <>
          {!player ? (
            <Loader
              size="large"
              text="Loading App"
            />
          ) : (
            <WrappedComponent
              player={player}
            >
              {children}
            </WrappedComponent>
          )}
        </>
      );
    }
  }
}