import React, {
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useRef,
} from 'react'
import { SvgIcons } from './icons.types'

interface Props {
  className?: string
  name: SvgIcons
}

const fetchIcon = async (name: SvgIcons = 'apple') => {
  try {
    const icon = await import(`./svgs/${name}.svg`)

    return icon.default
  } catch (e) {
    throw new Error(e)
  }
}

export const Icon: FunctionComponent<Props> = ({
  name,
  className,
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const iconRef = useRef()
  useEffect(() => {
    let mounted = true
    fetchIcon(name).then(resp => {
      if (mounted) {
        iconRef.current = resp
        setLoading(false)
      }
    })

    // eslint-disable-next-line no-return-assign
    return () => mounted = false
  }, [name])

  const { current: LazyIcon } = iconRef || undefined

  return !isLoading && typeof LazyIcon !== 'undefined' ? (
    <Suspense fallback="Loading">
      <LazyIcon className={className} />
    </Suspense>
  ) : null
}

Icon.defaultProps = {
  className: '',
}

export default Icon
