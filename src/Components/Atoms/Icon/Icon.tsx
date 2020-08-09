import React, {
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useRef,
} from 'react'

type SvgIcons = 'star'

interface Props {
  className?: string
  name: SvgIcons
}

const fetchIcon = async (name: SvgIcons) => {
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
    fetchIcon(name).then(resp => {
      iconRef.current = resp
      setLoading(false)
    })
  }, [name])

  const { current: LazyIcon } = iconRef || undefined

  return !isLoading && typeof LazyIcon !== 'undefined' ? (
    <Suspense fallback="Loading">
      <LazyIcon className={className} />
    </Suspense>
  ) : (
    <div>Icon {name}, not Found</div>
  )
}

Icon.defaultProps = {
  className: '',
}

export default Icon
