import React, { FunctionComponent, useCallback } from 'react'

interface Props {
  onClickSearch: (searchValue: string) => void
}

const YouTubeSearch: FunctionComponent<Props> = ({ onClickSearch }) => {
  const [value, setValue] = React.useState('')
  const clickHandler = useCallback(() => {
    onClickSearch(value)
  }, [value, onClickSearch])

  return (
    <>
      <input
        onChange={e => setValue(e.target.value)}
        type="text"
        autoComplete="true"
      />
      <button
        type="button"
        onClick={clickHandler}
      >
        Submit
      </button>
    </>
  )
}

export default YouTubeSearch
