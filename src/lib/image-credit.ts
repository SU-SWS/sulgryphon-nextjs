import {decode} from "html-entities"
import {Maybe, MediaImage} from "@/lib/gql/__generated__/drupal.d"

/**
 * Text placed between an image caption and the image credit.
 */
export const CREDIT_SEPARATOR = " | "

/**
 * The credit to display for an image, if there is one.
 */
export const getImageCredit = (image?: Maybe<MediaImage>): string | undefined => {
  const credit = image?.sulImageCredit?.trim()
  return credit && image?.mediaImage.alt?.trim() ? credit : undefined
}

/**
 * Append the image credit onto a plain text caption.
 */
export const appendCredit = (caption?: Maybe<string>, credit?: string): string | undefined => {
  const trimmed = caption?.trim()
  if (!credit) return trimmed || undefined
  return trimmed ? `${trimmed}${CREDIT_SEPARATOR}${credit}` : credit
}

/**
 * Whether a caption Drupal has processed into html has anything to display.
 *
 * Clearing a caption in CKEditor leaves markup like `<p>&nbsp;</p>` behind, so
 * the field value being non-empty doesn't mean there is a caption.
 */
export const hasCaptionText = (caption?: Maybe<string>): boolean =>
  decode(caption?.replace(/<[^>]*>/g, " ")).trim().length > 0
