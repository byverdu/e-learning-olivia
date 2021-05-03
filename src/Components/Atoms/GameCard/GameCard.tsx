import React, {
  FunctionComponent, KeyboardEvent, createRef, useEffect, useCallback, ReactElement, useState,
} from 'react'
import classnames from 'classnames'
import { getNumbersWords, getRandomNumber } from 'utils';
import { GameType } from 'Store/store.types';
import { iconsList, SvgIcons } from '../Icon/icons.types';

import Icon from '../Icon';
import Loader from '../Loader';

import styles from './gameCard.scss'

interface Props {
  value: string | number
  keyupHandler: (
    e: KeyboardEvent,
    activeStyle: string,
    isValidSpelling?: boolean[],
  ) => void
  gameType: GameType
}

interface CardContent {
  icon: React.ReactNode
  title: string
  subTitle: string
}

const iconNumberRepeater = (icon: SvgIcons, value: number) => {
  const icons = []
  const iconSize = value / 5
  const size = () => {
    switch (true) {
      case iconSize > 4:
        return styles.micra
      case iconSize > 3:
        return styles.tiny
      case iconSize > 2:
        return styles.small
      case iconSize > 1:
        return styles.medium
      case iconSize < 1:
        return styles.big
      case iconSize === 0.2:
        return styles.huge
      default:
        return styles.small
    }
  }

  for (let i = value; i > 0; i -= 1) {
    icons.push(
      <Icon
        key={getRandomNumber(1)}
        name={icon}
        className={classnames(styles.icon, size())}
      />)
  }

  return icons
}

const getCardContent = (value: string | number): CardContent => {
  const icon = iconsList[Math.round(Math.random() * iconsList.length)]
  if (typeof value === 'number') {
    return {
      title: `${value}`,
      subTitle: getNumbersWords(`${value}`),
      icon: iconNumberRepeater(icon, Number(value)),
    }
  }

  const allIconsForLetter = iconsList.filter(item => item.charAt(0) === value)
  const index = Math.round(Math.random() * (allIconsForLetter.length - 1))
  const letterIcon = allIconsForLetter[index]

  return {
    title: `${value.toUpperCase()} - ${value}`,
    subTitle: letterIcon,
    icon: (
      <Icon
        key={getRandomNumber(1)}
        name={letterIcon}
        className={classnames(styles.icon, styles.huge)}
      />
    ),
  }
}

const SpellingLettersGame: FunctionComponent<{word: string}> = ({
  word,
}): ReactElement<HTMLHeadingElement> => {
  const wordToLetters = word.split('').map((letter, index) => (
    <span
      // eslint-disable-next-line react/no-array-index-key
      key={`${index}-${letter}`}
      data-index={index}
    >
      {letter}
    </span>
  ))

  return <h2 className={styles['sub-title']}>{wordToLetters}</h2>
}

const GameCard: FunctionComponent<Props> = ({ value, keyupHandler, gameType }) => {
  const [isLoading, setIsLoading] = useState(false)
  const isValidSpelling = []
  const cardRef = createRef<HTMLElement>()
  const { title, subTitle, icon } = getCardContent(value)
  const keyup = useCallback(e => {
    keyupHandler(e, styles['title-highlight-first-letter'], isValidSpelling)
  }, [keyupHandler, isValidSpelling])

  useEffect(() => {
    const currentElem = cardRef.current
    if (icon) {
      setIsLoading(false)
    }

    if (!isLoading) {
      currentElem.focus()
    }

    return () => {
      currentElem.querySelectorAll(`.${styles['title-highlight-first-letter']}`).forEach(item => item.classList.remove(styles['title-highlight-first-letter']))
    }
  }, [cardRef, icon, isLoading])

  return (
    <>
      {isLoading ? (
        <Loader
          size="medium"
          removeBackground
          text="Loading Card!"
        />
      ) : (
        <section
          ref={cardRef}
          data-value={gameType === 'spelling' ? subTitle : value}
          className={styles['game-card']}
          tabIndex={0}
          role="button"
          onKeyUp={keyup}
        >
          <h1 className={styles.title}>
            {title}
          </h1>
          <div className={styles['icons-container']}>
            {icon}
          </div>
          {gameType === 'spelling'
            ? <SpellingLettersGame word={subTitle} />
            : <h2 className={styles['sub-title']}>{subTitle}</h2>}

        </section>
      )}
    </>
  )
}

export default GameCard
