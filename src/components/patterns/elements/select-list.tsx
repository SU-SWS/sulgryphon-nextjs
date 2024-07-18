"use client"

import {useSelect, SelectOptionDefinition, SelectProvider, SelectValue} from "@mui/base/useSelect"
import {useOption} from "@mui/base/useOption"
import {KeyboardEvent, MouseEvent, FocusEvent, ReactNode, RefObject, useEffect, useId, useLayoutEffect, useRef} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {useBoolean, useIsClient} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"

interface Props {
  options: SelectOptionDefinition<string>[]
  label?: string
  ariaLabelledby?: string
  defaultValue?: any
  onChange?: (_event: MouseEvent | KeyboardEvent | FocusEvent | null, _value: SelectValue<string, boolean>) => void | null
  multiple?: boolean
  disabled?: boolean
  value?: SelectValue<string, boolean>
}

interface OptionProps {
  rootRef: RefObject<HTMLUListElement>
  children?: ReactNode
  value: string
  disabled?: boolean
}

const renderSelectedValue = (value: SelectValue<string, boolean>, options: SelectOptionDefinition<string>[]) => {
  // @mui/utils@5.14.14
  // @mui/types@7.2.6
  if (Array.isArray(value)) {
    return value.map(item => (
      <span
        key={item}
        className="mb-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded bg-archway p-5 text-white"
      >
        {renderSelectedValue(item, options)}
      </span>
    ))
  }
  const selectedOption = options.find(option => option.value === value)
  return selectedOption ? selectedOption.label : null
}

function CustomOption(props: OptionProps) {
  const {children, value, rootRef, disabled = false} = props
  const {getRootProps, highlighted, selected} = useOption({rootRef: rootRef, value, disabled, label: children})
  const {id, ...otherProps}: {id: string} = getRootProps()
  const selectedStyles = "bg-archway text-white " + (highlighted ? "underline" : "")
  const highlightedStyles = "bg-black-10 text-black underline"

  useEffect(() => {
    if (highlighted && id && rootRef?.current?.parentElement) {
      const item = document.getElementById(id)
      if (item) {
        const itemTop = item?.offsetTop
        const itemHeight = item?.offsetHeight
        const parentScrollTop = rootRef.current.parentElement.scrollTop
        const parentHeight = rootRef.current.parentElement.offsetHeight

        if (itemTop < parentScrollTop) {
          rootRef.current.parentElement.scrollTop = itemTop
        }

        if (itemTop + itemHeight > parentScrollTop + parentHeight) {
          rootRef.current.parentElement.scrollTop = itemTop - parentHeight + itemHeight
        }
      }
    }
  }, [rootRef, id, highlighted])

  return (
    <li
      {...otherProps}
      id={id}
      className={"m-0 mb-2 cursor-pointer overflow-hidden px-10 py-2 hocus:underline " + (selected ? selectedStyles : highlighted ? highlightedStyles : "hocus:bg-black-10 hocus:text-black")}
    >
      {children}
    </li>
  )
}

const SelectList = ({options, label, multiple, ariaLabelledby, ...props}: Props) => {
  const labelId = useId()
  const labeledBy = ariaLabelledby ?? labelId
  const listboxRef = useRef<HTMLUListElement>(null)
  const {value: listboxVisible, setFalse: hideListbox, setValue: setListBoxVisible} = useBoolean(false)
  const outsideClickProps = useOutsideClick(hideListbox)
  const isClient = useIsClient()

  const {getButtonProps, getListboxProps, contextValue, value} = useSelect<string, boolean>({
    listboxRef,
    onOpenChange: setListBoxVisible,
    open: listboxVisible,
    multiple,
    ...props,
  })

  useEffect(() => listboxRef.current?.focus(), [listboxVisible])

  useLayoutEffect(() => {
    const parentContainer = listboxRef.current?.parentElement?.getBoundingClientRect()
    if (parentContainer && (parentContainer.bottom > window.innerHeight || parentContainer.top < 0)) {
      listboxRef.current?.parentElement?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }
  }, [listboxVisible, value])

  const optionChosen = multiple && value ? value.length > 0 : !!value

  if (!isClient) return null

  return (
    <div
      className="relative h-fit"
      {...outsideClickProps}
    >
      <button
        {...getButtonProps()}
        className="w-full rounded-3xl border border-black-40 p-5 pl-15 text-left"
        aria-labelledby={labeledBy}
      >
        <div className="flex flex-wrap justify-between">
          {label && (
            <div className={"relative " + (optionChosen ? "top-[-15px] w-full text-m0" : "text-m0")}>
              <div
                id={labelId}
                className="w-fit bg-white px-5"
              >
                {label}
              </div>
            </div>
          )}
          {optionChosen && <div className="max-w-[calc(100%-30px)] overflow-hidden">{renderSelectedValue(value, options)}</div>}

          <ChevronDownIcon
            width={20}
            className="flex-shrink-0"
          />
        </div>
      </button>

      <div className={"absolute left-0 top-full z-[10] max-h-[300px] w-full overflow-y-scroll border border-black-20 bg-white pb-5 shadow-lg " + (listboxVisible ? "" : "hidden")}>
        <ul
          {...getListboxProps()}
          className={"list-unstyled " + (listboxVisible ? "" : "hidden")}
          aria-hidden={!listboxVisible}
          aria-labelledby={labeledBy}
        >
          <SelectProvider value={contextValue}>
            {options.map(option => {
              return (
                <CustomOption
                  key={option.value}
                  value={option.value}
                  rootRef={listboxRef}
                >
                  {option.label}
                </CustomOption>
              )
            })}
          </SelectProvider>
        </ul>
      </div>
    </div>
  )
}

export default SelectList
