import {drupal} from "@/lib/drupal"

export default async function handler(req, res) {
  return await drupal.preview(req, res)
}