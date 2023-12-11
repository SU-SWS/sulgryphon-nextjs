"use client";

import Link from "@/components/patterns/elements/drupal-link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {MouseEvent, useId, useState} from "react";
import Modal from "@/components/patterns/modals/modal";
import SearchForm from "@/components/search/search-form";

const SearchModal = () => {
  const headerId = useId();
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = (e: MouseEvent) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Link href="/all" className="aspect-1 group block rounded-full p-5 bg-digital-red hocus:bg-digital-red-dark" onClick={toggleModal} aria-haspopup="dialog" prefetch={false}>
        <MagnifyingGlassIcon width={30} className="mt-[-1px] text-white p-4 border-b border-transparent group-hocus:border-white"/>
        <span className="sr-only">Search</span>
      </Link>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} labelledBy={headerId}>
        <div className="max-w-500 w-full mx-auto">
          <h2 id={headerId} className="text-white text-center">What can we help you find?</h2>
          <SearchForm action="/all"/>

          <p className="text-white text-center p-20">
            Search gives results from this site, <Link href="https://searchworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">catalog</Link>
            , <Link href="https://searchworks.stanford.edu/articles" className="text-white hocus:text-white hocus:no-underline">articles+</Link>
            , <Link href="https://guides.library.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">guides</Link>
            , <Link href="https://exhibits.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">online exhibits</Link>
            , and <Link href="https://earthworks.stanford.edu/" className="text-white hocus:text-white hocus:no-underline">EarthWorks</Link>.
          </p>
        </div>
      </Modal>
    </>
  )
}
export default SearchModal;