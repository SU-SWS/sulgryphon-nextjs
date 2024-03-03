/** THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn graphql' INSTEAD. **/
import * as DrupalTypes from './drupal.d';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const FragmentNodeInterfaceFragmentDoc = gql`
    fragment FragmentNodeInterface on NodeInterface {
  __typename
  id
  title
  status
  path
  changed {
    time
  }
  created {
    time
  }
}
    `;
export const FragmentLinkFragmentDoc = gql`
    fragment FragmentLink on Link {
  url
  title
  attributes {
    ariaLabel
  }
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
    processed
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
${FragmentLinkFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentParagraphInterfaceFragmentDoc = gql`
    fragment FragmentParagraphInterface on ParagraphInterface {
  __typename
  id
  behaviors
}
    `;
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
export const FragmentMediaInterfaceFragmentDoc = gql`
    fragment FragmentMediaInterface on MediaInterface {
  __typename
  id
  name
}
    `;
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
export const FragmentMediaImageFragmentDoc = gql`
    fragment FragmentMediaImage on MediaImage {
  ...FragmentMediaInterface
  mediaImage {
    url
    alt
    height
    width
  }
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
    processed
  }
  suCardLink {
    ...FragmentLink
  }
  suCardMedia {
    ...FragmentMediaUnion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
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
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentAddressTypeFragmentDoc}`;
export const FragmentParagraphSulContactCardFragmentDoc = gql`
    fragment FragmentParagraphSulContactCard on ParagraphSulContactCard {
  ...FragmentParagraphInterface
  sulContactAddress {
    ...FragmentAddressType
  }
  sulContactBranch {
    ...FragmentNodeSulLibraryTeaser
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
${FragmentNodeSulLibraryTeaserFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}`;
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
export const FragmentParagraphStanfordAccordionFragmentDoc = gql`
    fragment FragmentParagraphStanfordAccordion on ParagraphStanfordAccordion {
  ...FragmentParagraphInterface
  suAccordionBody {
    processed
  }
  suAccordionTitle
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordBannerFragmentDoc = gql`
    fragment FragmentParagraphStanfordBanner on ParagraphStanfordBanner {
  ...FragmentParagraphInterface
  suBannerHeader
  suBannerBody {
    processed
  }
  suBannerSupHeader
  suBannerButton {
    ...FragmentLink
  }
  suBannerImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
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
export const FragmentSmartDateTypeFragmentDoc = gql`
    fragment FragmentSmartDateType on SmartDateType {
  value
  end_value
  timezone
  rrule_index
  rrule
}
    `;
export const FragmentNodeStanfordEventTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordEventTeaser on NodeStanfordEvent {
  ...FragmentNodeInterface
  suEventAltLoc
  suEventMapLink {
    ...FragmentLink
  }
  suEventDateTime {
    ...FragmentSmartDateType
  }
  suEventType {
    ...FragmentTermInterface
  }
  sulEventImage {
    ...FragmentMediaImage
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
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
  suNewsFeaturedMedia {
    ...FragmentMediaImage
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
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
export const FragmentNodeStanfordPersonTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPersonTeaser on NodeStanfordPerson {
  ...FragmentNodeInterface
  suPersonFullTitle
  suPersonEmail
  sulPersonLibguideId
  sulPersonLibcalId
  suPersonPhoto {
    ...FragmentMediaImage
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeStanfordPolicyTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicyTeaser on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    processed
    summary
  }
}
    ${FragmentNodeInterfaceFragmentDoc}`;
export const FragmentNodeStanfordPublicationTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPublicationTeaser on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
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
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentNodeSulLibraryTeaserFragmentDoc}`;
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
export const FragmentParagraphStanfordEntityFragmentDoc = gql`
    fragment FragmentParagraphStanfordEntity on ParagraphStanfordEntity {
  ...FragmentParagraphInterface
  suEntityHeadline
  suEntityDescription {
    processed
  }
  suEntityButton {
    ...FragmentLink
  }
  suEntityItem {
    ...FragmentNodeTeaserUnion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentNodeTeaserUnionFragmentDoc}`;
export const FragmentParagraphStanfordGalleryFragmentDoc = gql`
    fragment FragmentParagraphStanfordGallery on ParagraphStanfordGallery {
  ...FragmentParagraphInterface
  suGalleryHeadline
  suGalleryDescription {
    processed
  }
  suGalleryButton {
    ...FragmentLink
  }
  suGalleryImages {
    ...FragmentMediaStanfordGalleryImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentMediaStanfordGalleryImageFragmentDoc}`;
export const FragmentParagraphStanfordListFragmentDoc = gql`
    fragment FragmentParagraphStanfordList on ParagraphStanfordList {
  ...FragmentParagraphInterface
  suListHeadline
  suListDescription {
    processed
  }
  suListButton {
    ...FragmentLink
  }
  suListView {
    view
    display
    contextualFilter
    pageSize
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}`;
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
    processed
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
export const FragmentParagraphStanfordPersonCtumFragmentDoc = gql`
    fragment FragmentParagraphStanfordPersonCtum on ParagraphStanfordPersonCtum {
  ...FragmentParagraphInterface
  suPersonCtaName
  suPersonCtaTitle
  suPersonCtaLink {
    ...FragmentLink
  }
  suPersonCtaImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentParagraphStanfordScheduleFragmentDoc = gql`
    fragment FragmentParagraphStanfordSchedule on ParagraphStanfordSchedule {
  ...FragmentParagraphInterface
  suScheduleHeadline
  suScheduleDescription {
    processed
  }
  suScheduleDateTime {
    ...FragmentSmartDateType
  }
  suScheduleLocation {
    ...FragmentAddressType
  }
  suScheduleUrl {
    ...FragmentLink
  }
  suScheduleSpeaker {
    ...FragmentParagraphStanfordPersonCtum
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentParagraphStanfordPersonCtumFragmentDoc}`;
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
    processed
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphLayoutFragmentDoc = gql`
    fragment FragmentParagraphLayout on ParagraphLayout {
  ...FragmentParagraphInterface
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphUnionFragmentDoc = gql`
    fragment FragmentParagraphUnion on ParagraphUnion {
  ...FragmentParagraphSulLibguide
  ...FragmentParagraphSulFeatCollection
  ...FragmentParagraphSulContactCard
  ...FragmentParagraphSulButton
  ...FragmentParagraphCollectionCard
  ...FragmentParagraphCollection
  ...FragmentParagraphInterface
  ...FragmentParagraphStanfordAccordion
  ...FragmentParagraphStanfordBanner
  ...FragmentParagraphStanfordCard
  ...FragmentParagraphStanfordEntity
  ...FragmentParagraphStanfordGallery
  ...FragmentParagraphStanfordList
  ...FragmentParagraphStanfordMediaCaption
  ...FragmentParagraphStanfordPersonCtum
  ...FragmentParagraphStanfordSchedule
  ...FragmentParagraphStanfordSpacer
  ...FragmentParagraphStanfordWysiwyg
  ...FragmentParagraphLayout
}
    ${FragmentParagraphSulLibguideFragmentDoc}
${FragmentParagraphSulFeatCollectionFragmentDoc}
${FragmentParagraphSulContactCardFragmentDoc}
${FragmentParagraphSulButtonFragmentDoc}
${FragmentParagraphCollectionCardFragmentDoc}
${FragmentParagraphCollectionFragmentDoc}
${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordAccordionFragmentDoc}
${FragmentParagraphStanfordBannerFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentParagraphStanfordEntityFragmentDoc}
${FragmentParagraphStanfordGalleryFragmentDoc}
${FragmentParagraphStanfordListFragmentDoc}
${FragmentParagraphStanfordMediaCaptionFragmentDoc}
${FragmentParagraphStanfordPersonCtumFragmentDoc}
${FragmentParagraphStanfordScheduleFragmentDoc}
${FragmentParagraphStanfordSpacerFragmentDoc}
${FragmentParagraphStanfordWysiwygFragmentDoc}
${FragmentParagraphLayoutFragmentDoc}`;
export const FragmentNodeStanfordEventFragmentDoc = gql`
    fragment FragmentNodeStanfordEvent on NodeStanfordEvent {
  ...FragmentNodeInterface
  body {
    processed
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
    ...FragmentParagraphUnion
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
  sulEventImage {
    ...FragmentMediaImage
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeStanfordEventSeriesFragmentDoc = gql`
    fragment FragmentNodeStanfordEventSeries on NodeStanfordEventSeries {
  ...FragmentNodeInterface
  suEventSeriesComponents {
    ...FragmentParagraphUnion
  }
  suEventSeriesDek
  suEventSeriesEvent {
    ...FragmentNodeStanfordEvent
  }
  suEventSeriesSubheadline
  suEventSeriesType {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentNodeStanfordEventFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordNewsFragmentDoc = gql`
    fragment FragmentNodeStanfordNews on NodeStanfordNews {
  ...FragmentNodeInterface
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
    time
  }
  suNewsSource {
    ...FragmentLink
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
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
    ...FragmentParagraphUnion
  }
  suPageComponents {
    ...FragmentParagraphUnion
  }
  suPageDescription
  suPageImage {
    ...FragmentMediaUnion
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
export const FragmentNodeStanfordPersonFragmentDoc = gql`
    fragment FragmentNodeStanfordPerson on NodeStanfordPerson {
  ...FragmentNodeInterface
  body {
    processed
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
    processed
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
    processed
  }
  suPersonResearchInterests
  suPersonScholarlyInterests {
    processed
  }
  suPersonShortTitle
  suPersonTelephone
  suPersonTypeGroup {
    ...FragmentTermInterface
  }
  sulPersonLibguideId
  sulPersonLibcalId
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentSuPolicyLogFragmentDoc = gql`
    fragment FragmentSuPolicyLog on SuPolicyLog {
  __typename
  id
  suPolicyDate {
    time
  }
  suPolicyNotes
  suPolicyPublic
  suPolicyTitle
}
    `;
export const FragmentNodeStanfordPolicyFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicy on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    processed
  }
  suPolicyAuthority
  suPolicyAutoPrefix
  suPolicyChangelog {
    ...FragmentSuPolicyLog
  }
  suPolicyChapter
  suPolicyEffective {
    time
  }
  suPolicyPolicyNum
  suPolicyRelated {
    ...FragmentNodeInterface
    ...FragmentNodeStanfordPolicyTeaser
  }
  suPolicySubchapter
  suPolicyTitle
  suPolicyUpdated {
    time
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentSuPolicyLogFragmentDoc}
${FragmentNodeStanfordPolicyTeaserFragmentDoc}`;
export const FragmentNodeStanfordPublicationFragmentDoc = gql`
    fragment FragmentNodeStanfordPublication on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationAuthorRef {
    ...FragmentNodeStanfordPerson
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
${FragmentNodeStanfordPersonFragmentDoc}
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
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeSulLibraryFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
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
  ...FragmentNodeSulStudyPlace
  ...FragmentNodeSulLibrary
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
${FragmentNodeSulStudyPlaceFragmentDoc}
${FragmentNodeSulLibraryFragmentDoc}`;
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
  nodeSulLibraries(first: 1000, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeSulLibrary
    }
  }
}
    ${FragmentNodeSulLibraryFragmentDoc}`;
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
    query Route($path: String!) {
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
        ...FragmentNodeUnion
        ...FragmentTermInterface
      }
    }
  }
}
    ${FragmentNodeUnionFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const StanfordBasicPagesDocument = gql`
    query stanfordBasicPages($filters: StanfordBasicPagesContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordBasicPages(
    contextualFilter: $filters
    pageSize: $pageSize
    page: $page
    offset: $offset
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
export const StanfordBasicPagesCardsDocument = gql`
    query stanfordBasicPagesCards($filters: StanfordBasicPagesCardsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordBasicPagesCards(
    contextualFilter: $filters
    pageSize: $pageSize
    page: $page
    offset: $offset
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
export const StanfordEventsCardGridDocument = gql`
    query stanfordEventsCardGrid($filters: StanfordEventsCardGridContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordEventsCardGrid(
    contextualFilter: $filters
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
export const StanfordEventsDocument = gql`
    query stanfordEvents($filters: StanfordEventsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordEvents(
    contextualFilter: $filters
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
export const StanfordEventsPastEventsDocument = gql`
    query stanfordEventsPastEvents($filters: StanfordEventsPastEventsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordEventsPastEvents(
    contextualFilter: $filters
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
export const StanfordNewsDefaultListDocument = gql`
    query stanfordNewsDefaultList($filters: StanfordNewsDefaultListContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordNewsDefaultList(
    contextualFilter: $filters
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
export const StanfordNewsCardGridDocument = gql`
    query stanfordNewsCardGrid($filters: StanfordNewsCardGridContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordNewsCardGrid(
    contextualFilter: $filters
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
    query stanfordPerson($filters: StanfordPersonContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordPerson(
    contextualFilter: $filters
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
export const SulStudyPlacesDocument = gql`
    query sulStudyPlaces {
  sulStudyPlaces {
    results {
      ...FragmentNodeSulStudyPlaceTeaser
    }
  }
}
    ${FragmentNodeSulStudyPlaceTeaserFragmentDoc}`;
export const StanfordSharedTagsDocument = gql`
    query stanfordSharedTags($filters: StanfordSharedTagsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordSharedTags(
    contextualFilter: $filters
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
    Menu(variables?: DrupalTypes.MenuQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.MenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.MenuQuery>(MenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Menu', 'query', variables);
    },
    Route(variables: DrupalTypes.RouteQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.RouteQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.RouteQuery>(RouteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Route', 'query', variables);
    },
    stanfordBasicPages(variables?: DrupalTypes.StanfordBasicPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordBasicPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordBasicPagesQuery>(StanfordBasicPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordBasicPages', 'query', variables);
    },
    stanfordBasicPagesCards(variables?: DrupalTypes.StanfordBasicPagesCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordBasicPagesCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordBasicPagesCardsQuery>(StanfordBasicPagesCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordBasicPagesCards', 'query', variables);
    },
    stanfordEventsCardGrid(variables?: DrupalTypes.StanfordEventsCardGridQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordEventsCardGridQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordEventsCardGridQuery>(StanfordEventsCardGridDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordEventsCardGrid', 'query', variables);
    },
    stanfordEvents(variables?: DrupalTypes.StanfordEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordEventsQuery>(StanfordEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordEvents', 'query', variables);
    },
    stanfordEventsPastEvents(variables?: DrupalTypes.StanfordEventsPastEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordEventsPastEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordEventsPastEventsQuery>(StanfordEventsPastEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordEventsPastEvents', 'query', variables);
    },
    stanfordNewsDefaultList(variables?: DrupalTypes.StanfordNewsDefaultListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordNewsDefaultListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordNewsDefaultListQuery>(StanfordNewsDefaultListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordNewsDefaultList', 'query', variables);
    },
    stanfordNewsCardGrid(variables?: DrupalTypes.StanfordNewsCardGridQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordNewsCardGridQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordNewsCardGridQuery>(StanfordNewsCardGridDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordNewsCardGrid', 'query', variables);
    },
    stanfordPerson(variables?: DrupalTypes.StanfordPersonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordPersonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordPersonQuery>(StanfordPersonDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordPerson', 'query', variables);
    },
    sulStudyPlaces(variables?: DrupalTypes.SulStudyPlacesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SulStudyPlacesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SulStudyPlacesQuery>(SulStudyPlacesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sulStudyPlaces', 'query', variables);
    },
    stanfordSharedTags(variables?: DrupalTypes.StanfordSharedTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordSharedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordSharedTagsQuery>(StanfordSharedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordSharedTags', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;