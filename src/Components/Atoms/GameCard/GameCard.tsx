import React, { FunctionComponent, KeyboardEvent } from 'react'
import { GameType } from 'Store/store.types';

interface Props {
  gameType: GameType
  value: string
  keyupHandler: (e: KeyboardEvent) => void
}

const GameCard: FunctionComponent<Props> = ({ gameType, value, keyupHandler }) => {
  console.log('aloha')

  return (
    <section
      data-value={value}
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid',
        padding: '10px',
        margin: '10px',
      }}
      tabIndex={0}
      role="button"
      onKeyUp={keyupHandler}
    >
      <h1>{value}</h1>
    </section>
  )
}

export default GameCard
