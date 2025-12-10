"use client"
import {ReactElement, Children, useState, useEffect} from "react"

type Props = {
  /**
   * Number of random children to display
   * @default 3
   */
  count?: number
  /**
   * Child elements to randomly select from
   */
  children: ReactElement | ReactElement[]
}

const RandomizeChildren = ({children, count = 3}: Props) => {
  const childArray = Children.toArray(children) as ReactElement[]
  const [selected, setSelected] = useState<ReactElement[]>(() => {
    return childArray.slice(0, count)
  })

  useEffect(() => {
    const shuffled = [...(Children.toArray(children) as ReactElement[])].sort(() => Math.random() - 0.5)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(shuffled.slice(0, count))
  }, [children, count])

  return <>{selected}</>
}

export default RandomizeChildren
