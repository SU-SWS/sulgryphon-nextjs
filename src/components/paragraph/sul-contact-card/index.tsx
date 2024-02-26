import NodeReferenceCard from "@/components/paragraph/sul-contact-card/node-reference-card";
import ManualFieldsCard from "@/components/paragraph/sul-contact-card/manual-fields-card";
import {HTMLAttributes} from "react";
import {ParagraphSulContactCard} from "@/lib/gql/__generated__/drupal.d";

type ContactCardProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulContactCard
}

const SulContactCard = ({paragraph, ...props}: ContactCardProps) => {
  const Component = paragraph.sulContactBranch ? NodeReferenceCard : ManualFieldsCard;
  return (
    <div
      className="relative centered" {...props}>
      <Component paragraph={paragraph}/>
    </div>
  )
}

export default SulContactCard;