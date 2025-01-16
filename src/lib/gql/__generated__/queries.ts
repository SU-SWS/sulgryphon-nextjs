/** THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn graphql' INSTEAD. **/
import * as DrupalTypes from './drupal.d';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const FragmentDateTimeFragmentDoc = gql`
    fragment FragmentDateTime on DateTime {
  timezone
  time
}
    `;
export const FragmentNodeInterfaceFragmentDoc = gql`
    fragment FragmentNodeInterface on NodeInterface {
  __typename
  id
  title
  status
  path
  changed {
    ...FragmentDateTime
  }
  created {
    ...FragmentDateTime
  }
}
    ${FragmentDateTimeFragmentDoc}`;
export const FragmentTextSummaryFragmentDoc = gql`
    fragment FragmentTextSummary on TextSummary {
  processed
  summary
}
    `;
export const FragmentLinkFragmentDoc = gql`
    fragment FragmentLink on Link {
  url
  title
}
    `;
export const FragmentTermInterfaceFragmentDoc = gql`
    fragment FragmentTermInterface on TermInterface {
  __typename
  id
  name
  path
  weight
  parent {
    ... on TermInterface {
      id
    }
  }
}
    `;
export const FragmentNodeStanfordCourseFragmentDoc = gql`
    fragment FragmentNodeStanfordCourse on NodeStanfordCourse {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suCourseAcademicYear
  suCourseCode
  suCourseId
  suCourseInstructors
  suCourseLink {
    ...FragmentLink
  }
  suCourseQuarters {
    ...FragmentTermInterface
  }
  suCourseSectionUnits
  suCourseSubject {
    ...FragmentTermInterface
  }
  suCourseTags {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentMediaInterfaceFragmentDoc = gql`
    fragment FragmentMediaInterface on MediaInterface {
  __typename
  id
  name
}
    `;
export const FragmentMediaImageFragmentDoc = gql`
    fragment FragmentMediaImage on MediaImage {
  ...FragmentMediaInterface
  sulImageCredit
  mediaImage {
    url
    alt
    height
    width
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentParagraphInterfaceFragmentDoc = gql`
    fragment FragmentParagraphInterface on ParagraphInterface {
  __typename
  id
  behaviors
  status
}
    `;
export const FragmentTextFragmentDoc = gql`
    fragment FragmentText on Text {
  processed
}
    `;
export const FragmentParagraphStanfordAccordionFragmentDoc = gql`
    fragment FragmentParagraphStanfordAccordion on ParagraphStanfordAccordion {
  ...FragmentParagraphInterface
  suAccordionBody {
    ...FragmentText
  }
  suAccordionTitle
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordBannerFragmentDoc = gql`
    fragment FragmentParagraphStanfordBanner on ParagraphStanfordBanner {
  ...FragmentParagraphInterface
  suBannerHeader
  suBannerBody {
    ...FragmentText
  }
  suBannerSupHeader
  suBannerButton {
    url
    title
  }
  suBannerImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentMediaEmbeddableFragmentDoc = gql`
    fragment FragmentMediaEmbeddable on MediaEmbeddable {
  ...FragmentMediaInterface
  mediaEmbeddableCode
  mediaEmbeddableOembed
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaFileFragmentDoc = gql`
    fragment FragmentMediaFile on MediaFile {
  ...FragmentMediaInterface
  mediaFile {
    url
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaGoogleFormFragmentDoc = gql`
    fragment FragmentMediaGoogleForm on MediaGoogleForm {
  ...FragmentMediaInterface
  mediaGoogleForm
  mediaGoogleForm
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaStanfordGalleryImageFragmentDoc = gql`
    fragment FragmentMediaStanfordGalleryImage on MediaStanfordGalleryImage {
  ...FragmentMediaInterface
  suGalleryCaption
  suGalleryImage {
    url
    alt
    height
    width
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaVideoFragmentDoc = gql`
    fragment FragmentMediaVideo on MediaVideo {
  ...FragmentMediaInterface
  mediaOembedVideo
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaUnionFragmentDoc = gql`
    fragment FragmentMediaUnion on MediaUnion {
  ...FragmentMediaEmbeddable
  ...FragmentMediaFile
  ...FragmentMediaGoogleForm
  ...FragmentMediaImage
  ...FragmentMediaStanfordGalleryImage
  ...FragmentMediaVideo
}
    ${FragmentMediaEmbeddableFragmentDoc}
${FragmentMediaFileFragmentDoc}
${FragmentMediaGoogleFormFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentMediaStanfordGalleryImageFragmentDoc}
${FragmentMediaVideoFragmentDoc}`;
export const FragmentParagraphStanfordCardFragmentDoc = gql`
    fragment FragmentParagraphStanfordCard on ParagraphStanfordCard {
  ...FragmentParagraphInterface
  suCardHeader
  suCardSuperHeader
  suCardBody {
    ...FragmentText
  }
  suCardLink {
    url
    title
  }
  suCardMedia {
    ...FragmentMediaUnion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
export const FragmentParagraphStanfordEntityFragmentDoc = gql`
    fragment FragmentParagraphStanfordEntity on ParagraphStanfordEntity {
  ...FragmentParagraphInterface
  suEntityHeadline
  suEntityDescription {
    ...FragmentText
  }
  suEntityButton {
    url
    title
  }
  suEntityItem {
    ... on NodeInterface {
      id
      path
    }
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordGalleryFragmentDoc = gql`
    fragment FragmentParagraphStanfordGallery on ParagraphStanfordGallery {
  ...FragmentParagraphInterface
  suGalleryHeadline
  suGalleryDescription {
    ...FragmentText
  }
  suGalleryButton {
    url
    title
  }
  suGalleryImages {
    ...FragmentMediaStanfordGalleryImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaStanfordGalleryImageFragmentDoc}`;
export const FragmentParagraphStanfordListFragmentDoc = gql`
    fragment FragmentParagraphStanfordList on ParagraphStanfordList {
  ...FragmentParagraphInterface
  suListHeadline
  suListDescription {
    ...FragmentText
  }
  suListButton {
    url
    title
  }
  suListView {
    view
    display
    contextualFilter
    pageSize
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordMediaCaptionFragmentDoc = gql`
    fragment FragmentParagraphStanfordMediaCaption on ParagraphStanfordMediaCaption {
  ...FragmentParagraphInterface
  suMediaCaptionMedia {
    ...FragmentMediaUnion
  }
  suMediaCaptionLink {
    url
    title
  }
  suMediaCaptionCaption {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordSpacerFragmentDoc = gql`
    fragment FragmentParagraphStanfordSpacer on ParagraphStanfordSpacer {
  ...FragmentParagraphInterface
  suSpacerSize
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordWysiwygFragmentDoc = gql`
    fragment FragmentParagraphStanfordWysiwyg on ParagraphStanfordWysiwyg {
  ...FragmentParagraphInterface
  suWysiwygText {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphLayoutFragmentDoc = gql`
    fragment FragmentParagraphLayout on ParagraphLayout {
  ...FragmentParagraphInterface
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphCollectionCardFragmentDoc = gql`
    fragment FragmentParagraphCollectionCard on ParagraphCollectionCard {
  ...FragmentParagraphInterface
  sulCard {
    ...FragmentParagraphStanfordCard
  }
  sulCardInfo
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}`;
export const FragmentParagraphCollectionFragmentDoc = gql`
    fragment FragmentParagraphCollection on ParagraphCollection {
  ...FragmentParagraphInterface
  sulCollectionCard {
    ...FragmentParagraphCollectionCard
  }
  sulCollectionHeading
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphCollectionCardFragmentDoc}`;
export const FragmentParagraphSulButtonFragmentDoc = gql`
    fragment FragmentParagraphSulButton on ParagraphSulButton {
  ...FragmentParagraphInterface
  sulButtonHeadline
  sulButtonLink {
    ...FragmentLink
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentAddressTypeFragmentDoc = gql`
    fragment FragmentAddressType on Address {
  langcode
  country {
    name
    code
  }
  givenName
  additionalName
  familyName
  organization
  addressLine1
  addressLine2
  postalCode
  sortingCode
  dependentLocality
  locality
  administrativeArea
}
    `;
export const FragmentParagraphSulContactCardFragmentDoc = gql`
    fragment FragmentParagraphSulContactCard on ParagraphSulContactCard {
  ...FragmentParagraphInterface
  sulContactAddress {
    ...FragmentAddressType
  }
  sulContactBranch {
    id
    path
  }
  sulContactEmail
  sulContactHours
  sulContactImage {
    ...FragmentMediaImage
  }
  sulContactLink {
    ...FragmentLink
  }
  sulContactMapLink {
    ...FragmentLink
  }
  sulContactPhone
  sulContactTitle
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentParagraphSulFeatCollectionFragmentDoc = gql`
    fragment FragmentParagraphSulFeatCollection on ParagraphSulFeatCollection {
  ...FragmentParagraphInterface
  sulCollectionCards {
    ...FragmentParagraphStanfordCard
  }
  sulCollectionHeadline
  sulCollectionLink {
    ...FragmentLink
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentParagraphSulLibguideFragmentDoc = gql`
    fragment FragmentParagraphSulLibguide on ParagraphSulLibguide {
  ...FragmentParagraphInterface
  sulLibguideDesc {
    processed
  }
  sulLibguideHeadline
  sulLibguideId
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordFaqFragmentDoc = gql`
    fragment FragmentParagraphStanfordFaq on ParagraphStanfordFaq {
  ...FragmentParagraphInterface
  created {
    ...FragmentDateTime
  }
  suFaqDescription {
    ...FragmentText
  }
  suFaqHeadline
  suFaqQuestions {
    ...FragmentParagraphStanfordAccordion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentDateTimeFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentParagraphStanfordAccordionFragmentDoc}`;
export const FragmentParagraphSulHomeImageFragmentDoc = gql`
    fragment FragmentParagraphSulHomeImage on ParagraphSulHomeImage {
  ...FragmentParagraphInterface
  sulHomeImage {
    ...FragmentMediaImage
  }
  sulHomeImageCredits {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphSulHomeBannerFragmentDoc = gql`
    fragment FragmentParagraphSulHomeBanner on ParagraphSulHomeBanner {
  ...FragmentParagraphInterface
  sulHomeImages {
    ...FragmentParagraphSulHomeImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphSulHomeImageFragmentDoc}`;
export const FragmentParagraphSulLocationHourFragmentDoc = gql`
    fragment FragmentParagraphSulLocationHour on ParagraphSulLocationHour {
  ...FragmentParagraphInterface
  sulLocHoursAlert {
    processed
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphUnionFragmentDoc = gql`
    fragment FragmentParagraphUnion on ParagraphUnion {
  ...FragmentParagraphInterface
  ...FragmentParagraphStanfordAccordion
  ...FragmentParagraphStanfordBanner
  ...FragmentParagraphStanfordCard
  ...FragmentParagraphStanfordEntity
  ...FragmentParagraphStanfordGallery
  ...FragmentParagraphStanfordList
  ...FragmentParagraphStanfordMediaCaption
  ...FragmentParagraphStanfordSpacer
  ...FragmentParagraphStanfordWysiwyg
  ...FragmentParagraphLayout
  ...FragmentParagraphCollection
  ...FragmentParagraphCollectionCard
  ...FragmentParagraphSulButton
  ...FragmentParagraphSulContactCard
  ...FragmentParagraphSulFeatCollection
  ...FragmentParagraphSulLibguide
  ...FragmentParagraphStanfordFaq
  ...FragmentParagraphSulHomeImage
  ...FragmentParagraphSulHomeBanner
  ...FragmentParagraphSulLocationHour
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordAccordionFragmentDoc}
${FragmentParagraphStanfordBannerFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentParagraphStanfordEntityFragmentDoc}
${FragmentParagraphStanfordGalleryFragmentDoc}
${FragmentParagraphStanfordListFragmentDoc}
${FragmentParagraphStanfordMediaCaptionFragmentDoc}
${FragmentParagraphStanfordSpacerFragmentDoc}
${FragmentParagraphStanfordWysiwygFragmentDoc}
${FragmentParagraphLayoutFragmentDoc}
${FragmentParagraphCollectionFragmentDoc}
${FragmentParagraphCollectionCardFragmentDoc}
${FragmentParagraphSulButtonFragmentDoc}
${FragmentParagraphSulContactCardFragmentDoc}
${FragmentParagraphSulFeatCollectionFragmentDoc}
${FragmentParagraphSulLibguideFragmentDoc}
${FragmentParagraphStanfordFaqFragmentDoc}
${FragmentParagraphSulHomeImageFragmentDoc}
${FragmentParagraphSulHomeBannerFragmentDoc}
${FragmentParagraphSulLocationHourFragmentDoc}`;
export const FragmentSmartDateTypeFragmentDoc = gql`
    fragment FragmentSmartDateType on SmartDateType {
  value
  end_value
  timezone
  rrule_index
  rrule
}
    `;
export const FragmentParagraphStanfordPersonCtumFragmentDoc = gql`
    fragment FragmentParagraphStanfordPersonCtum on ParagraphStanfordPersonCtum {
  ...FragmentParagraphInterface
  suPersonCtaName
  suPersonCtaTitle
  suPersonCtaLink {
    url
    title
  }
  suPersonCtaImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentParagraphStanfordScheduleFragmentDoc = gql`
    fragment FragmentParagraphStanfordSchedule on ParagraphStanfordSchedule {
  ...FragmentParagraphInterface
  suScheduleHeadline
  suScheduleDescription {
    ...FragmentText
  }
  suScheduleDateTime {
    ...FragmentSmartDateType
  }
  suScheduleLocation {
    ...FragmentAddressType
  }
  suScheduleUrl {
    url
    title
  }
  suScheduleSpeaker {
    ...FragmentParagraphStanfordPersonCtum
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentParagraphStanfordPersonCtumFragmentDoc}`;
export const FragmentNodeStanfordEventFragmentDoc = gql`
    fragment FragmentNodeStanfordEvent on NodeStanfordEvent {
  ...FragmentNodeInterface
  sulEventImage {
    ...FragmentMediaImage
  }
  body {
    ...FragmentTextSummary
  }
  suEventAltLoc
  suEventAudience {
    ...FragmentTermInterface
  }
  suEventComponents {
    ...FragmentParagraphUnion
  }
  suEventContactInfo
  suEventCta {
    ...FragmentLink
  }
  suEventDateTime {
    ...FragmentSmartDateType
  }
  suEventDek
  suEventEmail
  suEventGroups {
    ...FragmentTermInterface
  }
  suEventKeywords {
    ...FragmentTermInterface
  }
  suEventLocation {
    ...FragmentAddressType
  }
  suEventMapLink {
    ...FragmentLink
  }
  suEventSchedule {
    ...FragmentParagraphStanfordSchedule
  }
  suEventSource {
    ...FragmentLink
  }
  suEventSponsor
  suEventSubheadline
  suEventSubject {
    ...FragmentTermInterface
  }
  suEventTelephone
  suEventType {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentParagraphStanfordScheduleFragmentDoc}`;
export const FragmentNodeStanfordEventTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordEventTeaser on NodeStanfordEvent {
  ...FragmentNodeInterface
  sulEventImage {
    ...FragmentMediaImage
  }
  suEventDateTime {
    ...FragmentSmartDateType
  }
  suEventType {
    ...FragmentTermInterface
  }
  suEventSource {
    ...FragmentLink
  }
  suEventMapLink {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentNodeStanfordEventSeriesFragmentDoc = gql`
    fragment FragmentNodeStanfordEventSeries on NodeStanfordEventSeries {
  ...FragmentNodeInterface
  suEventSeriesComponents {
    ...FragmentParagraphUnion
  }
  suEventSeriesDek
  suEventSeriesEvent {
    ...FragmentNodeStanfordEventTeaser
  }
  suEventSeriesSubheadline
  suEventSeriesType {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordNewsFragmentDoc = gql`
    fragment FragmentNodeStanfordNews on NodeStanfordNews {
  ...FragmentNodeInterface
  layoutSelection {
    id
  }
  suNewsBanner {
    ...FragmentMediaUnion
  }
  suNewsBannerMediaCaption
  suNewsByline
  suNewsComponents {
    ...FragmentParagraphUnion
  }
  suNewsDek
  suNewsFeaturedMedia {
    ...FragmentMediaUnion
  }
  suNewsHideSocial
  suNewsPublishingDate {
    ...FragmentDateTime
  }
  suNewsSource {
    ...FragmentLink
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
  sulRelLinksHeading
  sulRelLinks {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentDateTimeFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordPageFragmentDoc = gql`
    fragment FragmentNodeStanfordPage on NodeStanfordPage {
  ...FragmentNodeInterface
  layoutSelection {
    id
  }
  suBasicPageType {
    ...FragmentTermInterface
  }
  suPageBanner {
    ...FragmentParagraphStanfordBanner
    ...FragmentParagraphSulHomeBanner
  }
  suPageComponents {
    ...FragmentParagraphUnion
  }
  suPageDescription
  suPageImage {
    ...FragmentMediaUnion
  }
  sulRelLinksHeading
  sulRelLinks {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphStanfordBannerFragmentDoc}
${FragmentParagraphSulHomeBannerFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentNodeStanfordPersonFragmentDoc = gql`
    fragment FragmentNodeStanfordPerson on NodeStanfordPerson {
  ...FragmentNodeInterface
  sulPersonLibguideId
  sulPersonLibcalId
  body {
    ...FragmentTextSummary
  }
  suPersonAcademicAppt
  suPersonAdminAppts
  suPersonAffiliations {
    ...FragmentLink
  }
  suPersonComponents {
    ...FragmentParagraphUnion
  }
  suPersonEducation
  suPersonEmail
  suPersonFax
  suPersonFirstName
  suPersonFullTitle
  suPersonLastName
  suPersonLinks {
    ...FragmentLink
  }
  suPersonLocationAddress {
    ...FragmentText
  }
  suPersonLocationName
  suPersonMailCode
  suPersonMapUrl {
    ...FragmentLink
  }
  suPersonMobilePhone
  suPersonPhoto {
    ...FragmentMediaImage
  }
  suPersonProfileLink {
    ...FragmentLink
  }
  suPersonPronouns
  suPersonResearch {
    ...FragmentText
  }
  suPersonResearchInterests
  suPersonScholarlyInterests {
    ...FragmentText
  }
  suPersonShortTitle
  suPersonTelephone
  suPersonTypeGroup {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentSuPolicyLogFragmentDoc = gql`
    fragment FragmentSuPolicyLog on SuPolicyLog {
  __typename
  id
  suPolicyDate {
    ...FragmentDateTime
  }
  suPolicyNotes
  suPolicyPublic
  suPolicyTitle
}
    ${FragmentDateTimeFragmentDoc}`;
export const FragmentNodeStanfordPolicyFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicy on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suPolicyAuthority
  suPolicyAutoPrefix
  suPolicyChangelog {
    ...FragmentSuPolicyLog
  }
  suPolicyChapter
  suPolicyEffective {
    ...FragmentDateTime
  }
  suPolicyPolicyNum
  suPolicyRelated {
    ... on NodeInterface {
      id
      path
    }
  }
  suPolicySubchapter
  suPolicyTitle
  suPolicyUpdated {
    ...FragmentDateTime
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentSuPolicyLogFragmentDoc}
${FragmentDateTimeFragmentDoc}`;
export const FragmentNodeStanfordPersonTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPersonTeaser on NodeStanfordPerson {
  ...FragmentNodeInterface
  suPersonPhoto {
    ...FragmentMediaImage
  }
  suPersonFullTitle
  suPersonShortTitle
  suPersonEmail
  sulPersonLibguideId
  sulPersonLibcalId
  suPersonResearch {
    processed
  }
  suPersonTypeGroup {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordPublicationFragmentDoc = gql`
    fragment FragmentNodeStanfordPublication on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationAuthorRef {
    ...FragmentNodeStanfordPersonTeaser
  }
  suPublicationComponents {
    ...FragmentParagraphUnion
  }
  suPublicationCta {
    ...FragmentLink
  }
  suPublicationImage {
    ...FragmentMediaImage
  }
  suPublicationTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeSulLibraryFragmentDoc = gql`
    fragment FragmentNodeSulLibrary on NodeSulLibrary {
  ...FragmentNodeInterface
  layoutSelection {
    id
  }
  sulLibraryExtUrl {
    url
  }
  suLibraryAddress {
    ...FragmentAddressType
  }
  suLibraryBanner {
    ...FragmentMediaImage
  }
  suLibraryContactImg {
    ...FragmentMediaImage
  }
  suLibraryEmail
  suLibraryHours
  suLibraryMapLink {
    ...FragmentLink
  }
  suLibraryParagraphs {
    ...FragmentParagraphUnion
  }
  suLibraryPhone
  sulLibraryA11y {
    processed
  }
  sulLibraryType
  sulRelLinksHeading
  sulRelLinks {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentParagraphUnionFragmentDoc}`;
export const FragmentNodeSulStudyPlaceFragmentDoc = gql`
    fragment FragmentNodeSulStudyPlace on NodeSulStudyPlace {
  ...FragmentNodeInterface
  sulStudyBranch {
    ...FragmentNodeSulLibrary
  }
  sulStudyCapacity {
    ...FragmentTermInterface
  }
  sulStudyFeatures {
    ...FragmentTermInterface
  }
  sulStudyLibcalId
  sulStudyType {
    ...FragmentTermInterface
  }
  sulStudyRoomNumber
  sulStudyRoomDonorName
  sulStudyImage {
    ...FragmentMediaImage
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeSulLibraryFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeUnionFragmentDoc = gql`
    fragment FragmentNodeUnion on NodeUnion {
  ...FragmentNodeInterface
  ...FragmentNodeStanfordCourse
  ...FragmentNodeStanfordEvent
  ...FragmentNodeStanfordEventSeries
  ...FragmentNodeStanfordNews
  ...FragmentNodeStanfordPage
  ...FragmentNodeStanfordPerson
  ...FragmentNodeStanfordPolicy
  ...FragmentNodeStanfordPublication
  ...FragmentNodeSulLibrary
  ...FragmentNodeSulStudyPlace
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordCourseFragmentDoc}
${FragmentNodeStanfordEventFragmentDoc}
${FragmentNodeStanfordEventSeriesFragmentDoc}
${FragmentNodeStanfordNewsFragmentDoc}
${FragmentNodeStanfordPageFragmentDoc}
${FragmentNodeStanfordPersonFragmentDoc}
${FragmentNodeStanfordPolicyFragmentDoc}
${FragmentNodeStanfordPublicationFragmentDoc}
${FragmentNodeSulLibraryFragmentDoc}
${FragmentNodeSulStudyPlaceFragmentDoc}`;
export const FragmentNodeStanfordCourseTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordCourseTeaser on NodeStanfordCourse {
  ...FragmentNodeInterface
  suCourseSubject {
    ...FragmentTermInterface
  }
  suCourseAcademicYear
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordEventSeriesTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordEventSeriesTeaser on NodeStanfordEventSeries {
  ...FragmentNodeInterface
  suEventSeriesDek
}
    ${FragmentNodeInterfaceFragmentDoc}`;
export const FragmentNodeStanfordNewsTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordNewsTeaser on NodeStanfordNews {
  ...FragmentNodeInterface
  suNewsBanner {
    ...FragmentMediaImage
  }
  suNewsDek
  suNewsFeaturedMedia {
    ...FragmentMediaImage
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
  suNewsPublishingDate {
    ...FragmentDateTime
  }
  suNewsSource {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentDateTimeFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentNodeStanfordPageTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPageTeaser on NodeStanfordPage {
  ...FragmentNodeInterface
  suPageDescription
  suPageImage {
    ...FragmentMediaImage
  }
  suPageBanner {
    ...FragmentParagraphStanfordBanner
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentParagraphStanfordBannerFragmentDoc}`;
export const FragmentNodeStanfordPolicyTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicyTeaser on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}`;
export const FragmentNodeStanfordPublicationTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPublicationTeaser on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeSulLibraryTeaserFragmentDoc = gql`
    fragment FragmentNodeSulLibraryTeaser on NodeSulLibrary {
  ...FragmentNodeInterface
  suLibraryHours
  suLibraryPhone
  suLibraryEmail
  suLibraryContactImg {
    ...FragmentMediaImage
  }
  suLibraryAddress {
    ...FragmentAddressType
  }
  suLibraryEmail
  suLibraryPhone
  suLibraryMapLink {
    ...FragmentLink
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentNodeSulStudyPlaceTeaserFragmentDoc = gql`
    fragment FragmentNodeSulStudyPlaceTeaser on NodeSulStudyPlace {
  ...FragmentNodeInterface
  sulStudyLibcalId
  sulStudyFeatures {
    ...FragmentTermInterface
  }
  sulStudyCapacity {
    ...FragmentTermInterface
  }
  sulStudyType {
    ...FragmentTermInterface
  }
  sulStudyBranch {
    ...FragmentNodeSulLibraryTeaser
  }
  sulStudyRoomNumber
  sulStudyRoomDonorName
  sulStudyImage {
    ...FragmentMediaImage
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentNodeSulLibraryTeaserFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeTeaserUnionFragmentDoc = gql`
    fragment FragmentNodeTeaserUnion on NodeUnion {
  ...FragmentNodeInterface
  ...FragmentNodeStanfordCourseTeaser
  ...FragmentNodeStanfordEventTeaser
  ...FragmentNodeStanfordEventSeriesTeaser
  ...FragmentNodeStanfordNewsTeaser
  ...FragmentNodeStanfordPageTeaser
  ...FragmentNodeStanfordPersonTeaser
  ...FragmentNodeStanfordPolicyTeaser
  ...FragmentNodeStanfordPublicationTeaser
  ...FragmentNodeSulLibraryTeaser
  ...FragmentNodeSulStudyPlaceTeaser
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordCourseTeaserFragmentDoc}
${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentNodeStanfordEventSeriesTeaserFragmentDoc}
${FragmentNodeStanfordNewsTeaserFragmentDoc}
${FragmentNodeStanfordPageTeaserFragmentDoc}
${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentNodeStanfordPolicyTeaserFragmentDoc}
${FragmentNodeStanfordPublicationTeaserFragmentDoc}
${FragmentNodeSulLibraryTeaserFragmentDoc}
${FragmentNodeSulStudyPlaceTeaserFragmentDoc}`;
export const FragmentParagraphStanfordPageTitleBannerFragmentDoc = gql`
    fragment FragmentParagraphStanfordPageTitleBanner on ParagraphStanfordPageTitleBanner {
  ...FragmentParagraphInterface
  suTitleBannerImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentMenuLinkFragmentDoc = gql`
    fragment FragmentMenuLink on MenuItem {
  url
  title
  id
  expanded
}
    `;
export const FragmentViewPageInfoFragmentDoc = gql`
    fragment FragmentViewPageInfo on ViewPageInfo {
  page
  total
}
    `;
export const NodeDocument = gql`
    query Node($uuid: ID!) {
  node(id: $uuid) {
    ...FragmentNodeUnion
  }
}
    ${FragmentNodeUnionFragmentDoc}`;
export const NodesDocument = gql`
    query Nodes {
  nodeStanfordCourses(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordEventSeriesItems(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordEvents(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordNewsItems(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordPages(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordPeople(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordPolicies(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeStanfordPublications(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
  nodeSulLibraries(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeInterface
    }
  }
}
    ${FragmentNodeInterfaceFragmentDoc}`;
export const LibrariesDocument = gql`
    query Libraries {
  nodeSulLibraries(first: 1000, sortKey: TITLE) {
    nodes {
      id
      title
      path
      suLibraryHours
      suLibraryContactImg {
        ...FragmentMediaImage
      }
      suLibraryBanner {
        ...FragmentMediaImage
      }
      suLibraryMapLink {
        ...FragmentLink
      }
    }
  }
}
    ${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const MediaDocument = gql`
    query Media($uuid: ID!) {
  media(id: $uuid) {
    ...FragmentMediaUnion
  }
}
    ${FragmentMediaUnionFragmentDoc}`;
export const TermDocument = gql`
    query Term($uuid: ID!) {
  term(id: $uuid) {
    ...FragmentTermInterface
  }
}
    ${FragmentTermInterfaceFragmentDoc}`;
export const ConfigPagesDocument = gql`
    query ConfigPages {
  stanfordBasicSiteSettings(first: 1) {
    nodes {
      __typename
      suGoogleAnalytics
      suSiteAlgolia
      suSiteAlgoliaId
      suSiteAlgoliaIndex
      suSiteAlgoliaSearch
      suSiteDropdowns
      suSiteMenuLevels
      suSiteName
      suSiteNobots
    }
  }
  stanfordGlobalMessages(first: 1) {
    nodes {
      __typename
      suGlobalMsgEnabled
      suGlobalMsgHeader
      suGlobalMsgLabel
      suGlobalMsgLink {
        title
        url
      }
      suGlobalMsgMessage {
        processed
      }
      suGlobalMsgType
    }
  }
  stanfordLocalFooters(first: 1) {
    nodes {
      __typename
      suFooterEnabled
      suLocalFootAction {
        title
        url
      }
      suLocalFootAddress {
        additionalName
        addressLine1
        addressLine2
        administrativeArea
        country {
          code
          name
        }
        dependentLocality
        familyName
        givenName
        langcode
        locality
        organization
        postalCode
        sortingCode
      }
      suLocalFootFButton
      suLocalFootFIntro {
        processed
      }
      suLocalFootFMethod
      suLocalFootFUrl {
        url
        title
      }
      suLocalFootLine1
      suLocalFootLine4
      suLocalFootLine2
      suLocalFootLine3
      suLocalFootLine5
      suLocalFootLocImg {
        alt
        height
        url
        width
      }
      suLocalFootLocLink {
        title
        url
      }
      suLocalFootLocOp
      suLocalFootPrCo {
        processed
      }
      suLocalFootPrimary {
        title
        url
      }
      suLocalFootPrimeH
      suLocalFootSeCo {
        processed
      }
      suLocalFootSecond {
        title
        url
      }
      suLocalFootSecondH
      suLocalFootSocial {
        title
        url
      }
      suLocalFootSunetT
      suLocalFootTr2Co {
        processed
      }
      suLocalFootTrCo {
        processed
      }
      suLocalFootUseLoc
      suLocalFootUseLogo
    }
  }
  stanfordSuperFooters(first: 1) {
    nodes {
      __typename
      suSuperFootEnabled
      suSuperFootIntranet {
        title
        url
      }
      suSuperFootLink {
        title
        url
      }
      suSuperFootText {
        processed
      }
      suSuperFootTitle
    }
  }
  lockupSettings(first: 1) {
    nodes {
      __typename
      suLine1
      suLine2
      suLine3
      suLine4
      suLine5
      suLockupEnabled
      suLockupOptions
      suUploadLogoImage {
        alt
        height
        url
        width
      }
      suUseThemeLogo
    }
  }
}
    `;
export const NewsTypesDocument = gql`
    query NewsTypes {
  termStanfordNewsTopics(first: 1000, sortKey: TITLE) {
    nodes {
      id
      name
    }
  }
}
    `;
export const MenuDocument = gql`
    query Menu($name: MenuAvailable = MAIN) {
  menu(name: $name) {
    items {
      ...FragmentMenuLink
      children {
        ...FragmentMenuLink
        children {
          ...FragmentMenuLink
          children {
            ...FragmentMenuLink
            children {
              ...FragmentMenuLink
            }
          }
        }
      }
    }
  }
}
    ${FragmentMenuLinkFragmentDoc}`;
export const RouteDocument = gql`
    query Route($path: String!, $teaser: Boolean = false) {
  route(path: $path) {
    __typename
    ... on RouteRedirect {
      url
      internal
      status
      redirect
    }
    ... on RouteInternal {
      entity {
        ...FragmentNodeUnion @skip(if: $teaser)
        ...FragmentNodeTeaserUnion @include(if: $teaser)
      }
    }
  }
}
    ${FragmentNodeUnionFragmentDoc}
${FragmentNodeTeaserUnionFragmentDoc}`;
export const SulStudyPlacesDocument = gql`
    query sulStudyPlaces {
  sulStudyPlaces {
    results {
      ...FragmentNodeSulStudyPlaceTeaser
    }
  }
}
    ${FragmentNodeSulStudyPlaceTeaserFragmentDoc}`;
export const SulBranchLocationsDocument = gql`
    query sulBranchLocations {
  sulBranchLocations {
    results {
      ...FragmentNodeSulLibraryTeaser
    }
  }
}
    ${FragmentNodeSulLibraryTeaserFragmentDoc}`;
export const SulEventsDocument = gql`
    query sulEvents($contextualFilters: SulEventsContextualFilterInput, $sortDir: SortDirection = ASC, $pageSize: Int, $page: Int = -1, $offset: Int) {
  sulEvents(
    contextualFilter: $contextualFilters
    sortDir: $sortDir
    sortKey: START_TIME
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordEventTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const SulEventsSharedTagsDocument = gql`
    query sulEventsSharedTags($contextualFilters: SulEventsSharedTagsContextualFilterInput, $sortDir: SortDirection = ASC, $pageSize: Int, $page: Int = -1, $offset: Int) {
  sulEventsSharedTags(
    contextualFilter: $contextualFilters
    sortDir: $sortDir
    sortKey: START_TIME
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordEventTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordBasicPagesDocument = gql`
    query stanfordBasicPages($contextualFilters: StanfordBasicPagesContextualFilterInput, $sortKey: StanfordBasicPagesSortKeys, $sortDir: SortDirection, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordBasicPages(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
    sortKey: $sortKey
    sortDir: $sortDir
  ) {
    results {
      ...FragmentNodeStanfordPageTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordPageTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordNewsDocument = gql`
    query stanfordNews($contextualFilters: StanfordNewsContextualFilterInput, $filter: StanfordNewsFilterInput, $pageSize: Int = -1, $page: Int, $offset: Int) {
  stanfordNews(
    contextualFilter: $contextualFilters
    filter: $filter
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordNewsTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordNewsTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordPersonDocument = gql`
    query stanfordPerson($contextualFilters: StanfordPersonContextualFilterInput, $pageSize: Int, $page: Int = -1, $offset: Int) {
  stanfordPerson(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordPersonTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordSharedTagsDocument = gql`
    query stanfordSharedTags($contextualFilters: StanfordSharedTagsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordSharedTags(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeTeaserUnion
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeTeaserUnionFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Node(variables: DrupalTypes.NodeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.NodeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.NodeQuery>(NodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Node', 'query', variables);
    },
    Nodes(variables?: DrupalTypes.NodesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.NodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.NodesQuery>(NodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Nodes', 'query', variables);
    },
    Libraries(variables?: DrupalTypes.LibrariesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.LibrariesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.LibrariesQuery>(LibrariesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Libraries', 'query', variables);
    },
    Media(variables: DrupalTypes.MediaQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.MediaQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.MediaQuery>(MediaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Media', 'query', variables);
    },
    Term(variables: DrupalTypes.TermQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.TermQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.TermQuery>(TermDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Term', 'query', variables);
    },
    ConfigPages(variables?: DrupalTypes.ConfigPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.ConfigPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.ConfigPagesQuery>(ConfigPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ConfigPages', 'query', variables);
    },
    NewsTypes(variables?: DrupalTypes.NewsTypesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.NewsTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.NewsTypesQuery>(NewsTypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NewsTypes', 'query', variables);
    },
    Menu(variables?: DrupalTypes.MenuQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.MenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.MenuQuery>(MenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Menu', 'query', variables);
    },
    Route(variables: DrupalTypes.RouteQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.RouteQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.RouteQuery>(RouteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Route', 'query', variables);
    },
    sulStudyPlaces(variables?: DrupalTypes.SulStudyPlacesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SulStudyPlacesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SulStudyPlacesQuery>(SulStudyPlacesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sulStudyPlaces', 'query', variables);
    },
    sulBranchLocations(variables?: DrupalTypes.SulBranchLocationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SulBranchLocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SulBranchLocationsQuery>(SulBranchLocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sulBranchLocations', 'query', variables);
    },
    sulEvents(variables?: DrupalTypes.SulEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SulEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SulEventsQuery>(SulEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sulEvents', 'query', variables);
    },
    sulEventsSharedTags(variables?: DrupalTypes.SulEventsSharedTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SulEventsSharedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SulEventsSharedTagsQuery>(SulEventsSharedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sulEventsSharedTags', 'query', variables);
    },
    stanfordBasicPages(variables?: DrupalTypes.StanfordBasicPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordBasicPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordBasicPagesQuery>(StanfordBasicPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordBasicPages', 'query', variables);
    },
    stanfordNews(variables?: DrupalTypes.StanfordNewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordNewsQuery>(StanfordNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordNews', 'query', variables);
    },
    stanfordPerson(variables?: DrupalTypes.StanfordPersonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordPersonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordPersonQuery>(StanfordPersonDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordPerson', 'query', variables);
    },
    stanfordSharedTags(variables?: DrupalTypes.StanfordSharedTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordSharedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordSharedTagsQuery>(StanfordSharedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordSharedTags', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;