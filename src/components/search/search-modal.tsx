"use client"

import Link from "@/components/patterns/elements/drupal-link"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {MouseEvent, useId, useState} from "react"
import Modal from "@/components/patterns/modals/modal"
import SearchForm from "@/components/search/search-form"

const SearchModal = () => {
  const headerId = useId()
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = (e: MouseEvent) => {
    e.preventDefault()
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <Link
        href="/all"
        className="group block aspect-square rounded-full bg-digital-red p-5 transition-colors hover:bg-digital-red-dark focus-visible:bg-digital-red-dark focus-visible:focus-ring-pill active:bg-black-true"
        onClick={toggleModal}
        aria-haspopup="dialog"
        prefetch={false}
      >
        <MagnifyingGlassIcon
          width={30}
          className="mt-[-1px] border-b border-transparent p-4 text-white group-hover:border-white group-focus-visible:border-white group-active:border-transparent"
        />
        <span className="sr-only">Search</span>
      </Link>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} labelledBy={headerId}>
        <div className="mx-auto w-full max-w-500">
          <h2 id={headerId} className="text-center text-white">
            What can we help you find?
          </h2>
          <SearchForm action="/all" />

          <p className="p-20 text-center text-white">
            Search gives results from this site,{" "}
            <Link href="https://searchworks.stanford.edu/" className="link-on-dark">
              catalog
            </Link>
            ,{" "}
            <Link href="https://searchworks.stanford.edu/articles" className="link-on-dark">
              articles+
            </Link>
            ,{" "}
            <Link href="https://guides.library.stanford.edu/" className="link-on-dark">
              guides
            </Link>
            ,{" "}
            <Link href="https://exhibits.stanford.edu/" className="link-on-dark">
              online exhibits
            </Link>
            , and{" "}
            <Link href="https://earthworks.stanford.edu/" className="link-on-dark">
              EarthWorks
            </Link>
            .
          </p>
        </div>
      </Modal>
    </>
  )
}
export default SearchModal
