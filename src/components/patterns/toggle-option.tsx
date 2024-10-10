import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"
import {CheckIcon} from "@heroicons/react/16/solid"

const ToggleOption = ({
  name,
  checked,
  onChange,
  first,
  last,
  children,
  ...props
}: HTMLAttributes<HTMLLabelElement> & {
  name: string
  checked: boolean
  onChange: () => void
  first?: boolean
  last?: boolean
  defaultChecked?: boolean
}) => {
  return (
    <label {...props} className="group cursor-pointer text-black-80">
      <input type="radio" name={name} className="peer sr-only" checked={checked} onChange={onChange} />

      <span
        className={twMerge(
          "peer-focus:nounderline flex items-center border border-black-80 p-4 pl-0 pr-32 text-18 leading-[25px] no-underline hover:text-cardinal-red-dark hover:underline peer-checked:border-2 peer-checked:bg-[#979694] peer-checked:bg-opacity-20 peer-checked:pl-10 peer-checked:pr-13 peer-checked:text-black peer-checked:no-underline peer-checked:transition-all peer-checked:ease-in-out peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694] peer-focus:bg-opacity-10 peer-focus:text-black peer-focus:underline peer-focus-visible:outline peer-focus-visible:outline-blue-500 peer-focus-visible:ring sm:whitespace-nowrap sm:leading-[30px] sm:peer-checked:pl-16 sm:peer-checked:pr-32 peer-checked:[&_svg]:text-black",
          clsx({
            "rounded-l-full": first,
            "rounded-r-full": last,
            "border-r-0": !last,
          })
        )}
      >
        <CheckIcon width={20} className="mr-3 text-transparent" />
        {children}
      </span>
    </label>
  )
}
export default ToggleOption
