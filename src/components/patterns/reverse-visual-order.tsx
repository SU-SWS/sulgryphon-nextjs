import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

const ReverseVisualOrder = ({children, ...props}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={twMerge("flex flex-col-reverse", props.className)}>
      {children}
    </div>
  )
}
export default ReverseVisualOrder
