import {ReactNodeLike} from "prop-types";

interface ConditionalProps {
  showWhen: boolean | any
  children: ReactNodeLike
}

const Conditional = ({showWhen, children}: ConditionalProps) => {
  return (
    <>
      {showWhen && <>{children}</>}
    </>
  )
}

export default Conditional