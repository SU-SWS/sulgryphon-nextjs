import {ReactNode} from "react";

interface ConditionalProps {
  showWhen: boolean | any
  children: ReactNode
}

const Conditional = ({showWhen, children}: ConditionalProps) => {
  return (
    <>
      {showWhen && <>{children}</>}
    </>
  )
}

export default Conditional