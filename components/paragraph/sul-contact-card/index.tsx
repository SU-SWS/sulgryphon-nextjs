import {ContactCardParagraph} from "@/lib/drupal/drupal";
import NodeReferenceCard from "@/components/paragraph/sul-contact-card/node-reference-card";
import ManualFieldsCard from "@/components/paragraph/sul-contact-card/manual-fields-card";

interface ContactCardProps {
  paragraph: ContactCardParagraph
  fullWidth?: boolean
}

const SulContactCard = ({paragraph, fullWidth = true, ...props}: ContactCardProps) => {
  const Component = paragraph.sul_contact__branch ? NodeReferenceCard : ManualFieldsCard;
  return (
    <div
      className="su-relative su-centered" {...props}>
      <Component paragraph={paragraph}/>
    </div>
  )
}

export default SulContactCard;