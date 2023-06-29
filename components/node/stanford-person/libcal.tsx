import Link from "next/link";

const LibCal = ({libcalId, srText}: { libcalId?: number, srText: string }) => {
  return (
    <>
      {libcalId &&
        <Link href={`/calendar/${libcalId}`} className="su-button su-w-fit" aria-haspopup="dialog">
          Schedule an appointment<span>&nbsp;for {srText}</span>
        </Link>
      }
    </>
  )
}
export default LibCal;