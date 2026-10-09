"use client"

import {Select} from "@base-ui/react/select"
import {ReactNode, useId, useState} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {twMerge} from "tailwind-merge"

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

export type SelectValue = string | string[] | null

interface Props {
  options: SelectOption[]
  label?: string
  ariaLabelledby?: string
  defaultValue?: SelectValue
  onChange?: (_event: Event | null, _value: SelectValue) => void | null
  multiple?: boolean
  disabled?: boolean
  value?: SelectValue
  emptyLabel?: string
}

const renderSelectedValue = (value: SelectValue, options: SelectOption[]): ReactNode => {
  if (Array.isArray(value)) {
    return value.map(item => (
      <span
        key={item}
        className="mb-2 block max-w-full overflow-hidden rounded-[0.3rem] bg-archway p-5 text-ellipsis whitespace-nowrap text-white"
      >
        {renderSelectedValue(item, options)}
      </span>
    ))
  }
  const selectedOption = options.find(option => option.value === value)
  return selectedOption ? selectedOption.label : null
}

const Option = ({value, disabled, children}: {value: string; disabled?: boolean; children: ReactNode}) => (
  <Select.Item
    value={value}
    disabled={disabled}
    // A list item, as before, so the base `li` text size still applies.
    render={<li />}
    className={({selected, highlighted}) =>
      twMerge(
        "m-0 mb-2 cursor-pointer overflow-hidden px-10 py-2 hocus:underline",
        selected
          ? "bg-archway text-white " + (highlighted ? "underline" : "")
          : highlighted
            ? "bg-black-10 text-black underline"
            : disabled
              ? "cursor-default font-semibold text-cardinal-red hocus:no-underline"
              : "hocus:bg-black-10 hocus:text-black"
      )
    }
  >
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
)

const SelectList = ({
  options,
  label,
  multiple,
  ariaLabelledby,
  emptyLabel,
  defaultValue,
  value: controlledValue,
  onChange,
  disabled,
}: Props) => {
  const labelId = useId()
  const labeledBy = ariaLabelledby ?? labelId

  // The trigger's shape and floating label depend on whether something is chosen, so track the value
  // here even when the caller leaves the select uncontrolled.
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue>(defaultValue ?? (multiple ? [] : null))
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue
  const optionChosen = multiple && value ? value.length > 0 : !!value

  return (
    <div className="relative h-fit">
      <Select.Root<string, boolean>
        value={value}
        multiple={multiple}
        disabled={disabled}
        // The listbox has always been a plain dropdown: the page stays scrollable and interactive.
        modal={false}
        onValueChange={(newValue, eventDetails) => {
          setUncontrolledValue(newValue)
          onChange?.(eventDetails.event ?? null, newValue)
        }}
      >
        <Select.Trigger
          className={
            "w-full border border-black-40 px-5 py-9 pl-15 text-left leading-tight " +
            (optionChosen ? "rounded-3xl" : " rounded-full")
          }
          aria-labelledby={labeledBy}
        >
          <div className="flex flex-wrap justify-between">
            {label && (
              <div className={"relative " + (optionChosen ? "top-[-15px] w-full type-0" : "type-0")}>
                <div id={labelId} className="w-fit bg-white px-5">
                  {label}
                </div>
              </div>
            )}
            {optionChosen && (
              <div className="max-w-[calc(100%-30px)] overflow-hidden">{renderSelectedValue(value, options)}</div>
            )}

            {/* A flex box so the chevron stretches and stays centered when the value wraps, as before. */}
            <Select.Icon className="flex shrink-0">
              <ChevronDownIcon width={20} />
            </Select.Icon>
          </div>
        </Select.Trigger>

        <Select.Portal>
          {/* Open directly below the trigger at its full width, rather than over it. */}
          <Select.Positioner alignItemWithTrigger={false} side="bottom" align="start" className="z-[10]">
            <Select.Popup className="max-h-[300px] w-[var(--anchor-width)] overflow-y-scroll border border-black-20 bg-white pb-5 shadow-lg">
              <Select.List aria-labelledby={labeledBy} render={<ul className="list-unstyled" />}>
                {emptyLabel && !multiple && <Option value="">{emptyLabel}</Option>}

                {options.map(option => (
                  <Option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </Option>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default SelectList
