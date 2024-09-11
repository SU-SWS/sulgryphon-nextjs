import Link from "@/components/patterns/elements/drupal-link"

const LibCal = ({libcalId, srText}: {libcalId?: number; srText: string}) => {
  return (
    <>
      {libcalId && (
        <Link href={`/calendar/${libcalId}`} className="button w-fit text-16 md:text-18" aria-haspopup="dialog">
          Schedule an appointment<span className="sr-only">&nbsp;for {srText}</span>
        </Link>
      )}
    </>
  )
}
export default LibCal
