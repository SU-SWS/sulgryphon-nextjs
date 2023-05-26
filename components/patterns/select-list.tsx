import Select from "react-select";
import {MutableRefObject, PropsWithoutRef, useId} from "react";

interface Props extends PropsWithoutRef<any> {
  selectRef: MutableRefObject<any> | null
}

const SelectList = ({selectRef = null, ...props}: Props) => {
  const formId = useId();
  const isMulti = props.isMulti ?? false

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
      }}
      styles={{
        clearIndicator: (baseStyles, state) => ({
          ...baseStyles,
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
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
        }),
        multiValueLabel: (baseStyles, state) => ({
          ...baseStyles,
        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
        }),
        noOptionsMessage: (baseStyles, state) => ({
          ...baseStyles,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor:  state.isSelected ? "#5D4B3C" : (state.isDisabled ? "#EAEAEA" : (state.isFocused ? "#5D4B3C": "#FFFFFF")),
          color: state.isSelected ? "#FFFFFF" : (state.isDisabled ? "#000000" : (state.isFocused ? "#FFFFFF": "#000000")),
          textDecoration: state.isFocused ? "underline" : "none",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
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