"use client";

import Link from "next/link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useRef, useState} from "react";
import Modal from "@/components/patterns/modal";
import SearchForm from "@/components/search/search-form";

const SearchModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef(null);

  const toggleModal = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Link href="https://library.stanford.edu/all" className="su-block" onClick={toggleModal}>
        <MagnifyingGlassIcon className="su-h-40 su-text-white su-bg-cardinal-red su-rounded-full su-p-5"/>
        <span className="su-sr-only">Search</span>
      </Link>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} ariaLabel="Search Form" initialFocus={ref}>
        <div className="su-max-w-500 su-mx-auto">
          <h2 className="su-text-white su-text-center">What can we help you find?</h2>
          <SearchForm action="https://library.stanford.edu/all" inputProps={{ref}}/>

          <p className="su-text-white su-text-center su-p-20">
            Search gives results from this site, <Link href="https://searchworks.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">catalog</Link>
            , <Link href="https://searchworks.stanford.edu/articles" className="su-text-white hocus:su-text-white hocus:su-no-underline">articles+</Link>
            , <Link href="https://guides.library.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">guides</Link>
            , <Link href="https://exhibits.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">online exhibits</Link>
            , and <Link href="https://earthworks.stanford.edu/" className="su-text-white hocus:su-text-white hocus:su-no-underline">EarthWorks</Link>.
          </p>
        </div>
      </Modal>
    </>
  )
}
export default SearchModal;