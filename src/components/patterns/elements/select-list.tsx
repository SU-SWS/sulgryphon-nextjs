"use client"

import {Select} from "@base-ui/react/select"
import {MouseEvent, ReactNode, useId, useRef, useState} from "react"
import {ChevronDownIcon, XMarkIcon} from "@heroicons/react/20/solid"
import cn from "@/lib/utils/className"

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

const getLabel = (value: string, options: SelectOption[]): ReactNode =>
  options.find(option => option.value === value)?.label ?? null

/**
 * A chosen value in a multiple select, with a button to remove it. Hovering or focusing the button inverts
 * the chip and puts the focus box around the whole chip, as in the "Buttons and Links" spec.
 */
const SelectedChip = ({
  children,
  onRemove,
  disabled,
}: {
  children: ReactNode
  onRemove: (_event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}) => (
  <span className="mb-2 flex w-fit max-w-full items-stretch overflow-hidden rounded-[0.5rem] bg-archway pl-12 text-16 leading-tight text-white has-[button:focus-visible]:bg-fog-light has-[button:focus-visible]:text-archway has-[button:focus-visible]:outline-3 has-[button:focus-visible]:-outline-offset-3 has-[button:focus-visible]:outline-digital-blue has-[button:hover]:bg-fog-light has-[button:hover]:text-archway">
    <span className="overflow-hidden py-6 pr-6 text-ellipsis whitespace-nowrap">{children}</span>
    <button
      type="button"
      onClick={onRemove}
      disabled={disabled}
      // Clicks on the rest of the chip fall through to the trigger underneath; this button takes its own.
      className="group/remove pointer-events-auto flex shrink-0 cursor-pointer items-center bg-archway px-6 text-white focus-visible:outline-hidden"
    >
      <XMarkIcon
        width={20}
        className="border-b-2 border-transparent group-hover/remove:border-white group-focus-visible/remove:border-white"
        aria-hidden
      />
      <span className="sr-only">Remove {children}</span>
    </button>
  </span>
)

const Option = ({value, disabled, children}: {value: string; disabled?: boolean; children: ReactNode}) => (
  <Select.Item
    value={value}
    disabled={disabled}
    // A list item, as before, so the base `li` text size still applies.
    render={<li />}
    className={({selected, highlighted}) =>
      cn("m-0 mb-2 cursor-pointer overflow-hidden px-10 py-2 hocus:underline", {
        "bg-archway text-white": selected,
        underline: highlighted,
        "bg-black-10 text-black": !selected && highlighted,
        "cursor-default font-semibold text-cardinal-red hocus:no-underline": !selected && !highlighted && disabled,
        "hocus:bg-black-10 hocus:text-black": !selected && !highlighted && !disabled,
      })
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
  const triggerRef = useRef<HTMLButtonElement>(null)

  // The trigger's shape and floating label depend on whether something is chosen, so track the value
  // here even when the caller leaves the select uncontrolled.
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue>(defaultValue ?? (multiple ? [] : null))
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue
  const optionChosen = multiple && value ? value.length > 0 : !!value
  const chosenValues = Array.isArray(value) ? value : value ? [value] : []

  const changeValue = (newValue: SelectValue, event: Event | null) => {
    setUncontrolledValue(newValue)
    onChange?.(event, newValue)
  }

  const removeValue = (item: string, event: MouseEvent<HTMLButtonElement>) => {
    changeValue(
      chosenValues.filter(chosen => chosen !== item),
      event.nativeEvent
    )
    // The chip's button is about to unmount: keep keyboard focus in the select.
    triggerRef.current?.focus()
  }

  return (
    <div className="relative h-fit">
      <Select.Root<string, boolean>
        value={value}
        multiple={multiple}
        disabled={disabled}
        // The listbox has always been a plain dropdown: the page stays scrollable and interactive.
        modal={false}
        onValueChange={(newValue, eventDetails) => changeValue(newValue, eventDetails.event ?? null)}
      >
        {/*
          The chips' remove buttons can't sit inside the trigger (a button), so this box draws the field and the
          trigger is stretched across it underneath the content. Clicks anywhere but a remove button reach the
          trigger through the pointer-events-none content.
        */}
        <div
          className={cn("relative w-full border border-black-40 px-5 py-9 pl-15 text-left leading-tight", {
            "rounded-3xl": optionChosen,
            "rounded-full": !optionChosen,
          })}
        >
          <Select.Trigger
            ref={triggerRef}
            className="absolute inset-0 cursor-pointer rounded-[inherit]"
            aria-labelledby={labeledBy}
          >
            {/* The chosen values, for screen readers, as the visible ones are outside the trigger. */}
            {optionChosen && (
              <span className="sr-only">
                {chosenValues.map((item, index) => (
                  <span key={item}>
                    {index > 0 && ", "}
                    {getLabel(item, options)}
                  </span>
                ))}
              </span>
            )}
          </Select.Trigger>

          <div className="pointer-events-none relative flex flex-wrap justify-between">
            {label && (
              <div className={cn("relative type-0", {"top-[-15px] w-full": optionChosen})}>
                <div id={labelId} className="w-fit bg-white px-5">
                  {label}
                </div>
              </div>
            )}
            {optionChosen && (
              <div className="max-w-[calc(100%-30px)] overflow-hidden" aria-hidden={!multiple}>
                {multiple
                  ? chosenValues.map(item => (
                      <SelectedChip key={item} onRemove={event => removeValue(item, event)} disabled={disabled}>
                        {getLabel(item, options)}
                      </SelectedChip>
                    ))
                  : getLabel(chosenValues[0], options)}
              </div>
            )}

            {/* A flex box so the chevron stretches and stays centered when the value wraps, as before. */}
            <Select.Icon className="flex shrink-0">
              <ChevronDownIcon width={20} />
            </Select.Icon>
          </div>
        </div>

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
