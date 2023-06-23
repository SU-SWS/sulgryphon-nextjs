import useSelect, {SelectOptionDefinition, SelectProvider, SelectValue} from '@mui/base/useSelect';
import useOption from '@mui/base/useOption';
import {FocusEvent, KeyboardEvent, MouseEvent, ReactNode, useEffect, useId, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

interface Props {
  options: SelectOptionDefinition<string>[];
  label?: string
  ariaLabelledby?: string
  defaultValue?: any
  onChange?: (event: MouseEvent | KeyboardEvent | FocusEvent, value: SelectValue<string, boolean>) => void | null
  multiple?: boolean
  disabled?: boolean
  value?: SelectValue<string, boolean>
}

interface OptionProps {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}

const renderSelectedValue = (value: SelectValue<string, boolean>, options: SelectOptionDefinition<string>[]) => {

  if (Array.isArray(value)) {
    return value.map(item =>
      <span
        key={item}
        className="su-block su-bg-archway su-text-white su-rounded su-p-5 su-mb-2 su-whitespace-nowrap su-overflow-hidden su-text-ellipsis su-max-w-full"
      >
        {renderSelectedValue(item, options)}
      </span>);
  }
  const selectedOption = options.find((option) => option.value === value);
  return selectedOption ? selectedOption.label : null;
}

function CustomOption(props: OptionProps) {
  const {children, value, disabled = false} = props;
  const {getRootProps, highlighted, selected} = useOption({value, disabled, label: children});

  const selectedStyles = "su-bg-archway su-text-white " + (highlighted ? "su-underline" : "")
  const highlightedStyles = "su-bg-black-10 su-text-black su-underline"

  return (
    <li
      {...getRootProps()}
      className={"su-m-0 su-mb-2 su-py-2 su-px-10 su-cursor-pointer hocus:su-underline su-overflow-hidden " + (selected ? selectedStyles : (highlighted ? highlightedStyles : "hocus:su-bg-black-10 hocus:su-text-black"))}
    >
      {children}
    </li>
  );
}

const SelectList = ({options, label, multiple, ariaLabelledby, ...props}: Props) => {
  const labelId = useId();
  const labeledBy = ariaLabelledby ?? labelId;
  const listboxRef = useRef<HTMLUListElement>(null);
  const [listboxVisible, setListboxVisible] = useState(false);

  const {getButtonProps, getListboxProps, contextValue, value} = useSelect<string, boolean>({
    listboxRef,
    onOpenChange: setListboxVisible,
    open: listboxVisible,
    multiple,
    ...props
  });

  useEffect(() => {
    if (listboxVisible) {
      listboxRef.current?.focus();
    }
  }, [listboxVisible]);

  const optionChosen = (multiple && value) ? value.length > 0 : !!value;

  return (
    <div className="su-relative su-h-fit">
      <button
        {...getButtonProps()}
        className="su-w-full su-border su-border-black-40 su-rounded su-text-left su-p-5"
        aria-labelledby={labeledBy}
      >
        <div className="su-flex su-justify-between su-flex-wrap">
          {label &&
            <div className={"su-relative " + (optionChosen ? "su-text-m0 su-top-[-15px] su-w-full" : "su-text-m1")}>
              <div id={labelId} className="su-bg-white su-w-fit su-px-5">
                {label}
              </div>
            </div>
          }
          {optionChosen &&
            <div className="su-overflow-hidden su-max-w-[calc(100%-30px)]">
              {renderSelectedValue(value, options)}
            </div>
          }

          <ChevronDownIcon width={20} className="su-flex-shrink-0"/>
        </div>
      </button>

      <div
        className={"su-absolute su-z-[10] su-w-full su-top-full su-left-0 su-max-h-[300px] su-pb-5 su-overflow-y-scroll su-shadow-lg su-border su-border-black-20 su-bg-white " + (listboxVisible ? '' : 'su-hidden')}>
        <ul
          className={"su-list-unstyled " + (listboxVisible ? '' : 'su-hidden')}
          {...getListboxProps()}
          aria-hidden={!listboxVisible}
          aria-labelledby={labeledBy}
        >
          <SelectProvider value={contextValue}>
            {options.map((option) => {
              return (
                <CustomOption key={option.value} value={option.value}>
                  {option.label}
                </CustomOption>
              );
            })}
          </SelectProvider>
        </ul>
      </div>
    </div>
  );
}


export default SelectList;