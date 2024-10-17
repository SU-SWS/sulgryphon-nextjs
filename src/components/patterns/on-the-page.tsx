import React from "react"
import Accordion from "@/components/patterns/accordion"
import HeadingList from "@/components/patterns/headingList"

interface OnThePageProps {
  children: React.ReactNode
}

const OnThePage = ({children}: OnThePageProps) => {
  return (
    <div>
      <div className="block w-full md:w-500 lg:hidden">
        <Accordion button="On the page" headingLevel="h3">
          <HeadingList />
          {children}
        </Accordion>
      </div>
      <div className="sticky top-0 hidden h-fit w-300 bg-fog-light px-24 pb-40 pt-16 lg:block">
        <HeadingList />
        {children}
      </div>
    </div>
  )
}

export default OnThePage
