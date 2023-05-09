import Link from "next/link";

const LibCal = ({libcalId}: { libcalId?: number }) => {
  return (
    <>
      {libcalId &&
        <Link href={`/calendar/${libcalId}`} className="su-button">
          Schedule an appointment
        </Link>
      }
    </>
  )
}
export default LibCal;