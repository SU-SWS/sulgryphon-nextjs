import Link from "next/link";

const LibCal = ({libcalId}) => {
  return (
    <Link href={`/calendar/${libcalId}`}>
      Schedule an appointment
    </Link>
  )
}
export default LibCal;