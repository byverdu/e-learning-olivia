/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

interface State {
  hasError: boolean
  error: Error
}

export default class ErrorBoundary extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch', error, errorInfo.componentStack);
  }

  render() {
    const { children } = this.props

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      const { error: { message, stack } } = this.state
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{message}</p>
          <p>{stack}</p>
        </div>
      );
    }

    return children;
  }
}
