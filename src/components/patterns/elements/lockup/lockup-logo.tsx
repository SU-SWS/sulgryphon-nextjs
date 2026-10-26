import {Maybe} from "@/lib/gql/__generated__/graphql"
import StanfordWordMark from "@/components/images/stanford-wordmark"
import cn from "@/lib/utils/className"

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
          <img
            src={logoUrl}
            alt={`${siteName} Logo`}
            className="h-auto max-h-[35px] max-w-[12rem] object-contain xl:max-w-400"
          />
        </picture>
      )}
      {!logoUrl && (
        <StanfordWordMark
          aria-label={`Stanford ${siteName} Logo`}
          role="img"
          className={cn("block max-h-[30px] w-auto max-w-[12rem] no-underline xl:max-w-400", {
            "text-white": whiteText,
            "text-cardinal-red": !whiteText,
          })}
        />
      )}
    </>
  )
}

export default LockupLogo
