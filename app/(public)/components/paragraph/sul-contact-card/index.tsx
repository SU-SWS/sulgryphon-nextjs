import {ContactCardParagraph} from "@/lib/drupal/drupal";
import NodeReferenceCard from "@/components/paragraph/sul-contact-card/node-reference-card";
import ManualFieldsCard from "@/components/paragraph/sul-contact-card/manual-fields-card";

interface ContactCardProps {
  paragraph: ContactCardParagraph
  siblingCount?: number
}

const SulContactCard = ({paragraph, siblingCount = 0}: ContactCardProps) => {
  if (paragraph.sul_contact__branch) {
    return <NodeReferenceCard paragraph={paragraph}/>
  }

  return <ManualFieldsCard paragraph={paragraph}/>
}

export default SulContactCard;