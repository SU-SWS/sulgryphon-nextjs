import {ReactNodeLike} from "prop-types";

interface ConditionalProps {
  showWhen: boolean | any
  children: ReactNodeLike
}

const Conditional = ({showWhen, children}: ConditionalProps) => {
  if (showWhen) return <>{children}</>
  return <></>
}

export default Conditional