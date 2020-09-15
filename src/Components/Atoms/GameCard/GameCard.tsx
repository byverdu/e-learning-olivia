import React, {
  FunctionComponent, KeyboardEvent, createRef, useEffect, useCallback,
} from 'react'
import classnames from 'classnames'
import { getNumbersWords, getRandomNumber } from 'utils';
import { iconsList, SvgIcons } from '../Icon/icons.types';

import Icon from '../Icon';

import styles from './gameCard.scss'

interface Props {
  value: string | number
  keyupHandler: (e: KeyboardEvent, activeStyle: string) => void
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

const GameCard: FunctionComponent<Props> = ({ value, keyupHandler }) => {
  const cardRef = createRef<HTMLElement>()
  const cardContent = getCardContent(value)
  const keyup = useCallback(e => {
    keyupHandler(e, styles.active)
  }, [keyupHandler])

  useEffect(() => {
    const currentElem = cardRef.current
    currentElem.focus()

    return () => {
      currentElem.classList.remove(styles.active)
    }
  }, [cardRef])

  return (
    <section
      ref={cardRef}
      data-value={value}
      className={styles['game-card']}
      tabIndex={0}
      role="button"
      onKeyUp={keyup}
    >
      <h1 className={styles.title}>
        {cardContent.title}
      </h1>
      <div className={styles['icons-container']}>
        {cardContent.icon}
      </div>
      <h2 className={styles['sub-title']}>{cardContent.subTitle}</h2>
    </section>
  )
}

export default GameCard
