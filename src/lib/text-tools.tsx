import {Maybe, ParagraphStanfordWysiwyg, ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {decode} from "html-entities"

export const getFirstText = (components?: Maybe<ParagraphUnion[]>, numSentences?: number) => {
  const firstWysiwyg = components?.find(
    component => component.__typename === "ParagraphStanfordWysiwyg"
  ) as ParagraphStanfordWysiwyg
  if (firstWysiwyg) {
    return getCleanDescription(firstWysiwyg.suWysiwygText?.processed, numSentences)
  }
}

export const getCleanDescription = (description: string | undefined, numSentences?: number): string | undefined => {
  if (description) {
    const text: string =
      decode(description)
        .replaceAll(/(<([^>]+)>)/gi, " ")
        .replaceAll(/ +/g, " ")
        .replaceAll(/ </g, "<")
        .replace(/\.\s+$/, "")
        .split(".")
        .slice(0, numSentences || 1)
        .join(".") + "."
    return text?.length > 1 ? decode(text) : undefined
  }
}
