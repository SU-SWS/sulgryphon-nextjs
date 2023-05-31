"use client";

import Link from "next/link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useId, useState} from "react";
import Modal from "@/components/patterns/modals/modal";
import SearchForm from "@/components/search/search-form";

const SearchModal = () => {
  const headerId = useId();
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Link href="https://library.stanford.edu/all" className="su-aspect-1 su-group su-block su-rounded-full su-p-5 su-bg-digital-red hocus:su-bg-digital-red-dark" onClick={toggleModal} aria-haspopup={true}>
        <MagnifyingGlassIcon width={30} className="su-mt-[-1px] su-text-white su-p-4 su-border-b su-border-transparent group-hocus:su-border-white"/>
        <span className="su-sr-only">Search</span>
      </Link>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} ariaLabel="Search Form" labelledBy={headerId}>
        <div className="su-max-w-500 su-w-full su-mx-auto">
          <h2 id={headerId} className="su-text-white su-text-center">What can we help you find?</h2>
          <SearchForm action="https://library.stanford.edu/all"/>

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