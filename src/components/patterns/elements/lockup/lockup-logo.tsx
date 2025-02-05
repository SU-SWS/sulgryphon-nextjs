import {Maybe} from "@/lib/gql/__generated__/drupal.d"
import StanfordWordMark from "@/components/images/stanford-wordmark"
import {twMerge} from "tailwind-merge"

const LockupLogo = ({
  logoUrl,
  siteName = "",
  whiteText,
}: {
  logoUrl?: Maybe<string>
  siteName?: Maybe<string>
  whiteText?: Maybe<boolean>
}) => {
  return (
    <>
      {logoUrl && (
        <picture>
          <img src={logoUrl} alt={`${siteName} Logo`} className="h-auto max-h-[35px] max-w-[400px] object-contain" />
        </picture>
      )}
      {!logoUrl && (
        <StanfordWordMark
          aria-label={`Stanford ${siteName} Logo`}
          role="img"
          className={twMerge("block max-h-[30px] w-auto no-underline", whiteText ? "text-white" : "text-cardinal-red")}
        />
      )}
    </>
  )
}

export default LockupLogo
