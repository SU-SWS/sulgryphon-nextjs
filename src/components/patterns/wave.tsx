import {HTMLAttributes} from "react"

const Wave = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg viewBox="0 0 1500 70" aria-hidden={true} {...props}>
      <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="fill-white"></path>
    </svg>
  )
}
export default Wave
