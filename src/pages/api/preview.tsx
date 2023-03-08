import {DrupalClient} from "next-drupal";

// @ts-ignore
export const drupalClient = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL, {previewSecret: process.env.DRUPAL_PREVIEW_SECRET})

export default async function handler(req, res) {
  return await drupalClient.preview(req, res)
}