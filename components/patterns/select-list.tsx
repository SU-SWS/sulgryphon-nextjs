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
      unstyled
      menuShouldScrollIntoView
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
      styles={{

      }}
      classNames={{
        option: (state) => "su-p-10 su-transition " + (state.isDisabled ? "su-text-black-50": (state.isFocused ? 'su-bg-cardinal-red-dark su-text-white su-underline' : (state.isSelected ? ' su-bg-black-10' : ''))),
        clearIndicator: (state) => (state.isFocused ? "su-underline" : "hocus:su-underline"),
        container: (state) => "su-text-black",
        control: (state) => "su-shadow-md su-border su-border-black-10 su-p-10 " + (state.isFocused ? ' su-border-digital-red su-border-2' : ''),
        dropdownIndicator: (state) => "",
        group: (state) => "",
        groupHeading: (state) => "",
        indicatorsContainer: (state) => "",
        indicatorSeparator: (state) => "",
        input: (state) => "",
        loadingIndicator: (state) => "",
        loadingMessage: (state) => "",
        menu: (state) => "su-shadow-md su-border su-border-black-10 su-bg-white",
        menuList: (state) => "",
        menuPortal: (state) => "",
        multiValue: (state) => "",
        multiValueLabel: (state) => "",
        multiValueRemove: (state) => "su-hidden",
        noOptionsMessage: (state) => "",
        placeholder: (state) => "su-text-black-70",
        singleValue: (state) => "",
        valueContainer: (state) => "",
      }}
      defaultMenuIsOpen={isStyling}
      instanceId={`${formId}-hours`}
      {...props}
    />
  )
}

export default SelectList;