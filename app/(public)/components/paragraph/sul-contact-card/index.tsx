import {ContactCardParagraph} from "@/lib/drupal/drupal";
import NodeReferenceCard from "@/components/paragraph/sul-contact-card/node-reference-card";
import ManualFieldsCard from "@/components/paragraph/sul-contact-card/manual-fields-card";

interface ContactCardProps {
  paragraph: ContactCardParagraph
  siblingCount?: number
}

const SulContactCard = ({paragraph, siblingCount = 0, ...props}: ContactCardProps) => {
  const Component = paragraph.sul_contact__branch ? NodeReferenceCard : ManualFieldsCard;
  return <div {...props}><Component paragraph={paragraph}/></div>
}

export default SulContactCard;