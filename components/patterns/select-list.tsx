import Select from "react-select";
import {MutableRefObject, PropsWithoutRef, useId} from "react";

interface Props extends PropsWithoutRef<any> {
  selectRef: MutableRefObject<any> | null
}

const ValueContainer = ({children, hasValue, isMulti, ...props}) => {
  const label = props.selectProps['placeholder'] ?? props.selectProps['aria-label'];
  console.log(props.selectProps['aria-label'], props.selectProps);
  return (
    <div className="su-flex-1">
      {(label && hasValue) &&
        <div className="su-p-4 su-pl-10 su-w-full su-text-black su-text-[18px]">{label}</div>
      }
      <div
        className={(isMulti ? "su-flex su-flex-wrap " : "su-grid su-grid-cols-1 ") + "su-items-center su-relative su-overflow-hidden su-px-[8px] su-py-[2px]"}>
        {children}
      </div>
    </div>
  )
}

const SelectList = ({selectRef = null, ...props}: Props) => {
  const formId = useId();
  const isMulti = props.isMulti ?? false
  props.placeholder = props.placeholder ?? null;

  const isStyling = false;
  return (
    <Select
      ref={selectRef}
      menuShouldScrollIntoView
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
      isClearable={false}
      instanceId={formId}
      name={formId}
      components={{
        IndicatorSeparator: () => null,
        MultiValueRemove: () => null,
        ValueContainer,
      }}
      styles={{
        clearIndicator: (baseStyles, state) => ({
          ...baseStyles,
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          height: 'fit-content',
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          color: '#5d4b3c',
        }),
        group: (baseStyles, state) => ({
          ...baseStyles,
        }),
        groupHeading: (baseStyles, state) => ({
          ...baseStyles,
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
        }),
        indicatorsContainer: (baseStyles, state) => ({
          ...baseStyles,
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
        }),
        loadingIndicator: (baseStyles, state) => ({
          ...baseStyles,
        }),
        loadingMessage: (baseStyles, state) => ({
          ...baseStyles,
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
        }),
        menuList: (baseStyles, state) => ({
          ...baseStyles,
        }),
        menuPortal: (baseStyles, state) => ({
          ...baseStyles,
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          background: '#5d4b3c',
          borderRadius: '5px',
          padding: '5px',
        }),
        multiValueLabel: (baseStyles, state) => ({
          ...baseStyles,
          color: '#fff',
        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
        }),
        noOptionsMessage: (baseStyles, state) => ({
          ...baseStyles,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected ? "#5d4b3c" : (state.isDisabled ? "#eaeaea" : (state.isFocused ? "#f0f0f0" : "#fff")),
          color: state.isSelected ? "#fff" : (state.isDisabled ? "#000" : (state.isFocused ? "#5d4b3c" : "#000")),
          textDecoration: state.isFocused ? "underline" : "none",
          fontWeight: state.isFocused ? "600" : "normal",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: '#2E2D29',
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,

        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
        }),
      }}
      defaultMenuIsOpen={isStyling}
      {...props}
    />
  )
}

export default SelectList;