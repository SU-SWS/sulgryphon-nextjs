import {DrupalNode} from "next-drupal";

export const cleanNode = (node: DrupalNode) => {
  delete node.sticky;
  delete node.promote;
  delete node.links;
  delete node.node_type;
  delete node.metatag;
  delete node.revision_log;
  delete node.revision_timestamp;
  delete node.revision_uid;
  delete node.uid;
  delete node.stanford_intranet__access;
  delete node.relationshipNames;
  delete node.publish_on;
  delete node.drupal_internal_vid;
  delete node.unpublish_on;
  delete node.links
}