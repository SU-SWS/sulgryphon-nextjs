import {DrupalClient} from "next-drupal";

// @ts-ignore
export const drupalClient = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL, {
  previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
})

export default async function handler(req, res) {
  process.env.DRUPAL_CLIENT_ID = process.env.DRUPAL_PREVIEW_CLIENT_ID
  process.env.DRUPAL_CLIENT_SECRET = process.env.DRUPAL_PREVIEW_CLIENT_SECRET
 return await drupalClient.preview(req, res)
}


