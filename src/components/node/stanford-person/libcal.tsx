import Link from "@/components/patterns/elements/drupal-link";

const LibCal = ({libcalId, srText}: { libcalId?: number, srText: string }) => {
  return (
    <>
      {libcalId &&
        <Link href={`/calendar/${libcalId}`} className="su-button su-w-fit" aria-haspopup="dialog">
          Schedule an appointment<span className="su-sr-only">&nbsp;for {srText}</span>
        </Link>
      }
    </>
  )
}
export default LibCal;