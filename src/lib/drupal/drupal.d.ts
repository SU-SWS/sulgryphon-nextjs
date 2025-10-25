import {DayHours} from "@/lib/hooks/useLibraryHours"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"

export type ParagraphBehaviors = {
  layout_paragraphs?: {
    layout?: "sul_helper_1_column" | "sul_helper_2_column" | "sul_helper_3_column"
    config?: {
      label?: string
      bg_color?: string
      bottom_margin?: "none"
      bottom_padding?: "none"
      top_padding?: "none" | "more"
      heading?: string
      heading_level?: "h2" | "h3" | "h4"
    }
    parent_uuid?: string
    region?: string
  }
  sul_button_styles?: {
    background?: Maybe<string>
  }
  sul_feat_collections_styles?: {
    link_display_style?: Maybe<string>
  }
  sul_teaser_styles?: {
    orientation?: Maybe<string>
    background?: Maybe<string>
  }
  hero_pattern?: {
    overlay_position?: string
    heading?: "h2" | "h3" | "h4" | "div.su-font-splash"
    hide_heading?: boolean
  }
  su_card_styles?: {
    heading?: "h2" | "h3" | "h4" | "div.su-font-splash"
    hide_heading?: boolean
  }
  sul_card_styles?: {
    background_color?: "fog_light" | "cardinal_red"
    orientation?: string
    link_display_style?: string
    hide_rosette?: boolean
  }
  list_paragraph?: {
    hide_empty?: Maybe<boolean>
    empty_message?: Maybe<string>
    heading_behavior?: Maybe<"show" | "hide" | "remove">
    display_heading_gradient?: Maybe<boolean>
  }
  sul_list_styles?: {link_display_style?: Maybe<string>}
  stanford_teaser?: {heading_behavior?: Maybe<"show" | "hide" | "remove">}
  faq_accordions?: {heading?: "h2" | "h3" | "h4"}
}

export type LibGuide = {
  id: string
  title: string
  url: string
  type: string
}

export type Breadcrumb = {
  href: string
  text: string
}

export type LibraryHours = {
  type: string
  id: string
  name: string
  primary_location: string
  locations: {
    type: string
    id: string
    name: string
    primary: boolean
    hours: DayHours[]
    links: {
      self: string
    }
    library: {
      type: string
      id: string
      name: string
      primary_location: string
      hours: DayHours[]
      links: [object]
      locations: []
    }
  }[]
  hours: DayHours[]
}
