import {useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {NodeStudyPlaceCard} from "@/nodes/node-sul-study-place";

export const StudyPlaceFilteringList = ({items}) => {
  const formRef = useRef(null)
  const fieldId = useId();
  const [parent] = useAutoAnimate({duration: 300});
  const [itemsToDisplay, setItemsToDisplay] = useState(items)

  const typeOfStudies = [];
  const a11yOptions = [];
  const featureOptions = [];
  const libraryOptions = [];

  items.map(item => {
    item.sul_study__a11y.map(term => {
      if (a11yOptions.findIndex(option => option.id === term.id) === -1) {
        a11yOptions.push({id: term.id, name: term.name})
      }
    })
    item.sul_study__features.map(term => {
      if (featureOptions.findIndex(option => option.id === term.id) === -1) {
        featureOptions.push({id: term.id, name: term.name})
      }
    })
    if (typeOfStudies.findIndex(option => option.id === item.sul_study__type.id) === -1) {
      typeOfStudies.push({id: item.sul_study__type.id, name: item.sul_study__type.name})
    }
    if (libraryOptions.findIndex(option => option.id === item.sul_study__branch.id) === -1) {
      libraryOptions.push({id: item.sul_study__branch.id, name: item.sul_study__branch.title})
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedLibrary = formRef.current['library'].value
    const selectedType = formRef.current['type'].value
    const selectedA11y = formRef.current['a11y'].value
    const selectedFeatures = formRef.current['features'].value

    const filteredItems = items.filter(item =>
      (!selectedLibrary || item.sul_study__branch.id === selectedLibrary) &&
      (!selectedType || item.sul_study__type.id === selectedType) &&
      (!selectedA11y || item.sul_study__a11y.filter(term => term.id === selectedA11y).length > 0) &&
      (!selectedFeatures || item.sul_study__features.filter(term => term.id === selectedFeatures).length > 0)
    );
    setItemsToDisplay(filteredItems)
  }

  return (
    <div>
      <form ref={formRef}>
        <label htmlFor={fieldId + '-type'}>Type</label>
        <select id={fieldId + '-type'} name="type">
          <option value="">- Choose a Type -</option>
          {typeOfStudies.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>

        <label htmlFor={fieldId + '-library'}>Library</label>
        <select id={fieldId + '-library'} name="library">
          <option value="">- Choose a Branch -</option>
          {libraryOptions.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>

        <label htmlFor={fieldId + '-a11y'}>Accessibility Options</label>
        <select id={fieldId + '-a11y'} name="a11y">
          <option value="">- Choose Accessibility options -</option>
          {a11yOptions.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>

        <label htmlFor={fieldId + '-features'}>Features</label>
        <select id={fieldId + '-features'} name="features">
          <option value="">- Choose Some Features -</option>
          {featureOptions.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>

        <button className="su-button" onClick={handleSubmit}>
          Filter
        </button>

        <p>Showing {itemsToDisplay.length} of {items.length}</p>
        <ul ref={parent} className="su-list-unstyled su-grid su-grid-cols-3 su-gap-2xl" aria-live="polite">
          {itemsToDisplay.map(item => <li key={item.id}><NodeStudyPlaceCard node={item}/></li>)}
        </ul>

      </form>
    </div>
  )
}