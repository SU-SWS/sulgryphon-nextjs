import {useEffect, useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {NodeStudyPlaceCard} from "@/nodes/node-sul-study-place";
import Select from "react-select";
import Conditional from "@/components/simple/conditional";
import {SignalIcon} from "@heroicons/react/20/solid";

export const StudyPlaceFilteringList = ({items}) => {
  const typeRef = useRef(null);
  const libraryRef = useRef(null);
  const a11yRef = useRef(null);
  const featureRef = useRef(null);
  const inputId = useId();

  const [parent] = useAutoAnimate({duration: 300});
  const [itemsToDisplay, setItemsToDisplay] = useState(items)

  const typeOfStudies = [];
  const a11yOptions = [];
  const featureOptions = [];
  const libraryOptions = [];

  items.map(item => {
    item.sul_study__a11y.map(term => {
      if (a11yOptions.findIndex(option => option.value === term.id) === -1 && term.name) {
        a11yOptions.push({value: term.id, label: term.name})
      }
    })
    item.sul_study__features.map(term => {
      if (featureOptions.findIndex(option => option.value === term.id) === -1 && term.name) {
        featureOptions.push({value: term.id, label: term.name})
      }
    })
    if (typeOfStudies.findIndex(option => option.value === item.sul_study__type.id) === -1 && item.sul_study__type.name) {
      typeOfStudies.push({value: item.sul_study__type.id, label: item.sul_study__type.name})
    }
    if (libraryOptions.findIndex(option => option.value === item.sul_study__branch.id) === -1 && item.sul_study__branch.title) {
      libraryOptions.push({value: item.sul_study__branch.id, label: item.sul_study__branch.title})
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTypes = typeRef.current.getValue().map(option => option.value);
    const selectedLibraries = libraryRef.current.getValue().map(option => option.value);
    const selectedA11y = a11yRef.current.getValue().map(option => option.value);
    const selectedFeatures = featureRef.current.getValue().map(option => option.value);

    const filteredItems = items.filter(item =>
      (!selectedLibraries.length || selectedLibraries.indexOf(item.sul_study__branch.id) != -1) &&
      (!selectedTypes.length || selectedTypes.indexOf(item.sul_study__type.id) != -1) &&
      (!selectedA11y.length || item.sul_study__a11y.filter(term => selectedA11y.indexOf(term.id) != -1).length > 0) &&
      (!selectedFeatures.length || item.sul_study__features.filter(term => selectedFeatures.indexOf(term.id) != -1).length > 0)
    );
    setItemsToDisplay(filteredItems)
  }

  const handleReset = (e) => {
    e.preventDefault();
    typeRef.current.clearValue();
    libraryRef.current.clearValue();
    a11yRef.current.clearValue();
    featureRef.current.clearValue();
    setItemsToDisplay(items)
  }

  useEffect(() => setItemsToDisplay(items), [items])

  return (
    <div>
      <form>
        <div className="su-grid su-grid-cols-1 lg:su-grid-cols-4 su-gap-xs lg:su-gap-xl su-mb-10">
          <div>
            <Select
              instanceId={`${inputId}-type`}
              ref={typeRef}
              aria-label="Type of place"
              placeholder="Type"
              options={typeOfStudies}
              name="type"
              isMulti
            />
          </div>
          <div>
            <Select
              instanceId={`${inputId}-branch`}
              ref={libraryRef}
              aria-label="Library Branch Location"
              placeholder="Library"
              options={libraryOptions}
              name="library"
              isMulti
            />
          </div>
          <div>
            <Select
              instanceId={`${inputId}-a11y`}
              ref={a11yRef}
              aria-label="Accessible features"
              placeholder="Accessibility"
              options={a11yOptions}
              name="a11y"
              isMulti
            />
          </div>
          <div>
            <Select
              instanceId={`${inputId}-features`}
              ref={featureRef}
              aria-label="Equipment/Features"
              placeholder="Equipment"
              options={featureOptions}
              name="features"
              isMulti
            />
          </div>
        </div>

        <button className="su-button su-mr-20" onClick={handleSubmit}>
          Filter
        </button>
        <button className="su-button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <Conditional showWhen={items.length == 0}>
        <SignalIcon width={50} className="su-animate-ping su-mx-auto su-my-50" />
      </Conditional>

      <Conditional showWhen={items.length > 0}>
        <p>Showing {itemsToDisplay.length} of {items.length}</p>
        <Conditional showWhen={itemsToDisplay.length > 0}>
          <ul ref={parent} className="su-list-unstyled su-grid su-grid-cols-3 su-gap-2xl" aria-live="polite">
            {itemsToDisplay.map(item => <li key={item.id}><NodeStudyPlaceCard node={item}/></li>)}
          </ul>
        </Conditional>

        <Conditional showWhen={itemsToDisplay.length == 0}>
          <p>No items match the search.</p>
        </Conditional>
      </Conditional>
    </div>
  )
}