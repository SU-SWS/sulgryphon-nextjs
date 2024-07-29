import Link from "@/components/patterns/elements/drupal-link"

const LibCal = ({libcalId, srText}: {libcalId?: number; srText: string}) => {
  return (
    <>
      {libcalId && (
        <Link
          href={`/calendar/${libcalId}`}
          className="button w-fit whitespace-nowrap border border-solid border-cardinal-red bg-white px-[12px] py-[4px] text-16 text-cardinal-red hocus:bg-cardinal-red hocus:text-white hocus:shadow-button"
          aria-haspopup="dialog"
        >
          Schedule an appointment<span className="sr-only">&nbsp;for {srText}</span>
        </Link>
      )}
    </>
  )
}
export default LibCal
