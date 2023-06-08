import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' + req.query.secret + " doesnt match " + process.env.DRUPAL_REVALIDATE_SECRET })
  }

  try {
    await res.revalidate(decodeURI(req.query.slug as string))
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}