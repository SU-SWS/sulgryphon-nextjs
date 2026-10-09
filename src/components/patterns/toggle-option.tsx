import {FormEvent, HTMLAttributes} from "react"
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
  onChange: (_e: FormEvent<HTMLInputElement>) => void
  first?: boolean
  last?: boolean
  defaultChecked?: boolean
}) => {
  return (
    <label {...props} className="group cursor-pointer text-black-80">
      <input type="radio" name={name} className="peer sr-only" checked={checked} onChange={onChange} />

      <span
        className={twMerge(
          "flex items-center border border-black-80 p-5 pr-32 pl-0 text-18 leading-normal no-underline peer-checked:border-2 peer-checked:bg-[#979694]/20 peer-checked:pr-13 peer-checked:pl-10 peer-checked:text-black peer-checked:no-underline peer-checked:transition-all peer-checked:ease-in-out peer-focus:border-2 peer-focus:border-black-80 peer-focus:bg-[#979694]/10 peer-focus:text-black peer-focus-visible:underline peer-focus-visible:ring-3 peer-focus-visible:ring-blue-500/50 peer-focus-visible:outline-blue-500 peer-focus-visible:outline-solid hover:text-cardinal-red-dark hover:underline sm:whitespace-nowrap sm:peer-checked:pr-32 sm:peer-checked:pl-16 peer-checked:hocus-visible:underline peer-checked:[&_svg]:text-black",
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
