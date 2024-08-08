import {DrupalFile, DrupalMedia, DrupalNode, DrupalParagraph, DrupalTaxonomyTerm} from "next-drupal"
import {JsonApiResource} from "next-drupal"
import {DayHours} from "@/lib/hooks/useLibraryHours"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"

export type ParagraphBehaviors = {
  layout_paragraphs?: {
    layout?: "sul_helper_1_column" | "sul_helper_2_column" | "sul_helper_3_column"
    parent_uuid?: string
    region?: string
    config?: {}
  }
  sul_button_styles?: {}
  sul_feat_collections_styles?: {}
  sul_teaser_styles?: {}
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
    background_sprinkles?: "top_right" | "top_left" | "bottom_right" | "bottom_left"
    orientation?: string
    link_display_style?: string
  }
  list_paragraph?: {
    hide_empty?: Maybe<boolean>
    empty_message?: Maybe<string>
    heading_behavior?: Maybe<"show" | "hide" | "remove">
  }
  sul_list_styles?: {link_display_style?: Maybe<string>}
  stanford_teaser?: {heading_behavior?: Maybe<"show" | "hide" | "remove">}
}

export type StanfordNode = BasicPage | Course | Event | EventSeries | News | Person | Library | StudyPlace

// Node Types.
export type BasicPage = DrupalNode & {
  type: "node--stanford_page"
  su_basic_page_type?: DrupalTaxonomyTerm[]
  su_page_banner?: BannerParagraph
  su_page_components?: StanfordParagraph[]
  su_page_description?: string
  su_page_image?: DrupalImageMedia
  su_shared_tabs?: DrupalTaxonomyTerm[]
  layout_selection?: DrupalLayoutSelection
}

export type Course = DrupalNode & {
  type: "node--stanford_course"
  body?: string
  su_course_academic_year?: string
  su_course_code?: string
  su_course_id?: number
  su_course_instructors?: string[]
  su_course_link?: DrupalLinkType
  su_course_quarters?: DrupalTaxonomyTerm[]
  su_course_section_units?: string
  su_course_subject?: DrupalTaxonomyTerm
  su_course_tags?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export type Event = DrupalNode & {
  type: "node--stanford_event"
  body?: string
  su_event_alt_loc?: string
  su_event_audience?: DrupalTaxonomyTerm[]
  su_event_components?: StanfordParagraph[]
  su_event_cta?: DrupalLinkType
  su_event_date_time: DrupalSmartDate
  su_event_dek?: string
  su_event_email?: string
  su_event_groups?: DrupalTaxonomyTerm[]
  su_event_keywords?: DrupalTaxonomyTerm[]
  su_event_location?: DrupalAddress
  su_event_map_link?: DrupalLinkType
  su_event_schedule?: DrupalParagraph[]
  su_event_source?: DrupalLinkType
  su_event_sponsor?: string[]
  su_event_subheadline?: string
  su_event_subject?: DrupalTaxonomyTerm[]
  su_event_telephone?: string
  su_event_type?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
  sul_event__image?: DrupalImageMedia
}

export type EventSeries = DrupalNode & {
  type: "node--stanford_event_series"
  su_event_series_components: StanfordParagraph[]
  su_event_series_dek: string
  su_event_series_event: DrupalNode[]
  su_event_series_subheadline: string
  su_event_series_type: DrupalTaxonomyTerm[]
  su_event_series_weight: number
  su_shared_tags: DrupalTaxonomyTerm[]
}

export type News = DrupalNode & {
  type: "node--stanford_news"
  su_news_banner?: DrupalImageMedia | DrupalVideoMedia
  su_news_banner_media_caption?: string
  su_news_byline?: string
  su_news_components?: StanfordParagraph[]
  su_news_dek?: string
  su_news_featured_media?: DrupalImageMedia
  su_news_publishing_date?: string
  su_news_source?: DrupalLinkType
  su_news_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
  su_news_hide_social?: boolean
}

export type Person = DrupalNode & {
  type: "node--stanford_person"
  body?: string
  su_person_academic_appt?: string
  su_person_address?: string
  su_person_admin_appts?: string
  su_person_affiliations?: DrupalLinkType[]
  su_person_components?: StanfordParagraph[]
  su_person_education?: string[]
  su_person_email?: string
  su_person_fax?: string
  su_person_first_name?: string
  su_person_full_title?: string
  su_person_last_name?: string
  su_person_links?: DrupalLinkType[]
  su_person_location_address?: string
  su_person_location_name?: string
  su_person_mail_code?: string
  su_person_map_url?: DrupalLinkType
  su_person_mobile_phone?: string
  su_person_photo?: DrupalImageMedia
  su_person_profile_link?: DrupalLinkType
  su_person_research?: string[]
  su_person_research_interests?: string
  su_person_scholarly_interests?: string
  su_person_short_title?: string
  su_person_telephone?: string
  su_person_type_group?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
  sul_person__libcal_id?: number
  sul_person__libguide_id?: number
  lib_guides: LibGuide[]
}

export type LibGuide = {
  id: string
  title: string
  url: string
  type: string
}

export type Publication = DrupalNode & {
  type: "node--stanford_publication"
  su_publication_author_ref: DrupalNode[]
  su_publication_citation: DrupalPublicationCitation
  su_publication_components?: StanfordParagraph[]
  su_publication_cta?: DrupalLinkType
  su_publication_image?: DrupalImageMedia
  su_publication_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export type Library = DrupalNode & {
  type: "node--sul_library"
  su_library__address?: DrupalAddress
  su_library__banner?: DrupalImageMedia
  su_library__contact_img?: DrupalImageMedia
  su_library__email?: string
  su_library__hours?: string
  su_library__map_link?: DrupalLinkType
  su_library__paragraphs?: StanfordParagraph[]
  su_library__phone?: number
  sul_library__a11y?: string
  layout_selection?: DrupalLayoutSelection
}

export type StudyPlace = DrupalNode & {
  type: "node--sul_study_place"
  sul_study__branch: Library
  sul_study__capacity: DrupalTaxonomyTerm
  sul_study__features?: DrupalTaxonomyTerm[]
  sul_study__type: DrupalTaxonomyTerm
}

// Paragraph Types.
export type StanfordParagraph =
  | LayoutParagraph
  | BannerParagraph
  | CardParagraph
  | ImageGalleryParagraph
  | ListParagraph
  | EntityTeaserParagraph
  | MediaCaptionParagraph
  | WysiwygParagraph
  | CollectionParagraph
  | FeaturedCollectionParagraph
  | ContactCardParagraph
  | ButtonParagraph
  | LibGuideParagraph

export type LayoutParagraphsBehaviors = {
  layout_paragraphs: {
    parent_uuid: string
    region: string
  }
}

export type LayoutParagraph = DrupalParagraph & {
  type: "paragraph--layout"
}

export type BannerParagraph = DrupalParagraph & {
  type: "paragraph--stanford_banner"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    hero_pattern?: {
      overlay_position?: string
    }
  }
  su_banner_body?: string
  su_banner_button?: DrupalLinkType
  su_banner_header?: string
  su_banner_image?: DrupalMedia
  su_banner_sup_header?: string
}

export type CardParagraph = DrupalParagraph & {
  type: "paragraph--stanford_card"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    sul_card_styles?: {
      orientation: string
      link_display_style?: string
      background_sprinkles?: string
    }
  }
  su_card_body?: string
  su_card_header?: string
  su_card_link?: DrupalLinkType
  su_card_link_display?: string
  su_card_media?: DrupalImageMedia | DrupalVideoMedia
  su_card_super_header?: string
}

export type ImageGalleryParagraph = DrupalParagraph & {
  type: "paragraph--stanford_gallery"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
  }
  su_gallery_button?: DrupalLinkType
  su_gallery_description?: string
  su_gallery_headline?: string
  su_gallery_images: DrupalGalleryImageMedia[]
}

export type ListParagraph = DrupalParagraph & {
  type: "paragraph--stanford_lists"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    sul_list_styles?: {
      link_display_style?: string
    }
    list_paragraph?: {
      hide_empty?: boolean
      empty_message?: string
    }
  }
  su_list_button?: DrupalLinkType
  su_list_description?: string
  su_list_headline?: string
  su_list_view: DrupalViewField
}

export type EntityTeaserParagraph = DrupalParagraph & {
  type: "paragraph--stanford_entity"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    sul_teaser_styles?: {
      orientation: string
      background_sprinkles: string
    }
  }
  su_entity_button?: DrupalLinkType
  su_entity_description?: string
  su_entity_headline?: string
  su_entity_item?: DrupalNode[]
}

export type MediaCaptionParagraph = DrupalParagraph & {
  type: "paragraph--stanford_media_caption"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
  }
  su_media_caption_caption?: string
  su_media_caption_link?: DrupalLinkType
  su_media_caption_media?: DrupalMedia
}

export type WysiwygParagraph = DrupalParagraph & {
  type: "paragraph--stanford_wysiwyg"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
  }
  su_wysiwyg_text?: string
}

export type CollectionParagraph = DrupalParagraph & {
  type: "paragraph--collection"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
  }
  sul_collection_heading: string
  sul_collection_card: CollectionCardParagraph[]
}

export type CollectionCardParagraph = DrupalParagraph & {
  type: "paragraph--collection_card"
  sul_card_info: string
  sul_card: CardParagraph
}

export type FeaturedCollectionParagraph = DrupalParagraph & {
  type: "paragraph--sul_feat_collection"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    sul_feat_collections_styles?: {
      link_display_style?: string
    }
  }
  sul_collection__cards: CardParagraph[]
  sul_collection__headline?: string
  sul_collection__link?: DrupalLinkType
}

export type ContactCardParagraph = DrupalParagraph & {
  type: "paragraph--sul_contact_card"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
  }
  sul_contact__branch?: Library
  sul_contact__link?: DrupalLinkType
  sul_contact__email?: string
  sul_contact__hours?: string
  sul_contact__image?: DrupalImageMedia
  sul_contact__phone?: string
  sul_contact__title?: string
}

export type ButtonParagraph = DrupalParagraph & {
  type: "paragraph--sul_button"
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviors
    sul_button_styles?: {
      background?: string
    }
  }
  sul_button_link: DrupalLinkType
  sul_button_headline?: string
}

export type LibGuideParagraph = DrupalParagraph & {
  type: "paragraph--sul_libguide"
  sul_libguide__headline: string
  sul_libguide__desc?: string
  sul_libguide_id: number
}

export type DrupalImageFile = DrupalFile & {
  image_style_uri: {[key: string]: string}
  uri: {
    value: string
    url: string
    base64: string
  }
}

// Media Types.
export type DrupalImageMedia = DrupalMedia & {
  type: "media--image"
  field_media_image: DrupalImageFile
}

export type DrupalVideoMedia = DrupalMedia & {
  type: "media--video"
  field_media_oembed_video: string
}

export type DrupalFileMedia = DrupalMedia & {
  type: "media--file"
  field_media_file: DrupalFile
}

export type DrupalGalleryImageMedia = DrupalMedia & {
  type: "media--stanford_gallery_images"
  su_gallery_caption?: string
  su_gallery_image: DrupalImageFile
}

export type DrupalEmbeddableMedia = DrupalMedia & {
  type: "media--embeddable"
  field_media_embeddable_code?: string
  field_media_embeddable_oembed?: string
}

// Config Pages
export type GlobalMessageType = JsonApiResource & {
  su_global_msg_type: "plain" | "success" | "info" | "warning" | "error"
  su_global_msg_enabled: boolean
  su_global_msg_link?: DrupalLinkType
  su_global_msg_header?: string
  su_global_msg_label?: string
  su_global_msg_message?: string
}

// Field Structures.
export type DrupalLayoutSelection = {
  id: string
  resourceIdObjMeta: {
    drupal_internal__target_id: string
  }
}

export type DrupalWysiwyg = {
  format: string
  processed: string
  summary?: string
  value: string
}

export type DrupalLinkType = {
  options: {
    attributes?: {
      [key: string]: string
    }
  }
  title: string
  uri: string
  url: string
}

export type DrupalSmartDate = {
  duration: string
  end_value: string
  rrule?: number
  rrule_index?: number
  timezone?: string
  value: string
}

export type DrupalAddress = {
  additional_name?: string
  address_line1?: string
  address_line2?: string
  administrative_area?: string
  country_code?: string
  family_name?: string
  given_name?: string
  locality?: string
  organization?: string
  postal_code?: string
  sorting_code?: string
}

export type DrupalName = {
  credentials?: string
  family?: string
  generational?: string
  given?: string
  middle?: string
  title?: string
}

export type DrupalViewField = {
  id: string
  resourceIdObjMeta: {
    arguments?: string
    display_id: string
    drupal_internal__target_id: string
    items_to_display?: number
  }
}

// Publication Citation entities.
export type DrupalPublicationCitation = JsonApiResource & {
  changed: string
  created: string
  drupal_internal__id: string
  su_author?: DrupalName[]
  su_day?: number
  su_doi?: string
  su_edition?: number
  su_genre?: any
  su_issue?: string
  su_month?: number
  su_page?: string
  su_publisher?: string
  su_publisher_place?: string
  su_subtitle?: string
  su_url?: DrupalLinkType
  su_volume?: string
  su_year?: number
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
      links: [Object]
      locations: []
    }
  }[]
  hours: DayHours[]
}
export type Params = {
  slug: string | string[]
}

export type PageProps = {
  params: Params
  searchParams?: Record<string, string | string[] | undefined>
}

export type DrupalRedirect = JsonApiResource & {
  redirect_source: {
    path: string
    query: []
  }
  redirect_redirect: {
    uri: string
    title: string
    options: []
    target_uuid: string
    url: string
  }
  status_code: number
}
