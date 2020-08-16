interface Props {
  name: string
}

declare module '*.svg' {
  const content: {
    default: React.RefForwardingComponent<Props>
  }
  export = content
}
