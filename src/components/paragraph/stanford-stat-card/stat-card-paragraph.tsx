import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordStatCard} from "@/lib/gql/__generated__/drupal.d"
import StanfordWysiwyg from "@/components/paragraph/stanford-wysiwyg"
import Link from "@/components/patterns/elements/drupal-link"
import ReverseVisualOrder from "@/components/patterns/reverse-visual-order"
import ImageCard from "@/components/patterns/image-card"
import CountUpNumber from "@/components/patterns/count-up"
import {clsx} from "clsx"
import {ChevronRightIcon} from "@heroicons/react/20/solid"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordStatCard
}
const StatCardParagraph = ({paragraph, ...props}: Props) => {
  const headerTagChoice = (paragraph.suStatHeadlineLvl || "h2").split(".", 2)
  const headerTag = headerTagChoice[0]
  const headerClasses = clsx(
    headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-2 font-bold") || undefined,
    {"sr-only": paragraph.suStatHeadingHide}
  )

  let statMatches: RegExpMatchArray | null = null
  let decimalPlaces = 0
  let prefix: string | undefined

  // The stat starts with numbers.
  if (/^[0-9]/.test(paragraph.suStatStat)) {
    statMatches = paragraph.suStatStat.match(/^([0-9.]+)(.*)/)

    if (statMatches && statMatches[1].indexOf(".") > 0) {
      decimalPlaces = statMatches[1].replace(/^.*\./, "").length
    }
  }

  // The stat starts with dollar sign and then numbers.
  if (/^\$[0-9]/.test(paragraph.suStatStat)) {
    prefix = "$"
    statMatches = paragraph.suStatStat.match(/^\$([0-9.]+)(.*)/)
    if (statMatches && statMatches[1].indexOf(".") > 0) {
      decimalPlaces = statMatches[1].replace(/^.*\./, "").length
    }
  }

  const transparentBg = !paragraph.suStatBgColor?.color
  const allowTextColors =
    !paragraph.suStatBgColor?.color || ["f4f4f4", "ffffff"].includes(paragraph.suStatBgColor?.color)
  const whiteText =
    paragraph.suStatBgColor?.color && !["ffffff", "f4f4f4", "e98300", "e04f39"].includes(paragraph.suStatBgColor?.color)

  return (
    <ImageCard
      {...props}
      className={clsx({
        "text-center": paragraph.suStatCentered,
        "text-white [&_a]:text-white": whiteText,
        "border-0 bg-transparent shadow-none children:gap-10 children:px-10 children:py-0": transparentBg,
        "bg-white": paragraph.suStatBgColor?.color === "ffffff",
        "bg-black": paragraph.suStatBgColor?.color === "2e2d29",
        "bg-cool-grey": paragraph.suStatBgColor?.color === "53565a",
        "bg-stone-dark": paragraph.suStatBgColor?.color === "544948",
        "bg-cardinal-red": paragraph.suStatBgColor?.color === "8c1515",
        "bg-plum": paragraph.suStatBgColor?.color === "620059",
        "bg-lagunita": paragraph.suStatBgColor?.color === "007c92",
        "bg-palo-alto": paragraph.suStatBgColor?.color === "175e54",
        "bg-poppy": paragraph.suStatBgColor?.color === "e98300",
        "bg-foggy-light": paragraph.suStatBgColor?.color === "f4f4f4",
        "bg-spirited": paragraph.suStatBgColor?.color === "e04f39",
      })}
      aria-labelledby={paragraph.suStatHeadline ? paragraph.id : undefined}
      imageUrl={paragraph.suStatImage?.mediaImage.url}
      imageAlt={paragraph.suStatImage?.mediaImage.alt}
      isArticle={!!paragraph.suStatHeadline && headerTag !== "div"}
    >
      <ReverseVisualOrder>
        {paragraph.suStatHeadline && (
          <>
            {headerTag === "h2" && (
              <h2
                id={paragraph.id}
                className={clsx("mb-0", headerClasses, {
                  "text-24 font-normal": transparentBg,
                })}
              >
                {paragraph.suStatHeadline}
              </h2>
            )}
            {headerTag === "h3" && (
              <h3
                id={paragraph.id}
                className={clsx("mb-0", headerClasses, {
                  "text-24 font-normal": transparentBg,
                })}
              >
                {paragraph.suStatHeadline}
              </h3>
            )}
            {headerTag === "h4" && (
              <h4
                id={paragraph.id}
                className={clsx("mb-0", headerClasses, {
                  "text-24 font-normal": transparentBg,
                })}
              >
                {paragraph.suStatHeadline}
              </h4>
            )}
            {headerTag === "div" && (
              <div
                className={clsx("mb-0", headerClasses, {
                  "text-24 font-normal": transparentBg,
                })}
              >
                {paragraph.suStatHeadline}
              </div>
            )}
          </>
        )}

        <div>
          {paragraph.suStatImage && <div></div>}
          {paragraph.suStatIcon && (
            <div className="block">
              <span
                aria-hidden="true"
                className={clsx(`fa-${paragraph.suStatIcon.iconName} ${paragraph.suStatIcon.style} text-[60px]`, {
                  "text-cardinal-red": allowTextColors && paragraph.suStatIconColor?.color === "8c1515",
                  "text-plum": allowTextColors && paragraph.suStatIconColor?.color === "620059",
                  "text-lagunita": allowTextColors && paragraph.suStatIconColor?.color === "007c92",
                  "text-palo-verde-dark": allowTextColors && paragraph.suStatIconColor?.color === "279989",
                  "text-poppy-dark": allowTextColors && paragraph.suStatIconColor?.color === "d1660f",
                  "text-spirited": allowTextColors && paragraph.suStatIconColor?.color === "e04f39",
                })}
              />
            </div>
          )}
          {paragraph.suStatSuperhead && <div className="font-semibold">{paragraph.suStatSuperhead}</div>}
          {statMatches && (
            <CountUpNumber
              end={parseFloat(statMatches[1])}
              prefix={prefix}
              suffix={(statMatches && statMatches[2]) || undefined}
              className={clsx("font-bold", {
                "text-cardinal-red": allowTextColors && paragraph.suStatStatColor?.color === "8c1515",
                "text-plum": allowTextColors && paragraph.suStatStatColor?.color === "620059",
                "text-lagunita": allowTextColors && paragraph.suStatStatColor?.color === "007c92",
                "text-palo-verde-dark": allowTextColors && paragraph.suStatStatColor?.color === "279989",
                "text-poppy-dark": allowTextColors && paragraph.suStatStatColor?.color === "d1660f",
                "text-spirited": allowTextColors && paragraph.suStatStatColor?.color === "e04f39",
                "text-[40px] @xl:text-[50px] @2xl:text-[60px]": !transparentBg,
                "fluid-type-4": transparentBg,
              })}
              decimals={decimalPlaces}
              startOnMount={false}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          )}
        </div>
      </ReverseVisualOrder>
      <StanfordWysiwyg text={paragraph.suStatBody?.processed} />
      {paragraph.suStatButton?.url && (
        <Link
          className={clsx(
            "group flex w-fit items-center gap-3 rounded-[3.5rem] text-digital-red no-underline transition duration-500 ease-in-out hocus:underline",
            {
              "border-2 border-digital-red px-26 py-8 hocus:border-black hocus:bg-black hocus:text-white":
                paragraph.suStatLinkStyle === "button",
              "border-white text-white hocus:text-white": whiteText,
              "mx-auto": paragraph.suStatCentered,
              "text-18": transparentBg,
            }
          )}
          href={paragraph.suStatButton.url}
        >
          {paragraph.suStatButton.title}

          {paragraph.suStatLinkStyle !== "button" && (
            <ChevronRightIcon className="group-hocus:translate-x-1.5 shrink-0 transition-all" width={20} />
          )}
        </Link>
      )}
    </ImageCard>
  )
}
export default StatCardParagraph
