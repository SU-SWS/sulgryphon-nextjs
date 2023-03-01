import {ContactCardParagraph} from "../../types/drupal";
import Conditional from "@/components/simple/conditional";

interface ContactCardProps {
  paragraph: ContactCardParagraph
	siblingCount?: number
}

export const SulContactCard = ({paragraph, siblingCount}: ContactCardProps) => {
  console.log('paragraph: ', paragraph)

  return (
    <>
			<div>Hello World</div>
			{/* <Conditional showWhen={paragraph.sul_contact__branch}>
				<h2 className="su-mb-0">{paragraph.sul_contact__branch}</h2>
			</Conditional> */}
			{/* <Conditional showWhen={paragraph.sul_contact__link}>
				<h2 className="su-mb-0">{paragraph.sul_contact__link}</h2>
			</Conditional> */}
			<Conditional showWhen={paragraph.sul_contact__email}>
				<h2 className="su-mb-0">{paragraph.sul_contact__email}</h2>
			</Conditional>
			<Conditional showWhen={paragraph.sul_contact__hours}>
				<h2 className="su-mb-0">{paragraph.sul_contact__hours}</h2>
			</Conditional>
			{/* <Conditional showWhen={paragraph.sul_contact__image}>
				<h2 className="su-mb-0">{paragraph.sul_contact__image}</h2>
			</Conditional> */}
			<Conditional showWhen={paragraph.sul_contact__phone}>
				<h2 className="su-mb-0">{paragraph.sul_contact__phone}</h2>
			</Conditional>
			<Conditional showWhen={paragraph.sul_contact__title}>
				<h2 className="su-mb-0">{paragraph.sul_contact__title}</h2>
			</Conditional>
    </>
  )
}