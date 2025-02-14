import Link from "next/link"
import LockupA from "@/components/patterns/elements/lockup/lockup-a"
import LockupB from "@/components/patterns/elements/lockup/lockup-b"
import LockupD from "@/components/patterns/elements/lockup/lockup-d"
import LockupE from "@/components/patterns/elements/lockup/lockup-e"
import LockupH from "@/components/patterns/elements/lockup/lockup-h"
import LockupI from "@/components/patterns/elements/lockup/lockup-i"
import LockupM from "@/components/patterns/elements/lockup/lockup-m"
import LockupO from "@/components/patterns/elements/lockup/lockup-o"
import LockupP from "@/components/patterns/elements/lockup/lockup-p"
import LockupR from "@/components/patterns/elements/lockup/lockup-r"
import LockupS from "@/components/patterns/elements/lockup/lockup-s"
import LockupT from "@/components/patterns/elements/lockup/lockup-t"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {LockupSetting, Maybe, StanfordBasicSiteSetting} from "@/lib/gql/__generated__/drupal.d"
import {getConfigPage, getConfigPageField} from "@/lib/gql/fetcher"
import {twMerge} from "tailwind-merge"

export interface LockupProps {
  useDefault?: Maybe<boolean>
  siteName?: Maybe<string>
  lockupOption?: Maybe<string>
  line1?: Maybe<string>
  line2?: Maybe<string>
  line3?: Maybe<string>
  line4?: Maybe<string>
  line5?: Maybe<string>
  logoUrl?: Maybe<string>
  whiteText?: Maybe<boolean>
}

export const Lockup = async ({whiteText}: {whiteText?: boolean}) => {
  const siteName = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteName"]>(
    "StanfordBasicSiteSetting",
    "suSiteName"
  )
  const lockupSettingsConfig = await getConfigPage<LockupSetting>("LockupSetting")

  const logoUrl = !lockupSettingsConfig?.suUseThemeLogo ? lockupSettingsConfig?.suUploadLogoImage?.url : undefined
  const lockupProps = {
    line1: lockupSettingsConfig?.suLine1,
    line2: lockupSettingsConfig?.suLine2,
    line3: lockupSettingsConfig?.suLine3,
    line4: lockupSettingsConfig?.suLine4,
    line5: lockupSettingsConfig?.suLine5,
    siteName: siteName || "Stanford",
    logoUrl: logoUrl,
    whiteText: whiteText,
  }

  if (!lockupSettingsConfig?.suLockupEnabled) {
    return (
      <Link href="/" className="flex flex-col text-black no-underline sm:flex-row sm:items-end">
        <div className={twMerge("py-2 pr-9 sm:border-r-2", whiteText ? "border-white" : "border-black")}>
          <LockupLogo {...lockupProps} />
        </div>
        <div
          className={twMerge(
            "font-roboto type-1 text-nowrap font-light sm:relative sm:top-[5px] sm:pl-9",
            whiteText ? "text-white" : "text-black"
          )}
        >
          {siteName || "University Libraries"}
        </div>
      </Link>
    )
  }

  switch (lockupSettingsConfig?.suLockupOptions) {
    case "a":
      return <LockupA {...lockupProps} />

    case "b":
      return <LockupB {...lockupProps} />

    case "d":
      return <LockupD {...lockupProps} />

    case "e":
      return <LockupE {...lockupProps} />

    case "h":
      return <LockupH {...lockupProps} />

    case "i":
      return <LockupI {...lockupProps} />

    case "m":
      return <LockupM {...lockupProps} />

    case "o":
      return <LockupO {...lockupProps} />

    case "p":
      return <LockupP {...lockupProps} />

    case "r":
      return <LockupR {...lockupProps} />

    case "s":
      return <LockupS {...lockupProps} />

    case "t":
      return <LockupT {...lockupProps} />

    case "none":
    default:
      return (
        <Link href="/" className="flex flex-col gap-4 no-underline sm:flex-row">
          <LockupLogo {...lockupProps} />
        </Link>
      )
  }
}
export default Lockup
