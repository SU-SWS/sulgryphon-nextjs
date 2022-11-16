import {ReactNodeLike} from "prop-types";

const Conditional = ({showWhen, children}: { showWhen: boolean, children: ReactNodeLike }) => {
  if (showWhen) return <>{children}</>
  return <></>
}

export default Conditional