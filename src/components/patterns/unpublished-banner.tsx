import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

const UnpublishedBanner = () => {
  return (
    <div className="bg-illuminating py-10 text-3xl font-bold">
      <div className="centered-container flex gap-10"><ExclamationCircleIcon width={20}/>Unpublished</div>
    </div>
  )
}
export default UnpublishedBanner