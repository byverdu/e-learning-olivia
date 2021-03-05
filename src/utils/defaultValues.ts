import { GameType } from 'Store/store.types';
import { arrayShuffle } from 'utils';
import { alphabet } from './alphabet';

type DefaultGameValues = string[] | number[] | (number|string)[]

const defaultNumbersGame = Array.from({ length: 30 }, (_, index) => index + 1)
const defaultLettersGame = alphabet()

export const getDefaultValues = (gameType: GameType): DefaultGameValues => {
  const defaultValues: {[key in GameType]: DefaultGameValues} = {
    letters: [...defaultLettersGame],
    numbers: [...defaultNumbersGame],
    'letters-numbers': arrayShuffle([...defaultLettersGame, ...defaultNumbersGame]) as (number|string)[],
    maths: [],
    spelling: [...defaultLettersGame],
  }

  return defaultValues[gameType]
}
