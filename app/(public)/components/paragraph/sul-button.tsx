import {ButtonParagraph} from "@/lib/drupal/drupal";
import Link from "next/link";
import Conditional from "@/components/utils/conditional";

const SulButton = ({paragraph, siblingCount = 0, ...props}: { paragraph: ButtonParagraph, siblingCount?: number }) => {
  const isGray = paragraph.behavior_settings?.sul_button_styles?.background == 'gray';
  return (
    <div {...props}>
      <div
        className={(siblingCount > 0 ? "su-px-50 su-w-full " : "su-full-screen ") + " su-py-50 " + (isGray ? "su-bg-black-10" : "su-bg-black-true")}>
        <div className="su-cc">
          <Conditional showWhen={paragraph.sul_button_headline}>
            <h2 className={"su-text-center su-text-m3 " + (!isGray ? 'su-text-white' : '')}>
              {paragraph.sul_button_headline}
            </h2>
          </Conditional>

          <Link href={paragraph.sul_button_link.url} className="su-button su-block su-mx-auto su-text-center su-w-fit">
            {paragraph.sul_button_link.title}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default SulButton;