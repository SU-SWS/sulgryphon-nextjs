import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

const UnpublishedBanner = () => {
  return (
    <div className="su-bg-illuminating su-py-10 su-text-3xl su-font-bold">
      <div className="su-centered-container su-flex su-gap-10"><ExclamationCircleIcon width={20}/>Unpublished</div>
    </div>
  )
}
export default UnpublishedBanner