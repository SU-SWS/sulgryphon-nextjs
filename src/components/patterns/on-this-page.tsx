import React from "react"
import SulAccordion from "@/components/patterns/sul-accordion"
import HeadingList from "@/components/patterns/headingList"

interface OnThisPageProps {
  children: React.ReactNode
}

const OnThisPage = ({children}: OnThisPageProps) => {
  return (
    <div>
      <div className="block w-full md:w-500 lg:hidden">
        <SulAccordion button="On this page" headingLevel="h3">
          <HeadingList />
          {children}
        </SulAccordion>
      </div>
      <div className="sticky top-0 hidden h-fit w-300 bg-fog-light px-24 pb-40 pt-16 lg:block">
        <HeadingList />
        {children}
      </div>
    </div>
  )
}

export default OnThisPage
