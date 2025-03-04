/** THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn graphql' INSTEAD. **/
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Bibliography: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Email: { input: any; output: any; }
  Html: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  UntypedStructuredData: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
};

/** Complex address data. */
export type Address = {
  __typename?: 'Address';
  additionalName?: Maybe<Scalars['String']['output']>;
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  administrativeArea?: Maybe<Scalars['String']['output']>;
  country?: Maybe<AddressCountry>;
  dependentLocality?: Maybe<Scalars['String']['output']>;
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  langcode?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  sortingCode?: Maybe<Scalars['String']['output']>;
};

/** Address country. */
export type AddressCountry = {
  __typename?: 'AddressCountry';
  /** The code of the country. */
  code?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Input for filter exposed with operator "between". */
export type BetweenFloatInput = {
  /** The maximum value of the range. */
  max?: InputMaybe<Scalars['Float']['input']>;
  /** The minimum value of the range. */
  min?: InputMaybe<Scalars['Float']['input']>;
};

/** Input for filter exposed with operator "between". */
export type BetweenStringInput = {
  /** The maximum value of the range. */
  max?: InputMaybe<Scalars['String']['input']>;
  /** The minimum value of the range. */
  min?: InputMaybe<Scalars['String']['input']>;
};

/** Block content is a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockContent = BlockInterface & {
  __typename?: 'BlockContent';
  /** The Content Block entity to be displayed within the block. */
  entity: BlockContentUnion;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type block_content. */
export type BlockContentInterface = {
  /** The time that the content block was last edited. */
  changed: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The content block language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** A boolean indicating whether this block is reusable. */
  reusable: Scalars['Boolean']['output'];
  /** A brief description of your block. */
  title: Scalars['String']['output'];
};

/** A block with a component paragraph field */
export type BlockContentStanfordComponentBlock = BlockContentInterface & MetaTagInterface & {
  __typename?: 'BlockContentStanfordComponentBlock';
  /** The time that the content block was last edited. */
  changed: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The content block language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** A boolean indicating whether this block is reusable. */
  reusable: Scalars['Boolean']['output'];
  /** Component */
  suComponent?: Maybe<Array<BlockContentStanfordComponentBlockSuComponentUnion>>;
  /** A brief description of your block. */
  title: Scalars['String']['output'];
};

/** Component */
export type BlockContentStanfordComponentBlockSuComponentUnion = ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordMediaCaption | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg;

/** Entity type block_content. */
export type BlockContentUnion = BlockContentStanfordComponentBlock;

/** Blocks are a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A generic block plugin is a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockPlugin = BlockInterface & {
  __typename?: 'BlockPlugin';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Block types that can exist in the system. */
export type BlockUnion = BlockContent | BlockPlugin;

/** A menu item defined in the CMS. */
export type BookLink = {
  __typename?: 'BookLink';
  /** Attributes of this menu item. */
  attributes: MenuItemAttributes;
  /** Child menu items of this menu item. */
  children: Array<BookLink>;
  /** The description of the menu item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this menu item is intended to be expanded. */
  expanded: Scalars['Boolean']['output'];
  /** The Universally Unique Identifier (UUID). */
  id: Scalars['ID']['output'];
  /** Whether this menu item links to an internal route. */
  internal: Scalars['Boolean']['output'];
  /** The language of the menu item. */
  langcode: Language;
  /** The route this menu item uses. Route loading can be disabled per menu type. */
  route?: Maybe<RouteUnion>;
  /** The title of the menu item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Entity type citation. */
export type CitationInterface = {
  /** The time that the entity was last edited. */
  changed: DateTime;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationSuArticleJournal = CitationInterface & {
  __typename?: 'CitationSuArticleJournal';
  apa?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was last edited. */
  changed: DateTime;
  chicago?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Author(s) */
  suAuthor?: Maybe<Array<NameType>>;
  /** Day */
  suDay?: Maybe<Scalars['Int']['output']>;
  /**
   * DOI id to the journal web page without the “https://doi.org/”. For example
   * enter only for a link that is https://doi.org/12.345/123123 enter only
   * <strong>12.345/123123</strong>.
   */
  suDoi?: Maybe<Scalars['String']['output']>;
  /** Issue */
  suIssue?: Maybe<Scalars['Int']['output']>;
  /** The publisher of the journal. E.g. IEEE, Elsevier, etc. */
  suJournalPublisher?: Maybe<Scalars['String']['output']>;
  /** Month */
  suMonth?: Maybe<Scalars['Int']['output']>;
  /** Page(s) */
  suPage?: Maybe<Scalars['String']['output']>;
  /** The name of the Journal in which the article was published. */
  suPublisher?: Maybe<Scalars['String']['output']>;
  /**
   * Add a URL to an external source for this publication item such as https://example.com/.
   * This can be the same url as the DOI link.
   * By adding an external source URL, all listings of this publication will link
   * to the external source instead of a page on this website.
   */
  suUrl?: Maybe<Link>;
  /** Volume */
  suVolume?: Maybe<Scalars['String']['output']>;
  /** Year */
  suYear?: Maybe<Scalars['Int']['output']>;
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationSuArticleNewspaper = CitationInterface & {
  __typename?: 'CitationSuArticleNewspaper';
  apa?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was last edited. */
  changed: DateTime;
  chicago?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Author(s) */
  suAuthor?: Maybe<Array<NameType>>;
  /** Day */
  suDay?: Maybe<Scalars['Int']['output']>;
  /** Month */
  suMonth?: Maybe<Scalars['Int']['output']>;
  /** Publisher */
  suPublisher?: Maybe<Scalars['String']['output']>;
  /**
   * Add a URL to an external source for this publication item such as https://example.com/.
   * This can be the same url as the DOI link.
   * By adding an external source URL, all listings of this publication will link
   * to the external source instead of a page on this website.
   */
  suUrl?: Maybe<Link>;
  /** Year */
  suYear?: Maybe<Scalars['Int']['output']>;
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationSuBook = CitationInterface & {
  __typename?: 'CitationSuBook';
  apa?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was last edited. */
  changed: DateTime;
  chicago?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Author(s) */
  suAuthor?: Maybe<Array<NameType>>;
  /**
   * DOI id to the journal web page without the “https://doi.org/”. For example
   * enter only for a link that is https://doi.org/12.345/123123 enter only
   * <strong>12.345/123123</strong>.
   */
  suDoi?: Maybe<Scalars['String']['output']>;
  /** Edition */
  suEdition?: Maybe<Scalars['Int']['output']>;
  /**
   * Page numbers may vary based on the e-book viewer used. In these cases it is
   * preferred to use chapter or paragraph numbers if they are provided (eg. chap.
   */
  suPage?: Maybe<Scalars['String']['output']>;
  /** Publisher */
  suPublisher?: Maybe<Scalars['String']['output']>;
  /** Publication Place */
  suPublisherPlace?: Maybe<Scalars['String']['output']>;
  /** Subtitle */
  suSubtitle?: Maybe<Scalars['String']['output']>;
  /**
   * Add a URL to an external source for this publication item such as https://example.com/.
   * This can be the same url as the DOI link.
   * By adding an external source URL, all listings of this publication will link
   * to the external source instead of a page on this website.
   */
  suUrl?: Maybe<Link>;
  /** Year */
  suYear?: Maybe<Scalars['Int']['output']>;
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationSuOther = CitationInterface & {
  __typename?: 'CitationSuOther';
  apa?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was last edited. */
  changed: DateTime;
  chicago?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Author(s) */
  suAuthor?: Maybe<Array<NameType>>;
  /** Day */
  suDay?: Maybe<Scalars['Int']['output']>;
  /** Month */
  suMonth?: Maybe<Scalars['Int']['output']>;
  /** Publisher */
  suPublisher?: Maybe<Scalars['String']['output']>;
  /** Subtitle */
  suSubtitle?: Maybe<Scalars['String']['output']>;
  /** External Source */
  suUrl?: Maybe<Link>;
  /** Year */
  suYear?: Maybe<Scalars['Int']['output']>;
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationSuThesi = CitationInterface & {
  __typename?: 'CitationSuThesi';
  apa?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was last edited. */
  changed: DateTime;
  chicago?: Maybe<Scalars['Bibliography']['output']>;
  /** The time that the entity was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Author(s) */
  suAuthor?: Maybe<Array<NameType>>;
  /** Day */
  suDay?: Maybe<Scalars['Int']['output']>;
  /**
   * DOI id to the journal web page without the “https://doi.org/”. For example
   * enter only for a link that is https://doi.org/12.345/123123 enter only
   * <strong>12.345/123123</strong>.
   */
  suDoi?: Maybe<Scalars['String']['output']>;
  /** Type of Dissertation */
  suGenre?: Maybe<Scalars['String']['output']>;
  /** Month */
  suMonth?: Maybe<Scalars['Int']['output']>;
  /** This can also be the university for the thesis. */
  suPublisher?: Maybe<Scalars['String']['output']>;
  /**
   * Add a URL to an external source for this publication item such as https://example.com/.
   * This can be the same url as the DOI link.
   * By adding an external source URL, all listings of this publication will link
   * to the external source instead of a page on this website.
   */
  suUrl?: Maybe<Link>;
  /** To display the year in the citation style for Chicago format, the publisher field must be populated. */
  suYear?: Maybe<Scalars['Int']['output']>;
  /** The title of the Citation. */
  title: Scalars['String']['output'];
};

/** Entity type citation. */
export type CitationUnion = CitationSuArticleJournal | CitationSuArticleNewspaper | CitationSuBook | CitationSuOther | CitationSuThesi;

/** Entity type config_pages. */
export type ConfigPagesInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
};

/** Entity type config_pages. */
export type ConfigPagesUnion = LockupSetting | StanfordBasicSiteSetting | StanfordGlobalMessage | StanfordLocalFooter | StanfordSuperFooter;

/** A paginated set of results. */
export type Connection = {
  /** The edges of this connection. */
  edges: Array<Edge>;
  /** The nodes of the edges of this connection. */
  nodes: Array<EdgeNode>;
  /** Information to aid in pagination. */
  pageInfo: ConnectionPageInfo;
};

/** Information about the page in a connection. */
export type ConnectionPageInfo = {
  __typename?: 'ConnectionPageInfo';
  /** The cursor for the last element in this page. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** Whether there are more pages in this connection. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are previous pages in this connection. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor for the first element in this page. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** Choose how your sorts will occur and on which field. */
export enum ConnectionSortKeys {
  /** Sort by creation date */
  CreatedAt = 'CREATED_AT',
  /** Sort by promoted status. */
  Promoted = 'PROMOTED',
  /** Sort by sticky status. */
  Sticky = 'STICKY',
  /** Sort by entity title. */
  Title = 'TITLE',
  /** Sort by updated date */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by term weight. */
  Weight = 'WEIGHT'
}

/** A Date range has a start and an end. */
export type DateRange = {
  __typename?: 'DateRange';
  /** The end of the date range. */
  end?: Maybe<DateTime>;
  /** The start of the date range. */
  start?: Maybe<DateTime>;
};

/** A DateTime object. */
export type DateTime = {
  __typename?: 'DateTime';
  /** A string that will have a value of format ±hh:mm */
  offset: Scalars['UtcOffset']['output'];
  /** RFC 3339 compliant time string. */
  time: Scalars['Time']['output'];
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  timestamp: Scalars['Timestamp']['output'];
  /** A field whose value exists in the standard IANA Time Zone Database. */
  timezone: Scalars['TimeZone']['output'];
};

/**
 * An edge in a connection.
 * Provides the cursor to fetch data based on the position of the associated
 * node. Specific edge implementations may provide more information about the
 * relationship they represent.
 */
export type Edge = {
  cursor: Scalars['Cursor']['output'];
  node: EdgeNode;
};

/** This entity is accessible over an Edge connection. */
export type EdgeNode = {
  id: Scalars['ID']['output'];
};

/** A file object to represent an managed file. */
export type File = {
  __typename?: 'File';
  /** The description of the file. */
  description?: Maybe<Scalars['String']['output']>;
  /** The mime type of the file. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The name of the file. */
  name?: Maybe<Scalars['String']['output']>;
  /** The size of the file in bytes. */
  size: Scalars['Int']['output'];
  /** The URL of the file. */
  url: Scalars['String']['output'];
};

/** A image object to represent an managed file. */
export type Image = {
  __typename?: 'Image';
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** Relative focal point X coordinate in percent. */
  focalX: Scalars['Int']['output'];
  /** Relative focal point Y coordinate in percent. */
  focalY: Scalars['Int']['output'];
  /** The height of the image. */
  height: Scalars['Int']['output'];
  /** The mime type of the image. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The size of the image in bytes. */
  size: Scalars['Int']['output'];
  /** The title text of the image. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the image. */
  url: Scalars['String']['output'];
  /** Image variations control different sizes and formats for images. */
  variations?: Maybe<Array<ImageStyleDerivative>>;
  /** The width of the image. */
  width: Scalars['Int']['output'];
};


/** A image object to represent an managed file. */
export type ImageVariationsArgs = {
  styles?: InputMaybe<Array<InputMaybe<ImageStyleAvailable>>>;
};

/** Entity type image_style. */
export type ImageStyle = ImageStyleInterface & {
  __typename?: 'ImageStyle';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** List of image styles available to use. */
export enum ImageStyleAvailable {
  /** Breakpoint - 2XL - 1x */
  Breakpoint2Xl1X = 'BREAKPOINT2XL1X',
  /** Breakpoint - 2XL - 2x */
  Breakpoint2Xl2X = 'BREAKPOINT2XL2X',
  /** Breakpoint - LG - 1x */
  BreakpointLg1X = 'BREAKPOINT_LG1X',
  /** Breakpoint - LG - 2x */
  BreakpointLg2X = 'BREAKPOINT_LG2X',
  /** Breakpoint - MD - 1x */
  BreakpointMd1X = 'BREAKPOINT_MD1X',
  /** Breakpoint - MD - 2x */
  BreakpointMd2X = 'BREAKPOINT_MD2X',
  /** Breakpoint - SM - 1x */
  BreakpointSm1X = 'BREAKPOINT_SM1X',
  /** Breakpoint - SM - 2x */
  BreakpointSm2X = 'BREAKPOINT_SM2X',
  /** Breakpoint - XL - 1x */
  BreakpointXl1X = 'BREAKPOINT_XL1X',
  /** Breakpoint - XL - 2x */
  BreakpointXl2X = 'BREAKPOINT_XL2X',
  /** Card - 1X - 478x318 */
  Card1X478X318 = 'CARD1X478X318',
  /** Card - 2X - 956x636 */
  Card2X956X636 = 'CARD2X956X636',
  /** Card - 478x239 */
  Card478X239 = 'CARD478X239',
  /** Card - 956x478 */
  Card956X478 = 'CARD956X478',
  /** Card - 1192x596 */
  Card1192X596 = 'CARD1192X596',
  /** Card - 1900x950 */
  Card1900X950 = 'CARD1900X950',
  /** CTA - 1X - 507x338 */
  Cta1X507X338 = 'CTA1X507X338',
  /** CTA - 1X - 596x397 */
  Cta1X596X397 = 'CTA1X596X397',
  /** CTA - 2X - 1014x676 */
  Cta2X1014X676 = 'CTA2X1014X676',
  /** CTA - 2X - 1192x794 */
  Cta2X1192X794 = 'CTA2X1192X794',
  /** Large (480 wide) */
  Large = 'LARGE',
  /** Large Square (480x480) */
  LargeSquare = 'LARGE_SQUARE',
  /** Linkit result thumbnail */
  LinkitResultThumbnail = 'LINKIT_RESULT_THUMBNAIL',
  /** Media Library thumbnail (220×220) */
  MediaLibrary = 'MEDIA_LIBRARY',
  /** Medium (220 wide) */
  Medium = 'MEDIUM',
  /** Medium Square (220x220) */
  MediumSquare = 'MEDIUM_SQUARE',
  /** Full Width Banner Tall */
  NewsFullWidthBannerTall = 'NEWS_FULL_WIDTH_BANNER_TALL',
  /** Responsive Large (2000) */
  ResponsiveLarge = 'RESPONSIVE_LARGE',
  /** Responsive Medium (1300) */
  ResponsiveMedium = 'RESPONSIVE_MEDIUM',
  /** Responsive Small (800) */
  ResponsiveSmall = 'RESPONSIVE_SMALL',
  /** Square - 478 */
  Square478 = 'SQUARE478',
  /** Square - 956 */
  Square956 = 'SQUARE956',
  /** Square - 1192 */
  Square1192 = 'SQUARE1192',
  /** Square - 1900 */
  Square1900 = 'SQUARE1900',
  /** Circle */
  StanfordCircle = 'STANFORD_CIRCLE',
  /** News List (280x132) */
  SuNewsList = 'SU_NEWS_LIST',
  /** Thumbnail (100 wide) */
  Thumbnail = 'THUMBNAIL',
  /** Thumbnail Square (100x100) */
  ThumbnailSquare = 'THUMBNAIL_SQUARE',
  /** Tiny Blur */
  TinyBlur = 'TINY_BLUR'
}

/** ImageStyle derivatives for an Image. */
export type ImageStyleDerivative = {
  __typename?: 'ImageStyleDerivative';
  height: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

/** Entity type image_style. */
export type ImageStyleInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Entity type image_style. */
export type ImageStyleUnion = ImageStyle;

/** Generic input for key-value pairs. */
export type KeyValueInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A language definition provided by the CMS. */
export type Language = {
  __typename?: 'Language';
  /** The language direction. */
  direction?: Maybe<Scalars['String']['output']>;
  /** The language code. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The language name. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Entity type layout. */
export type Layout = LayoutLibraryInterface & {
  __typename?: 'Layout';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
};

/** Layout Library entity. */
export type LayoutLibrary = {
  __typename?: 'LayoutLibrary';
  /** Machine name of the layout definition. */
  id: Scalars['ID']['output'];
  /** Human readable name of the layout definition. */
  label: Scalars['String']['output'];
};

/** Entity type layout. */
export type LayoutLibraryInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
};

/** Entity type layout. */
export type LayoutLibraryUnion = Layout;

/** If this component has been designed by a User extra information will be available here. */
export type LayoutParagraphs = {
  __typename?: 'LayoutParagraphs';
  /** The layout definition for this component. */
  layout?: Maybe<Layout>;
  /** Detail on where this component is suggested to be placed within the parent component. */
  position?: Maybe<LayoutParagraphsPosition>;
};

/** This content has been arranged using Layout Paragraphs. */
export type LayoutParagraphsInterface = {
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
};

/** This component positionally belongs to another component's layout. */
export type LayoutParagraphsPosition = {
  __typename?: 'LayoutParagraphsPosition';
  /** The UUID of the parent component this component belongs to. */
  parentId?: Maybe<Scalars['ID']['output']>;
  /** Where this component is suggested to be places within the parent component's regions. */
  region?: Maybe<Scalars['String']['output']>;
};

/** A link. */
export type Link = {
  __typename?: 'Link';
  /** Link attributes */
  attributes?: Maybe<LinkAttributes>;
  /** Whether the link is internal to this website. */
  internal: Scalars['Boolean']['output'];
  /** The title of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the link. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Link Attributes. */
export type LinkAttributes = {
  __typename?: 'LinkAttributes';
  /** Aria Label */
  ariaLabel?: Maybe<Scalars['String']['output']>;
  /** Aria Labelled By */
  ariaLabelledBy?: Maybe<Scalars['String']['output']>;
};

/** Entity type config_pages. */
export type LockupSetting = ConfigPagesInterface & EdgeNode & MetaTagInterface & {
  __typename?: 'LockupSetting';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Site title line. */
  suLine1?: Maybe<Scalars['String']['output']>;
  /** Secondary title line. */
  suLine2?: Maybe<Scalars['String']['output']>;
  /** Tertiary title line. */
  suLine3?: Maybe<Scalars['String']['output']>;
  /** Organization name. */
  suLine4?: Maybe<Scalars['String']['output']>;
  /** Last line full width option. */
  suLine5?: Maybe<Scalars['String']['output']>;
  /**
   * Uncheck this box if you want to replace the default lock-up settings with a
   * custom logo or text. This custom logo will appear in the top left corner of
   * the website's main header.
   * <strong>The lockup will only change the look. Remember to change the name of
   * your site as well. For instructions, <a
   * href="https://sitesuserguide.stanford.edu/get-started/update-site-name">see
   * the user guide</a>.</strong>
   */
  suLockupEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Layout options. */
  suLockupOptions?: Maybe<Scalars['String']['output']>;
  /** Upload logo image */
  suUploadLogoImage?: Maybe<Image>;
  /**
   * Uncheck this box if you want to replace the default lock up settings with a
   * custom logo. This custom logo will appear in the top left corner of the
   * website's main header.
   */
  suUseThemeLogo?: Maybe<Scalars['Boolean']['output']>;
};

/** A paginated set of results for LockupSetting. */
export type LockupSettingConnection = Connection & {
  __typename?: 'LockupSettingConnection';
  edges: Array<LockupSettingEdge>;
  nodes: Array<LockupSetting>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for LockupSetting. */
export type LockupSettingEdge = Edge & {
  __typename?: 'LockupSettingEdge';
  cursor: Scalars['Cursor']['output'];
  node: LockupSetting;
};

/** Stanford Embeds */
export type MediaEmbeddable = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaEmbeddable';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /**
   * Use this field to paste in embed codes which are not available through oEmbed.
   * Currently only the following embed codes are allowed:
   * <ul>
   * <li><strong>Sharepoint Document</li></strong>
   *  <li><strong>Airtable</li></strong>
   *  <li><strong>Smartsheet</li></strong>
   *  <li><strong>Google IFrames</li></strong>
   *  <li><strong>Outlook Calendar</li></strong>
   *  <li><strong>Localist Events</li></strong>
   * </ul>
   * For more custom embed codes please <a
   */
  mediaEmbeddableCode?: Maybe<Scalars['String']['output']>;
  /** The URL of the media to embed. */
  mediaEmbeddableOembed?: Maybe<Scalars['String']['output']>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Use local files for reusable media. */
export type MediaFile = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaFile';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** File */
  mediaFile: File;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Publicly shared Google Form */
export type MediaGoogleForm = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaGoogleForm';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /**
   * Forms can only be embedded if they do <strong>not</strong> have any file
   * upload fields. Please ensure your form doesn't have any of these fields.
   */
  mediaGoogleForm: Scalars['String']['output'];
  /** The height, in pixels, of the iframe used to embed the Google Form */
  mediaGoogleFormHgt: Scalars['Int']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Use local images for reusable media. */
export type MediaImage = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaImage';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Image */
  mediaImage: Image;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Provide credit to the owner/photographer. */
  sulImageCredit?: Maybe<Scalars['String']['output']>;
};

/** Entity type media. */
export type MediaInterface = {
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Images intended only for gallery paragraphs */
export type MediaStanfordGalleryImage = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaStanfordGalleryImage';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Caption */
  suGalleryCaption?: Maybe<Scalars['String']['output']>;
  /** Gallery Image */
  suGalleryImage?: Maybe<Image>;
};

/** Entity type media. */
export type MediaUnion = MediaEmbeddable | MediaFile | MediaGoogleForm | MediaImage | MediaStanfordGalleryImage | MediaVideo;

/** Use Video urls from YouTube for reusable media. */
export type MediaVideo = MediaInterface & MetaTagInterface & {
  __typename?: 'MediaVideo';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Video URL */
  mediaOembedVideo: Scalars['String']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Entity type menu. */
export type Menu = MenuInterface & {
  __typename?: 'Menu';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** List of menus available to load. */
export enum MenuAvailable {
  /** Main navigation */
  Main = 'MAIN'
}

/** Entity type menu. */
export type MenuInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** A menu item defined in the CMS. */
export type MenuItem = {
  __typename?: 'MenuItem';
  /** Attributes of this menu item. */
  attributes: MenuItemAttributes;
  /** Child menu items of this menu item. */
  children: Array<MenuItem>;
  /** The description of the menu item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this menu item is intended to be expanded. */
  expanded: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Whether this menu item links to an internal route. */
  internal: Scalars['Boolean']['output'];
  /** The language of the menu item. */
  langcode: Language;
  /** The route this menu item uses. Route loading can be disabled per menu type. */
  route?: Maybe<RouteUnion>;
  /** The title of the menu item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Menu item options set within the CMS. */
export type MenuItemAttributes = {
  __typename?: 'MenuItemAttributes';
  /** Menu item attribute class. */
  class?: Maybe<Scalars['String']['output']>;
};

/** Entity type menu. */
export type MenuUnion = Menu;

/** A meta tag element. */
export type MetaTag = {
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** This entity has meta tags enabled. */
export type MetaTagInterface = {
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
};

/** A meta link element. */
export type MetaTagLink = MetaTag & {
  __typename?: 'MetaTagLink';
  /** The meta tag element attributes. */
  attributes: MetaTagLinkAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta link element's attributes. */
export type MetaTagLinkAttributes = {
  __typename?: 'MetaTagLinkAttributes';
  /** Specifies the location of the linked document. */
  href?: Maybe<Scalars['String']['output']>;
  /** Specifies the location of the linked document. */
  hreflang?: Maybe<Scalars['String']['output']>;
  /** Specifies on what device the linked document will be displayed. */
  media?: Maybe<Scalars['String']['output']>;
  /** Specifies the relationship between the current document and the linked document. */
  rel?: Maybe<Scalars['String']['output']>;
  /** Specifies the size of the linked resource. Only for rel="icon". */
  sizes?: Maybe<Scalars['String']['output']>;
  /** Specifies the media type of the linked document. */
  type?: Maybe<Scalars['String']['output']>;
};

/** A meta property element. */
export type MetaTagProperty = MetaTag & {
  __typename?: 'MetaTagProperty';
  /** The meta tag element attributes. */
  attributes: MetaTagPropertyAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta property element's attributes. */
export type MetaTagPropertyAttributes = {
  __typename?: 'MetaTagPropertyAttributes';
  /** The content attribute of the meta tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The property attribute of the meta tag. */
  property?: Maybe<Scalars['String']['output']>;
};

/** A meta script element. */
export type MetaTagScript = MetaTag & {
  __typename?: 'MetaTagScript';
  /** The meta tag element attributes. */
  attributes: MetaTagScriptAttributes;
  /** The content of the script tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta script element's attributes. */
export type MetaTagScriptAttributes = {
  __typename?: 'MetaTagScriptAttributes';
  /** The integrity attribute of the script tag. */
  integrity?: Maybe<Scalars['String']['output']>;
  /** The src attribute of the script tag. */
  src?: Maybe<Scalars['String']['output']>;
  /** The type attribute of the script tag. */
  type?: Maybe<Scalars['String']['output']>;
};

/** A meta tag element. */
export type MetaTagUnion = MetaTagLink | MetaTagProperty | MetaTagScript | MetaTagValue;

/** A meta content element. */
export type MetaTagValue = MetaTag & {
  __typename?: 'MetaTagValue';
  /** The meta tag element attributes. */
  attributes: MetaTagValueAttributes;
  /** The HTML tag for this meta element. */
  tag: Scalars['String']['output'];
};

/** A meta content element's attributes. */
export type MetaTagValueAttributes = {
  __typename?: 'MetaTagValueAttributes';
  /** The content attribute of the meta tag. */
  content?: Maybe<Scalars['String']['output']>;
  /** The name attribute of the meta tag. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The schema's entry-point for mutations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Placeholder for mutation extension. */
  _: Scalars['Boolean']['output'];
};

/** Smart Date data. */
export type NameType = {
  __typename?: 'NameType';
  /** Credentials */
  credentials?: Maybe<Scalars['String']['output']>;
  /** Family */
  family?: Maybe<Scalars['String']['output']>;
  /** Generational */
  generational?: Maybe<Scalars['String']['output']>;
  /** Given */
  given?: Maybe<Scalars['String']['output']>;
  /** Middle name(s) */
  middle?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type node. */
export type NodeInterface = {
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
};

/** A course includes information such as title, year, quarter, day(s) and time(s), etc. */
export type NodeStanfordCourse = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordCourse';
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Academic Year */
  suCourseAcademicYear?: Maybe<Scalars['String']['output']>;
  /** Course Code */
  suCourseCode?: Maybe<Scalars['String']['output']>;
  /** Course ID */
  suCourseId?: Maybe<Scalars['Int']['output']>;
  /** Instructors */
  suCourseInstructors?: Maybe<Array<Scalars['String']['output']>>;
  /** Course Link */
  suCourseLink: Link;
  /** The quarters the course is offered. */
  suCourseQuarters?: Maybe<Array<TermSuCourseQuarter>>;
  /** Units */
  suCourseSectionUnits?: Maybe<Scalars['String']['output']>;
  /** The course subject code. E.g., ACCT, MATH, GEO, etc. */
  suCourseSubject?: Maybe<TermSuCourseSubject>;
  /** Course tags from ExploreCourses */
  suCourseTags?: Maybe<Array<TermSuCourseTag>>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordCourse. */
export type NodeStanfordCourseConnection = Connection & {
  __typename?: 'NodeStanfordCourseConnection';
  edges: Array<NodeStanfordCourseEdge>;
  nodes: Array<NodeStanfordCourse>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordCourse. */
export type NodeStanfordCourseEdge = Edge & {
  __typename?: 'NodeStanfordCourseEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordCourse;
};

/** An event content type with integration with events-legacy.stanford.edu */
export type NodeStanfordEvent = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordEvent';
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /**
   * Use this for the location if a physical address is not available. If a
   * physical address is available, it is recommended to use the "Location" field.
   */
  suEventAltLoc?: Maybe<Scalars['String']['output']>;
  /** Groups of people to whom this event is for.  */
  suEventAudience?: Maybe<Array<TermEventAudience>>;
  /** Add additional content that displays under the body text on the event page. */
  suEventComponents?: Maybe<Array<NodeStanfordEventSuEventComponentsUnion>>;
  /** Any additional contact information (e.g., contact name, etc.) */
  suEventContactInfo?: Maybe<Scalars['String']['output']>;
  /** Add a button to a registration form, signup list, or other information to the event.  */
  suEventCta?: Maybe<Link>;
  /** The day and time this event occurs.  */
  suEventDateTime: SmartDateType;
  /**
   * Maximum 180 characters. <em>A "dek" is a brief summary that appears below the
   * subheadline - in smaller font - on the list page and on the event page.</em>
   */
  suEventDek?: Maybe<Scalars['String']['output']>;
  /** Add a contact e-mail address for the event. */
  suEventEmail?: Maybe<Scalars['Email']['output']>;
  /** External Image */
  suEventExtImage?: Maybe<Scalars['String']['output']>;
  /** Departments & Groups */
  suEventGroups?: Maybe<Array<TermStanfordEventGroup>>;
  /** Keywords and Tags */
  suEventKeywords?: Maybe<Array<TermStanfordEventKeyword>>;
  /** Where the event is taking place. */
  suEventLocation?: Maybe<Address>;
  /** This is the text that will display on the site. */
  suEventMapLink?: Maybe<Link>;
  /**
   * Add all schedule items for your event here. By default the items will be
   * listed in chronological order of date and time. Items with no date and time
   * are displayed at the top of the list in alphabetical order.
   */
  suEventSchedule?: Maybe<Array<ParagraphStanfordSchedule>>;
  /**
   * Add a URL to an external source for this event item such as
   * https://example.com/. By adding an external source URL all listings of this
   * event article will link to the external source instead of a page on this
   */
  suEventSource?: Maybe<Link>;
  /**
   * Add all event sponsors here. You can rearrange the list using the drag-drop
   * functionality. <em>Sponsors appear below the Dek on the event page.</em>
   */
  suEventSponsor?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * Maximum 140 characters. <em>A "subheadline" is a shorter headline text that
   * appears below the main headline - in smaller font - on the list page and on
   * the event page.</em>
   */
  suEventSubheadline?: Maybe<Scalars['String']['output']>;
  /** Subject */
  suEventSubject?: Maybe<Array<TermStanfordEventSubject>>;
  /**  Add a contact telephone number for the event. */
  suEventTelephone?: Maybe<Scalars['PhoneNumber']['output']>;
  /**
   * Add all Event Type terms for this event. Note: Only the first selected term
   * will be displayed to the end users. The complete list of terms will be
   * displayed at the end of the event page. <a
   * to add, edit and delete event terms.</a>
   */
  suEventType?: Maybe<Array<TermStanfordEventType>>;
  /** Image */
  sulEventImage?: Maybe<MediaImage>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordEvent. */
export type NodeStanfordEventConnection = Connection & {
  __typename?: 'NodeStanfordEventConnection';
  edges: Array<NodeStanfordEventEdge>;
  nodes: Array<NodeStanfordEvent>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordEvent. */
export type NodeStanfordEventEdge = Edge & {
  __typename?: 'NodeStanfordEventEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordEvent;
};

/** A collection of events */
export type NodeStanfordEventSeries = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordEventSeries';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Add additional content that displays under the body text on the series node page.  */
  suEventSeriesComponents?: Maybe<Array<NodeStanfordEventSeriesSuEventSeriesComponentsUnion>>;
  /**
   * Maximum 180 characters. <em>A "dek" is a brief summary that appears below the
   * headline - in smaller font - on the list page.</em>
   */
  suEventSeriesDek?: Maybe<Scalars['String']['output']>;
  /**
   * A manually curated list of events in this event series. Start typing the title
   * of a published event within this site to select it. You can rearrange the list
   * using the drag-drop functionality.
   */
  suEventSeriesEvent?: Maybe<Array<NodeStanfordEvent>>;
  /**
   * Maximum 140 characters. A "subheadline" is a shorter headline text that
   * appears below the main headline - in smaller font - on the series node page
   */
  suEventSeriesSubheadline?: Maybe<Scalars['String']['output']>;
  /** The "event type" will appear above the main headline - in smaller font - on the list page.  */
  suEventSeriesType?: Maybe<Array<TermStanfordEventType>>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordEventSeries. */
export type NodeStanfordEventSeriesConnection = Connection & {
  __typename?: 'NodeStanfordEventSeriesConnection';
  edges: Array<NodeStanfordEventSeriesEdge>;
  nodes: Array<NodeStanfordEventSeries>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordEventSeries. */
export type NodeStanfordEventSeriesEdge = Edge & {
  __typename?: 'NodeStanfordEventSeriesEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordEventSeries;
};

/** Add additional content that displays under the body text on the series node page.  */
export type NodeStanfordEventSeriesSuEventSeriesComponentsUnion = ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg;

/** Add additional content that displays under the body text on the event page. */
export type NodeStanfordEventSuEventComponentsUnion = ParagraphCollection | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulLibguide;

/** Entity type node. */
export type NodeStanfordNews = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordNews';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Layout */
  layoutSelection?: Maybe<LayoutLibrary>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /**
   * Maximum one banner media. <em>The “banner media” will display as a
   * full-width image or video above the body text area on the article page.</em>
   */
  suNewsBanner?: Maybe<NodeStanfordNewsSuNewsBannerUnion>;
  /** Banner Caption */
  suNewsBannerMediaCaption?: Maybe<Scalars['String']['output']>;
  /**
   * Use a comma to separate the list of names. <em>The “byline" identifies the
   * author(s) of the article. It will appear below the headline and dek on the
   * article page.</em>
   */
  suNewsByline?: Maybe<Scalars['String']['output']>;
  /** Components */
  suNewsComponents?: Maybe<Array<NodeStanfordNewsSuNewsComponentsUnion>>;
  /**
   * Maximum 180 characters. <em>A "dek" is a brief summary that appears below the
   * headline - in smaller font - on the list page and on the article page.</em>
   */
  suNewsDek?: Maybe<Scalars['String']['output']>;
  /**
   * Maximum one featured media. <em>The “featured media” will appear as a
   * thumbnail on the list page, and as a thumbnail on the teaser card
   * paragraph.</em>
   */
  suNewsFeaturedMedia?: Maybe<MediaImage>;
  /** Hide Social Share Icons */
  suNewsHideSocial?: Maybe<Scalars['Boolean']['output']>;
  /** <em>The “publishing date” will appear next to the “byline” below the headline and dek on the article page.</em> */
  suNewsPublishingDate?: Maybe<DateTime>;
  /**
   * Add a URL to an external source for this news item such as
   * https://example.com/. By adding an external source URL all listings of this
   * news article will link to the external source instead of a page on this
   */
  suNewsSource?: Maybe<Link>;
  /**
   * Add all News Type terms for this article. Note: Only the top three selected
   * terms will be displayed to the end-users. The complete list of terms will be
   * displayed at the end of the article page. <a
   * to add, edit and delete news terms.</a>
   */
  suNewsTopics?: Maybe<Array<TermStanfordNewsTopic>>;
  /** Related Links */
  sulRelLinks?: Maybe<Array<Link>>;
  /** Related Links Heading */
  sulRelLinksHeading?: Maybe<Scalars['String']['output']>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordNews. */
export type NodeStanfordNewsConnection = Connection & {
  __typename?: 'NodeStanfordNewsConnection';
  edges: Array<NodeStanfordNewsEdge>;
  nodes: Array<NodeStanfordNews>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordNews. */
export type NodeStanfordNewsEdge = Edge & {
  __typename?: 'NodeStanfordNewsEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordNews;
};

/**
 * Maximum one banner media. <em>The “banner media” will display as a
 * full-width image or video above the body text area on the article page.</em>
 */
export type NodeStanfordNewsSuNewsBannerUnion = MediaImage | MediaVideo;

/** Components */
export type NodeStanfordNewsSuNewsComponentsUnion = ParagraphCollection | ParagraphLayout | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulLibguide;

/** Entity type node. */
export type NodeStanfordPage = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordPage';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /**
   * <ul><li><strong>Main navigation sidebar</strong> appears by default when this
   * page is added to a menu.</li><li><strong>Full width</strong> will display page
   * contents only, removing all types of sidebar menus.</li><li><strong>On this
   * page sidebar</strong> to display a menu of H2s automatically populated from
   * this page. You can also add a section for links that appear on the
   * page.</li></ul>
   */
  layoutSelection?: Maybe<LayoutLibrary>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Basic Page Type */
  suBasicPageType?: Maybe<Array<TermBasicPageType>>;
  /**
   * The top banner displays directly below the navigation and on interior pages,
   * above the page title. The page title banner replaces the default page title
   * with a page title within the banner image.
   */
  suPageBanner?: Maybe<NodeStanfordPageSuPageBannerUnion>;
  /** Paragraphs */
  suPageComponents?: Maybe<Array<NodeStanfordPageSuPageComponentsUnion>>;
  /**
   * Maximum 255 characters.  The <i>"page description"</i> is a brief summary that
   * appears below the page title - in smaller font - on the list page. This will
   * also be used for social media sharing and search engine results.
   */
  suPageDescription?: Maybe<Scalars['String']['output']>;
  /**
   * Maximum one image. The <i>"page image"</i> will only appear as a thumbnail
   * image on Teaser and List page display. The image will also be used for social
   * media sharing and search engine results.
   */
  suPageImage?: Maybe<MediaImage>;
  /** Related Links */
  sulRelLinks?: Maybe<Array<Link>>;
  /** Related Links Heading */
  sulRelLinksHeading?: Maybe<Scalars['String']['output']>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordPage. */
export type NodeStanfordPageConnection = Connection & {
  __typename?: 'NodeStanfordPageConnection';
  edges: Array<NodeStanfordPageEdge>;
  nodes: Array<NodeStanfordPage>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordPage. */
export type NodeStanfordPageEdge = Edge & {
  __typename?: 'NodeStanfordPageEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordPage;
};

/**
 * The top banner displays directly below the navigation and on interior pages,
 * above the page title. The page title banner replaces the default page title with
 * a page title within the banner image.
 */
export type NodeStanfordPageSuPageBannerUnion = ParagraphStanfordBanner | ParagraphSulHomeBanner;

/** Paragraphs */
export type NodeStanfordPageSuPageComponentsUnion = ParagraphCollection | ParagraphLayout | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulLibguide | ParagraphSulLocationHour;

/** Stanford Person type with bio and supporting information. Content-type for syncing with CAP data. */
export type NodeStanfordPerson = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordPerson';
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Academic Appointments */
  suPersonAcademicAppt?: Maybe<Scalars['String']['output']>;
  /** Administrative Appointments */
  suPersonAdminAppts?: Maybe<Array<Scalars['String']['output']>>;
  /** A list of links to Stanford Affiliations */
  suPersonAffiliations?: Maybe<Array<Link>>;
  /** Free form content components. */
  suPersonComponents?: Maybe<Array<NodeStanfordPersonSuPersonComponentsUnion>>;
  /** A list of education degrees or other notable items. eg: BA, Psychology, Stanford University, 1991 */
  suPersonEducation?: Maybe<Array<Scalars['String']['output']>>;
  /** The person's email. */
  suPersonEmail?: Maybe<Scalars['Email']['output']>;
  /** The person's fax number */
  suPersonFax?: Maybe<Scalars['String']['output']>;
  /** The person's preferred first name */
  suPersonFirstName: Scalars['String']['output'];
  /** The person's full list of titles.  */
  suPersonFullTitle?: Maybe<Scalars['String']['output']>;
  /** The person's preferred last name. */
  suPersonLastName: Scalars['String']['output'];
  /** An arbitrary assortment of links */
  suPersonLinks?: Maybe<Array<Link>>;
  /** Street and room of location. */
  suPersonLocationAddress?: Maybe<Text>;
  /** The building title of location */
  suPersonLocationName?: Maybe<Scalars['String']['output']>;
  /** The person's mail code. eg: 3020 */
  suPersonMailCode?: Maybe<Scalars['String']['output']>;
  /** A link to a map for the location. */
  suPersonMapUrl?: Maybe<Link>;
  /** The person's mobile phone number. */
  suPersonMobilePhone?: Maybe<Scalars['String']['output']>;
  /**
   * The person’s headshot or profile photo. Image ration should be 1:1 or Image
   * size should be at least 140 pixels x 140 pixels
   */
  suPersonPhoto?: Maybe<MediaImage>;
  /** Profile Link */
  suPersonProfileLink?: Maybe<Link>;
  /** Pronouns */
  suPersonPronouns?: Maybe<Scalars['String']['output']>;
  /** A list of research highlights. */
  suPersonResearch?: Maybe<Array<Text>>;
  /** A list of research interests. */
  suPersonResearchInterests?: Maybe<Array<Scalars['String']['output']>>;
  /** Scholarly and Research Interests */
  suPersonScholarlyInterests?: Maybe<Text>;
  /** The person's simple title. eg: Professor. */
  suPersonShortTitle?: Maybe<Scalars['String']['output']>;
  /** The person's telephone contact number */
  suPersonTelephone?: Maybe<Scalars['String']['output']>;
  /** Select the type and group that this person belongs to. */
  suPersonTypeGroup?: Maybe<Array<TermStanfordPersonType>>;
  /** LibCal Id Number */
  sulPersonLibcalId?: Maybe<Scalars['Int']['output']>;
  /** LibGuide ID Number */
  sulPersonLibguideId?: Maybe<Scalars['Int']['output']>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordPerson. */
export type NodeStanfordPersonConnection = Connection & {
  __typename?: 'NodeStanfordPersonConnection';
  edges: Array<NodeStanfordPersonEdge>;
  nodes: Array<NodeStanfordPerson>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordPerson. */
export type NodeStanfordPersonEdge = Edge & {
  __typename?: 'NodeStanfordPersonEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordPerson;
};

/** Free form content components. */
export type NodeStanfordPersonSuPersonComponentsUnion = ParagraphCollection | ParagraphLayout | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulLibguide;

/** BETA: Provide a administrative policy structure with breadcrumbs. */
export type NodeStanfordPolicy = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordPolicy';
  /**
   * For the "Summary" field above, leave black to use the initial 250 characters
   * from Body content at the summary.  <em>The "summary" is appears below the
   * title - in smaller font - on the list and teaser display.</em>
   */
  body?: Maybe<TextSummary>;
  book?: Maybe<BookLink>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /**
   * The person, department, and/or officials responsible for this policy. <em>The
   * "authority" field will be displayed to site-visitors below the effective
   */
  suPolicyAuthority?: Maybe<Scalars['String']['output']>;
  /** Automatic Prefix */
  suPolicyAutoPrefix?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Add all prominent changes associated with this policy. Note: Only three most
   * recently edited changelogs will be displayed to the site-visitors on the
   * policy detail page. The complete list of changelogs will be available in the
   * authoring experience.
   */
  suPolicyChangelog?: Maybe<Array<SuPolicyLog>>;
  /** Chapter Number */
  suPolicyChapter?: Maybe<Scalars['String']['output']>;
  /**
   * The day this policy will go into effect. <em>The "effective date" will be
   * displayed to site-visitors below the page title.</em>
   */
  suPolicyEffective?: Maybe<DateTime>;
  /** Policy Number */
  suPolicyPolicyNum?: Maybe<Scalars['String']['output']>;
  /** Related Policies */
  suPolicyRelated?: Maybe<Array<NodeStanfordPolicy>>;
  /** SubChapter Number */
  suPolicySubchapter?: Maybe<Scalars['String']['output']>;
  /** Policy Title */
  suPolicyTitle: Scalars['String']['output'];
  /**
   * The day content and information regarding this policy was updated. <em>The
   * "last updated" date will be displayed to site-visitors above the body
   */
  suPolicyUpdated?: Maybe<DateTime>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordPolicy. */
export type NodeStanfordPolicyConnection = Connection & {
  __typename?: 'NodeStanfordPolicyConnection';
  edges: Array<NodeStanfordPolicyEdge>;
  nodes: Array<NodeStanfordPolicy>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordPolicy. */
export type NodeStanfordPolicyEdge = Edge & {
  __typename?: 'NodeStanfordPolicyEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordPolicy;
};

/** Entity type node. */
export type NodeStanfordPublication = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeStanfordPublication';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Use this to automatically display the publications on the author's page. */
  suPublicationAuthorRef?: Maybe<Array<NodeStanfordPerson>>;
  /** Choose a type of publication item to display. */
  suPublicationCitation?: Maybe<NodeStanfordPublicationSuPublicationCitationUnion>;
  /** Paragraphs */
  suPublicationComponents?: Maybe<Array<NodeStanfordPublicationSuPublicationComponentsUnion>>;
  /** This will only display on the node page. */
  suPublicationCta?: Maybe<Link>;
  /**
   * <strong>CAUTION:</strong> Currently, image functionality is only for data
   * collection. It will NOT BE VISIBLE in the end-user display.
   */
  suPublicationImage?: Maybe<MediaImage>;
  /**
   * Add all Publication Type terms for this article. Note: Only the top three
   * selected terms will be displayed to the end-users. The complete list of terms
   * will be displayed at the end of the publication page. <a
   * to add, edit and delete publication terms.</a>
   */
  suPublicationTopics?: Maybe<Array<TermStanfordPublicationTopic>>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeStanfordPublication. */
export type NodeStanfordPublicationConnection = Connection & {
  __typename?: 'NodeStanfordPublicationConnection';
  edges: Array<NodeStanfordPublicationEdge>;
  nodes: Array<NodeStanfordPublication>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeStanfordPublication. */
export type NodeStanfordPublicationEdge = Edge & {
  __typename?: 'NodeStanfordPublicationEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeStanfordPublication;
};

/** Choose a type of publication item to display. */
export type NodeStanfordPublicationSuPublicationCitationUnion = CitationSuArticleJournal | CitationSuArticleNewspaper | CitationSuBook | CitationSuOther | CitationSuThesi;

/** Paragraphs */
export type NodeStanfordPublicationSuPublicationComponentsUnion = ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg;

/** Entity type node. */
export type NodeSulLibrary = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeSulLibrary';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /**
   * <ul><li><strong>Main navigation sidebar</strong> appears by default when this
   * page is added to a menu.</li><li><strong>Full width</strong> will display page
   * contents only, removing all types of sidebar menus.</li><li><strong>On this
   * page sidebar</strong> to display a menu of H2s automatically populated from
   * this page. You can also add a section for links that appear on the
   * page.</li></ul>
   */
  layoutSelection?: Maybe<LayoutLibrary>;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Address */
  suLibraryAddress?: Maybe<Address>;
  /** Banner Image */
  suLibraryBanner?: Maybe<MediaImage>;
  /** Contact Card Image */
  suLibraryContactImg?: Maybe<MediaImage>;
  /** Contact Email */
  suLibraryEmail?: Maybe<Scalars['Email']['output']>;
  /** Branch Hours */
  suLibraryHours?: Maybe<Scalars['String']['output']>;
  /** Map Link */
  suLibraryMapLink?: Maybe<Link>;
  /** Paragraphs */
  suLibraryParagraphs?: Maybe<Array<NodeSulLibrarySuLibraryParagraphsUnion>>;
  /** Contact Phone Number */
  suLibraryPhone?: Maybe<Scalars['PhoneNumber']['output']>;
  /** Accessibility Statement */
  sulLibraryA11y?: Maybe<Text>;
  /**
   * Provide an external URL for branch links to redirect users to this page. Leave
   * this field empty for default behavior - branch links will open the branch page
   * on the Library site.
   */
  sulLibraryExtUrl?: Maybe<Link>;
  /** Type of Location */
  sulLibraryType: Scalars['String']['output'];
  /** Related Links */
  sulRelLinks?: Maybe<Array<Link>>;
  /** Related Links Heading */
  sulRelLinksHeading?: Maybe<Scalars['String']['output']>;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeSulLibrary. */
export type NodeSulLibraryConnection = Connection & {
  __typename?: 'NodeSulLibraryConnection';
  edges: Array<NodeSulLibraryEdge>;
  nodes: Array<NodeSulLibrary>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeSulLibrary. */
export type NodeSulLibraryEdge = Edge & {
  __typename?: 'NodeSulLibraryEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeSulLibrary;
};

/** Paragraphs */
export type NodeSulLibrarySuLibraryParagraphsUnion = ParagraphCollection | ParagraphLayout | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulLibguide;

/** Entity type node. */
export type NodeSulStudyPlace = EdgeNode & MetaTagInterface & NodeInterface & {
  __typename?: 'NodeSulStudyPlace';
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Additional Information */
  sulStudyAdditionalInfo?: Maybe<Text>;
  /** Branch Location */
  sulStudyBranch: NodeSulLibrary;
  /** Capacity */
  sulStudyCapacity?: Maybe<TermStudyPlaceCapacity>;
  /** Study Features */
  sulStudyFeatures?: Maybe<Array<TermSulStudyPlaceFeature>>;
  /** Leave this field empty to use the hours from the primary branch chosen above. */
  sulStudyHours?: Maybe<Scalars['String']['output']>;
  /** Study Image */
  sulStudyImage?: Maybe<MediaImage>;
  /** LibCal Id Number */
  sulStudyLibcalId?: Maybe<Scalars['Int']['output']>;
  /** Room Donor Name */
  sulStudyRoomDonorName?: Maybe<Scalars['String']['output']>;
  /** Room Number */
  sulStudyRoomNumber?: Maybe<Scalars['String']['output']>;
  /** Type of Place */
  sulStudyType: TermSulStudyPlaceType;
  /** Title */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeSulStudyPlace. */
export type NodeSulStudyPlaceConnection = Connection & {
  __typename?: 'NodeSulStudyPlaceConnection';
  edges: Array<NodeSulStudyPlaceEdge>;
  nodes: Array<NodeSulStudyPlace>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeSulStudyPlace. */
export type NodeSulStudyPlaceEdge = Edge & {
  __typename?: 'NodeSulStudyPlaceEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeSulStudyPlace;
};

/** Entity type node. */
export type NodeUnion = NodeStanfordCourse | NodeStanfordEvent | NodeStanfordEventSeries | NodeStanfordNews | NodeStanfordPage | NodeStanfordPerson | NodeStanfordPolicy | NodeStanfordPublication | NodeSulLibrary | NodeSulStudyPlace;

/** A collection is a series of cards with tabs to trigger each card for display.  */
export type ParagraphCollection = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphCollection';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Collection card */
  sulCollectionCard?: Maybe<Array<ParagraphCollectionCard>>;
  /** The main headline. This shows up large. */
  sulCollectionHeading?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphCollectionCard = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphCollectionCard';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Card */
  sulCard?: Maybe<ParagraphStanfordCard>;
  /** Text used as the clickable button. */
  sulCardInfo: Scalars['String']['output'];
};

/** Entity type paragraph. */
export type ParagraphInterface = {
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Entity type paragraph. */
export type ParagraphLayout = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphLayout';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Entity type paragraph. */
export type ParagraphStanfordAccordion = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordAccordion';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Body/Answer */
  suAccordionBody: Text;
  /** The clickable text displayed above the body. */
  suAccordionTitle: Scalars['String']['output'];
};

/** Banner Paragraph Type */
export type ParagraphStanfordBanner = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordBanner';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The main content area for the banner. Shows up in an opaque box over the image.  */
  suBannerBody?: Maybe<Text>;
  /** A call to action link that shows up below the main body content. */
  suBannerButton?: Maybe<Link>;
  /** The main headline. This shows up large. */
  suBannerHeader?: Maybe<Scalars['String']['output']>;
  /** The banner background image. Please use hi-resolution images. */
  suBannerImage?: Maybe<MediaImage>;
  /** Smaller heading above the main headline */
  suBannerSupHeader?: Maybe<Scalars['String']['output']>;
};

/** A single card */
export type ParagraphStanfordCard = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordCard';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The main text of the card. */
  suCardBody?: Maybe<Text>;
  /** This is the main headline of the card type.  */
  suCardHeader?: Maybe<Scalars['String']['output']>;
  /** This is the text that will display on the site. */
  suCardLink?: Maybe<Link>;
  /** The main graphical element in the card. See: /patterns/card */
  suCardMedia?: Maybe<ParagraphStanfordCardSuCardMediaUnion>;
  /** This headline appears smaller and above the main headline. See: /patterns/card */
  suCardSuperHeader?: Maybe<Scalars['String']['output']>;
  /** Text that will overlay the bottom of the image. */
  sulCardImageCaption?: Maybe<Scalars['String']['output']>;
};

/** The main graphical element in the card. See: /patterns/card */
export type ParagraphStanfordCardSuCardMediaUnion = MediaImage | MediaVideo;

/** Pick a specific piece of content to display. */
export type ParagraphStanfordEntity = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordEntity';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** This button will appear below the content items. */
  suEntityButton?: Maybe<Link>;
  /** Description */
  suEntityDescription?: Maybe<Text>;
  /** This headline will appear above the content items in large font. */
  suEntityHeadline?: Maybe<Scalars['String']['output']>;
  /**
   * Start typing the title of the piece of content to select it. You can add
   * multiple items to create a curated list of teaser items. Learn more about the
   * Teaser Paragraph in the <a
   */
  suEntityItem?: Maybe<Array<ParagraphStanfordEntitySuEntityItemUnion>>;
};

/**
 * Start typing the title of the piece of content to select it. You can add
 * multiple items to create a curated list of teaser items. Learn more about the
 * Teaser Paragraph in the <a
 */
export type ParagraphStanfordEntitySuEntityItemUnion = NodeStanfordCourse | NodeStanfordEvent | NodeStanfordEventSeries | NodeStanfordNews | NodeStanfordPage | NodeStanfordPerson | NodeStanfordPolicy | NodeStanfordPublication;

/** Entity type paragraph. */
export type ParagraphStanfordFaq = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordFaq';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Description */
  suFaqDescription?: Maybe<Text>;
  /** Headline */
  suFaqHeadline?: Maybe<Scalars['String']['output']>;
  /** Questions/Answers */
  suFaqQuestions?: Maybe<Array<ParagraphStanfordAccordion>>;
};

/** Entity type paragraph. */
export type ParagraphStanfordGallery = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordGallery';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Button */
  suGalleryButton?: Maybe<Link>;
  /** Description */
  suGalleryDescription?: Maybe<Text>;
  /** Headline */
  suGalleryHeadline?: Maybe<Scalars['String']['output']>;
  /** Images */
  suGalleryImages?: Maybe<Array<MediaStanfordGalleryImage>>;
};

/** Choose a list to display various items dynamically. */
export type ParagraphStanfordList = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordList';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** This button will appear at the end of the list view. */
  suListButton?: Maybe<Link>;
  /** Description */
  suListDescription?: Maybe<Text>;
  /**
   * This is the main headline for the list paragraph. The headline will appear
   * above the list view in large font. This heading is required to build correct
   * heading structure for accessibility purposes.
   */
  suListHeadline: Scalars['String']['output'];
  /**
   * This is a viewfield query proxy. Page size and contextual filters are applied
   * within the CMS. See the actual view base query for more documentation on
   * filters and options available. Main display options for items presented in the
   * list view. Learn more in the section on &lt;a
   * Options&lt;/a&gt; to customize the list by taxonomy terms and change the
   * number of items displayed in the list.
   */
  suListView?: Maybe<ViewReference>;
};

/** A Drupal implementation of the Media component in Decanter: http://decanter.stanford.edu/item-components-media.html */
export type ParagraphStanfordMediaCaption = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordMediaCaption';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** A “caption” is a brief description of the media that appears below the item. */
  suMediaCaptionCaption?: Maybe<Text>;
  /** Link the media to something. Only works with images. */
  suMediaCaptionLink?: Maybe<Link>;
  /** Images or Video.  */
  suMediaCaptionMedia?: Maybe<ParagraphStanfordMediaCaptionSuMediaCaptionMediaUnion>;
};

/** Images or Video.  */
export type ParagraphStanfordMediaCaptionSuMediaCaptionMediaUnion = MediaImage | MediaVideo;

/** Page Title Banner Paragraph Type */
export type ParagraphStanfordPageTitleBanner = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordPageTitleBanner';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The page title banner background image. Please use hi-resolution images. */
  suTitleBannerImage: MediaImage;
};

/** A short profile call to action paragraph with an image, name, and title. */
export type ParagraphStanfordPersonCtum = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordPersonCtum';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Image */
  suPersonCtaImage?: Maybe<MediaImage>;
  /**
   * Add a URL to the person's website or profile. You can also enter an internal
   * path such as /node/add or an external URL such as http://example.com. Enter
   * <front> to link to the home page of this site.
   */
  suPersonCtaLink?: Maybe<Link>;
  /** Add the person's full name. */
  suPersonCtaName?: Maybe<Scalars['String']['output']>;
  /** Add the person's professional title */
  suPersonCtaTitle?: Maybe<Scalars['String']['output']>;
};

/** A schedule paragraph (typically for events) where authors can create a detailed order of proceedings.  */
export type ParagraphStanfordSchedule = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordSchedule';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Date & Time */
  suScheduleDateTime?: Maybe<SmartDateType>;
  /** Description */
  suScheduleDescription?: Maybe<Text>;
  /** Headline */
  suScheduleHeadline?: Maybe<Scalars['String']['output']>;
  /** Location */
  suScheduleLocation?: Maybe<Address>;
  /** Speaker */
  suScheduleSpeaker?: Maybe<Array<ParagraphStanfordPersonCtum>>;
  /** URL */
  suScheduleUrl?: Maybe<Link>;
};

/** A way to separate items in a row */
export type ParagraphStanfordSpacer = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordSpacer';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Select the size for the spacer.  Choosing None will apply the standard spacer height. */
  suSpacerSize?: Maybe<Scalars['String']['output']>;
};

/** A WYSIWYG Editor for all your text writing needs */
export type ParagraphStanfordWysiwyg = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphStanfordWysiwyg';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Body */
  suWysiwygText?: Maybe<Text>;
};

/** Entity type paragraph. */
export type ParagraphSulButton = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulButton';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Headline */
  sulButtonHeadline?: Maybe<Scalars['String']['output']>;
  /** Button Link */
  sulButtonLink: Link;
};

/** Entity type paragraph. */
export type ParagraphSulContactCard = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulContactCard';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Address */
  sulContactAddress?: Maybe<Address>;
  /** Branch */
  sulContactBranch?: Maybe<NodeSulLibrary>;
  /** Email */
  sulContactEmail?: Maybe<Scalars['Email']['output']>;
  /** Hours */
  sulContactHours?: Maybe<Scalars['String']['output']>;
  /** Image */
  sulContactImage?: Maybe<MediaImage>;
  /** Contact Link */
  sulContactLink?: Maybe<Link>;
  /** Map Link */
  sulContactMapLink?: Maybe<Link>;
  /** Phone Number */
  sulContactPhone?: Maybe<Scalars['PhoneNumber']['output']>;
  /** Title */
  sulContactTitle?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphSulFeatCollection = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulFeatCollection';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Cards */
  sulCollectionCards: Array<ParagraphStanfordCard>;
  /** Headline */
  sulCollectionHeadline?: Maybe<Scalars['String']['output']>;
  /** Headline Link */
  sulCollectionLink?: Maybe<Link>;
};

/** Entity type paragraph. */
export type ParagraphSulHomeBanner = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulHomeBanner';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Images */
  sulHomeImages?: Maybe<Array<ParagraphSulHomeImage>>;
};

/** Entity type paragraph. */
export type ParagraphSulHomeImage = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulHomeImage';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Image */
  sulHomeImage: MediaImage;
  /** Credits */
  sulHomeImageCredits?: Maybe<Text>;
};

/** Entity type paragraph. */
export type ParagraphSulLibguide = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulLibguide';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Description */
  sulLibguideDesc?: Maybe<Text>;
  /** Headline */
  sulLibguideHeadline?: Maybe<Scalars['String']['output']>;
  /** LibGuide Subject */
  sulLibguideId: Scalars['Int']['output'];
};

/** Entity type paragraph. */
export type ParagraphSulLocationHour = LayoutParagraphsInterface & ParagraphInterface & {
  __typename?: 'ParagraphSulLocationHour';
  /** Paragraph Behavior Settings. */
  behaviors?: Maybe<Scalars['String']['output']>;
  /** The layout information for this paragraph. */
  composition: LayoutParagraphs;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Alert Text */
  sulLocHoursAlert?: Maybe<Text>;
};

/** Entity type paragraph. */
export type ParagraphUnion = ParagraphCollection | ParagraphCollectionCard | ParagraphLayout | ParagraphStanfordAccordion | ParagraphStanfordBanner | ParagraphStanfordCard | ParagraphStanfordEntity | ParagraphStanfordFaq | ParagraphStanfordGallery | ParagraphStanfordList | ParagraphStanfordMediaCaption | ParagraphStanfordPageTitleBanner | ParagraphStanfordPersonCtum | ParagraphStanfordSchedule | ParagraphStanfordSpacer | ParagraphStanfordWysiwyg | ParagraphSulButton | ParagraphSulContactCard | ParagraphSulFeatCollection | ParagraphSulHomeBanner | ParagraphSulHomeImage | ParagraphSulLibguide | ParagraphSulLocationHour;

/** The schema's entry-point for queries. */
export type Query = {
  __typename?: 'Query';
  /** Load a Block plugin. */
  block?: Maybe<BlockUnion>;
  /** Load a BlockContent entity by id. */
  blockContent?: Maybe<BlockContentUnion>;
  /** Load a ConfigPages entity by id. */
  configPages?: Maybe<ConfigPagesUnion>;
  /** Schema information. */
  info: SchemaInformation;
  /** List of all LockupSetting on the platform. */
  lockupSettings: LockupSettingConnection;
  /** Load a Media entity by id. */
  media?: Maybe<MediaUnion>;
  /** Load a Menu by name. */
  menu?: Maybe<Menu>;
  /** Load a Node entity by id. */
  node?: Maybe<NodeUnion>;
  /** List of all NodeStanfordCourse on the platform. */
  nodeStanfordCourses: NodeStanfordCourseConnection;
  /** List of all NodeStanfordEventSeries on the platform. */
  nodeStanfordEventSeriesItems: NodeStanfordEventSeriesConnection;
  /** List of all NodeStanfordEvent on the platform. */
  nodeStanfordEvents: NodeStanfordEventConnection;
  /** List of all NodeStanfordNews on the platform. */
  nodeStanfordNewsItems: NodeStanfordNewsConnection;
  /** List of all NodeStanfordPage on the platform. */
  nodeStanfordPages: NodeStanfordPageConnection;
  /** List of all NodeStanfordPerson on the platform. */
  nodeStanfordPeople: NodeStanfordPersonConnection;
  /** List of all NodeStanfordPolicy on the platform. */
  nodeStanfordPolicies: NodeStanfordPolicyConnection;
  /** List of all NodeStanfordPublication on the platform. */
  nodeStanfordPublications: NodeStanfordPublicationConnection;
  /** List of all NodeSulLibrary on the platform. */
  nodeSulLibraries: NodeSulLibraryConnection;
  /** List of all NodeSulStudyPlace on the platform. */
  nodeSulStudyPlaces: NodeSulStudyPlaceConnection;
  /** Load a Paragraph entity by id. */
  paragraph?: Maybe<ParagraphUnion>;
  /** Load a Redirect entity by id. */
  redirect?: Maybe<Redirect>;
  /** List of all Redirect on the platform. */
  redirects: RedirectConnection;
  /** Load a Route by path. */
  route?: Maybe<RouteUnion>;
  /** Query for view search display graphql_search. */
  search?: Maybe<SearchResult>;
  /** Query for view stanford_basic_pages display basic_page_type_list_graphql. */
  stanfordBasicPages?: Maybe<StanfordBasicPagesResult>;
  /** List of all StanfordBasicSiteSetting on the platform. */
  stanfordBasicSiteSettings: StanfordBasicSiteSettingConnection;
  /** List of all StanfordGlobalMessage on the platform. */
  stanfordGlobalMessages: StanfordGlobalMessageConnection;
  /** List of all StanfordLocalFooter on the platform. */
  stanfordLocalFooters: StanfordLocalFooterConnection;
  /** News Views */
  stanfordNews?: Maybe<StanfordNewsResult>;
  /** Query for view stanford_opportunities display graphql. */
  stanfordOpportunities?: Maybe<StanfordOpportunitiesResult>;
  /** A list of people in a grid with node as the base table */
  stanfordPerson?: Maybe<StanfordPersonResult>;
  /** Query for view stanford_shared_tags display card_grid_graphql. */
  stanfordSharedTags?: Maybe<StanfordSharedTagsResult>;
  /** List of all StanfordSuperFooter on the platform. */
  stanfordSuperFooters: StanfordSuperFooterConnection;
  /** Query for view sul_branch_locations display branch_locations_graphql. */
  sulBranchLocations?: Maybe<SulBranchLocationsResult>;
  /** Query for view sul_events display list_page_graphql. */
  sulEvents?: Maybe<SulEventsResult>;
  /** Query for view sul_events display graphql_shared_tags. */
  sulEventsSharedTags?: Maybe<SulEventsSharedTagsResult>;
  /** Query for view sul_study_places display study_spaces_graphql. */
  sulStudyPlaces?: Maybe<SulStudyPlacesResult>;
  /** Load a Term entity by id. */
  term?: Maybe<TermUnion>;
  /** List of all TermStanfordNewsTopic on the platform. */
  termStanfordNewsTopics: TermStanfordNewsTopicConnection;
};


/** The schema's entry-point for queries. */
export type QueryBlockArgs = {
  id: Scalars['ID']['input'];
};


/** The schema's entry-point for queries. */
export type QueryBlockContentArgs = {
  id: Scalars['ID']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryConfigPagesArgs = {
  id: Scalars['ID']['input'];
};


/** The schema's entry-point for queries. */
export type QueryLockupSettingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryMediaArgs = {
  id: Scalars['ID']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryMenuArgs = {
  name: MenuAvailable;
};


/** The schema's entry-point for queries. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordCoursesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordEventSeriesItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordNewsItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordPagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordPeopleArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordPoliciesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeStanfordPublicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeSulLibrariesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryNodeSulStudyPlacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphArgs = {
  id: Scalars['ID']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryRedirectArgs = {
  id: Scalars['ID']['input'];
};


/** The schema's entry-point for queries. */
export type QueryRedirectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryRouteArgs = {
  path: Scalars['String']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QuerySearchArgs = {
  filter: SearchFilterInput;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordBasicPagesArgs = {
  contextualFilter?: InputMaybe<StanfordBasicPagesContextualFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<StanfordBasicPagesSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordBasicSiteSettingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordGlobalMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordLocalFootersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordNewsArgs = {
  contextualFilter?: InputMaybe<StanfordNewsContextualFilterInput>;
  filter?: InputMaybe<StanfordNewsFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<StanfordNewsSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordOpportunitiesArgs = {
  filter?: InputMaybe<StanfordOpportunitiesFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordPersonArgs = {
  contextualFilter?: InputMaybe<StanfordPersonContextualFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<StanfordPersonSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordSharedTagsArgs = {
  contextualFilter?: InputMaybe<StanfordSharedTagsContextualFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<StanfordSharedTagsSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryStanfordSuperFootersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QuerySulEventsArgs = {
  contextualFilter?: InputMaybe<SulEventsContextualFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<SulEventsSortKeys>;
};


/** The schema's entry-point for queries. */
export type QuerySulEventsSharedTagsArgs = {
  contextualFilter?: InputMaybe<SulEventsSharedTagsContextualFilterInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<SulEventsSharedTagsSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryTermArgs = {
  id: Scalars['ID']['input'];
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryTermStanfordNewsTopicsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};

/** Entity type redirect. */
export type Redirect = EdgeNode & MetaTagInterface & RedirectInterface & {
  __typename?: 'Redirect';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** To */
  redirectRedirect: Link;
  /**
   * Enter an internal Drupal path or path alias to redirect (e.g. <em
   * class="placeholder">node/123</em> or <em
   * class="placeholder">taxonomy/term/123</em>). Fragment anchors (e.g. <em
   * class="placeholder">#anchor</em>) are <strong>not</strong> allowed.
   */
  redirectSource: RedirectSourceType;
  /** The redirect status code. */
  statusCode: Scalars['Int']['output'];
};

/** A paginated set of results for Redirect. */
export type RedirectConnection = Connection & {
  __typename?: 'RedirectConnection';
  edges: Array<RedirectEdge>;
  nodes: Array<Redirect>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for Redirect. */
export type RedirectEdge = Edge & {
  __typename?: 'RedirectEdge';
  cursor: Scalars['Cursor']['output'];
  node: Redirect;
};

/** Entity type redirect. */
export type RedirectInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** To */
  redirectRedirect: Link;
  /**
   * Enter an internal Drupal path or path alias to redirect (e.g. <em
   * class="placeholder">node/123</em> or <em
   * class="placeholder">taxonomy/term/123</em>). Fragment anchors (e.g. <em
   * class="placeholder">#anchor</em>) are <strong>not</strong> allowed.
   */
  redirectSource: RedirectSourceType;
  /** The redirect status code. */
  statusCode: Scalars['Int']['output'];
};

/** Redirect Source data. */
export type RedirectSourceType = {
  __typename?: 'RedirectSourceType';
  /** Source URL */
  url: Scalars['String']['output'];
};

/** Entity type redirect. */
export type RedirectUnion = Redirect;

/** Routes represent incoming requests that resolve to content. */
export type Route = {
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** A list of possible entities that can be returned by URL. */
export type RouteEntityUnion = NodeStanfordCourse | NodeStanfordEvent | NodeStanfordEventSeries | NodeStanfordNews | NodeStanfordPage | NodeStanfordPerson | NodeStanfordPolicy | NodeStanfordPublication | NodeSulLibrary | TermBasicPageType | TermStanfordEventType | TermStanfordNewsTopic | TermStanfordPersonType | TermStanfordPublicationTopic | TermSuCourseSubject;

/** Route outside of this website. */
export type RouteExternal = Route & {
  __typename?: 'RouteExternal';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route within this website. */
export type RouteInternal = Route & {
  __typename?: 'RouteInternal';
  /** Breadcrumb links for this route. */
  breadcrumbs?: Maybe<Array<Link>>;
  /** Content assigned to this route. */
  entity?: Maybe<RouteEntityUnion>;
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Redirect to another URL with status. */
export type RouteRedirect = Route & {
  __typename?: 'RouteRedirect';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** Utility prop. Always true for redirects. */
  redirect: Scalars['Boolean']['output'];
  /** Suggested status for redirect. Eg 301. */
  status: Scalars['Int']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route types that can exist in the system. */
export type RouteUnion = RouteExternal | RouteInternal | RouteRedirect;

/** Schema information provided by the system. */
export type SchemaInformation = {
  __typename?: 'SchemaInformation';
  /** The schema description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The internal path to the front page. */
  home?: Maybe<Scalars['String']['output']>;
  /** The site name. */
  name?: Maybe<Scalars['String']['output']>;
  /** The schema version. */
  version?: Maybe<Scalars['String']['output']>;
};

export type SearchFilterInput = {
  /** Keyword Search  */
  key: Scalars['String']['input'];
};

/** Result for view search display graphql_search. */
export type SearchResult = View & {
  __typename?: 'SearchResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<SearchRow>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** All available types for view result row. */
export type SearchRow = NodeStanfordCourse | NodeStanfordEvent | NodeStanfordEventSeries | NodeStanfordNews | NodeStanfordPage | NodeStanfordPerson | NodeStanfordPolicy | NodeStanfordPublication | NodeSulLibrary;

/** Smart Date data. */
export type SmartDateType = {
  __typename?: 'SmartDateType';
  /** Duration, in minutes */
  duration?: Maybe<Scalars['Int']['output']>;
  /** End timestamp value */
  end_value: Scalars['Timestamp']['output'];
  /** RRule ID */
  rrule?: Maybe<Scalars['Int']['output']>;
  /** RRule Index */
  rrule_index?: Maybe<Scalars['Int']['output']>;
  /** Timezone */
  timezone?: Maybe<Scalars['String']['output']>;
  /** Start timestamp value */
  value: Scalars['Timestamp']['output'];
};

/** Sort direction. */
export enum SortDirection {
  /** Ascending */
  Asc = 'ASC',
  /** Descending */
  Desc = 'DESC'
}

export type StanfordBasicPagesContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
};

/** Result for view stanford_basic_pages display basic_page_type_list_graphql. */
export type StanfordBasicPagesResult = View & {
  __typename?: 'StanfordBasicPagesResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export enum StanfordBasicPagesSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** Title */
  Title = 'TITLE'
}

/** Entity type config_pages. */
export type StanfordBasicSiteSetting = ConfigPagesInterface & EdgeNode & MetaTagInterface & {
  __typename?: 'StanfordBasicSiteSetting';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /**
   * This ID is unique to each site you want to track separately and is in the form
   * of G-xxxxxxxxx. To get a Web Property ID, <a
   * href="https://marketingplatform.google.com/about/analytics/">register your
   * site with Google Analytics</a>, or if you already have registered your site,
   * go to your Google Analytics Settings page to see the ID next to every site
   * more information in the documentation.</a>
   */
  suGoogleAnalytics?: Maybe<Scalars['String']['output']>;
  /** Check this box to disable the external link icons. */
  suHideExtLinkIcons?: Maybe<Scalars['Boolean']['output']>;
  /** Check this box to disable the site search box. */
  suHideSiteSearch?: Maybe<Scalars['Boolean']['output']>;
  /** Send content data to Algolia using the configured credentials below. */
  suSiteAlgolia?: Maybe<Scalars['Boolean']['output']>;
  /**
   * This is your unique application identifier. It's used to identify you when
   * using Algolia's API. Find this ID in <a
   * href="https://dashboard.algolia.com/account/api-keys/all>Algolia
   */
  suSiteAlgoliaId?: Maybe<Scalars['String']['output']>;
  /** Algolia index machine name. This can be found at the top of the Algolia UI when on the "Search" configuration page. */
  suSiteAlgoliaIndex?: Maybe<Scalars['String']['output']>;
  /**
   * This is the public API key to use in your frontend code. This key is only
   * usable for search queries and sending data to the Insights API. Find this key
   * in <a href="https://dashboard.algolia.com/account/api-keys/all>Algolia
   */
  suSiteAlgoliaSearch?: Maybe<Scalars['String']['output']>;
  /** Enable Algolia searching on the <a href="/search">search page</a>. */
  suSiteAlgoliaUi?: Maybe<Scalars['Boolean']['output']>;
  /** Check this box to enable the split-button drop down menu feature. */
  suSiteDropdowns?: Maybe<Scalars['Boolean']['output']>;
  /** Maximum Menu Levels */
  suSiteMenuLevels?: Maybe<Scalars['Int']['output']>;
  /** Site Name */
  suSiteName?: Maybe<Scalars['String']['output']>;
  /**
   * Emit metadata that tells <em>well behaved</em> search engines to not crawl
   * this site. This is useful when the site is being built. Remember to disable
   * upon the site launching.
   */
  suSiteNobots?: Maybe<Scalars['Boolean']['output']>;
};

/** A paginated set of results for StanfordBasicSiteSetting. */
export type StanfordBasicSiteSettingConnection = Connection & {
  __typename?: 'StanfordBasicSiteSettingConnection';
  edges: Array<StanfordBasicSiteSettingEdge>;
  nodes: Array<StanfordBasicSiteSetting>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for StanfordBasicSiteSetting. */
export type StanfordBasicSiteSettingEdge = Edge & {
  __typename?: 'StanfordBasicSiteSettingEdge';
  cursor: Scalars['Cursor']['output'];
  node: StanfordBasicSiteSetting;
};

/** Entity type config_pages. */
export type StanfordGlobalMessage = ConfigPagesInterface & EdgeNode & MetaTagInterface & {
  __typename?: 'StanfordGlobalMessage';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Check this box to display a site-wide global message. This message will appear above the master header on all site pages. */
  suGlobalMsgEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** This is the main headline for the message. <em>It will appear in large and bold text above the message.</em> */
  suGlobalMsgHeader?: Maybe<Scalars['String']['output']>;
  /**
   * Maximum 65 characters. <em>A “label” is short description of the message
   * such as alert, information, warning). It will appear in small capital letters
   * with to the icon, next to the message.</em>
   */
  suGlobalMsgLabel?: Maybe<Scalars['String']['output']>;
  /** Action Link */
  suGlobalMsgLink?: Maybe<Link>;
  /** This is the body content of the message. */
  suGlobalMsgMessage?: Maybe<Text>;
  /**
   * Select the display of the message. You can see examples in <a
   * href="https://sitesuserguide.stanford.edu/node/676/">the user-guide.</a>
   */
  suGlobalMsgType: Scalars['String']['output'];
};

/** A paginated set of results for StanfordGlobalMessage. */
export type StanfordGlobalMessageConnection = Connection & {
  __typename?: 'StanfordGlobalMessageConnection';
  edges: Array<StanfordGlobalMessageEdge>;
  nodes: Array<StanfordGlobalMessage>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for StanfordGlobalMessage. */
export type StanfordGlobalMessageEdge = Edge & {
  __typename?: 'StanfordGlobalMessageEdge';
  cursor: Scalars['Cursor']['output'];
  node: StanfordGlobalMessage;
};

/** Entity type config_pages. */
export type StanfordLocalFooter = ConfigPagesInterface & EdgeNode & MetaTagInterface & {
  __typename?: 'StanfordLocalFooter';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Enabled */
  suFooterEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Action Links */
  suLocalFootAction?: Maybe<Array<Link>>;
  /** Address */
  suLocalFootAddress?: Maybe<Address>;
  /** Signup Button Text */
  suLocalFootFButton?: Maybe<Scalars['String']['output']>;
  /** Signup Form Intro */
  suLocalFootFIntro?: Maybe<Text>;
  /** Form Method */
  suLocalFootFMethod: Scalars['String']['output'];
  /** Form Action URL */
  suLocalFootFUrl?: Maybe<Link>;
  /** Site title line. */
  suLocalFootLine1?: Maybe<Scalars['String']['output']>;
  /** Secondary title line. */
  suLocalFootLine2?: Maybe<Scalars['String']['output']>;
  /** Tertiary title line. */
  suLocalFootLine3?: Maybe<Scalars['String']['output']>;
  /** Organization name. */
  suLocalFootLine4?: Maybe<Scalars['String']['output']>;
  /** Last line full width option. */
  suLocalFootLine5?: Maybe<Scalars['String']['output']>;
  /** Upload logo image */
  suLocalFootLocImg?: Maybe<Image>;
  /** Link the footer lockup to somewhere. */
  suLocalFootLocLink?: Maybe<Link>;
  /** Layout options. */
  suLocalFootLocOp?: Maybe<Scalars['String']['output']>;
  /** First Content Block */
  suLocalFootPrCo?: Maybe<Text>;
  /** Primary Links */
  suLocalFootPrimary?: Maybe<Array<Link>>;
  /** Primary Links Header */
  suLocalFootPrimeH?: Maybe<Scalars['String']['output']>;
  /** Second Content Block */
  suLocalFootSeCo?: Maybe<Text>;
  /** Secondary Links */
  suLocalFootSecond?: Maybe<Array<Link>>;
  /** Secondary Links Header */
  suLocalFootSecondH?: Maybe<Scalars['String']['output']>;
  /**
   * Links added in this section will automatically create icons that will appear
   * in your footer. Supported social links include: Bluesky, Facebook, Flickr,
   * Github, Google Scholar, Instagram, LinkedIn, Mastodon.social, Threads, X, and
   */
  suLocalFootSocial?: Maybe<Array<Link>>;
  /** The link text for a user to log into this site. */
  suLocalFootSunetT?: Maybe<Scalars['String']['output']>;
  /** Third Content Block */
  suLocalFootTr2Co?: Maybe<Text>;
  /** Fourth Content Block */
  suLocalFootTrCo?: Maybe<Text>;
  /**
   * Uncheck this box if you want to replace the default lock-up settings with a
   * custom logo or text. This custom logo will appear in the top left corner of
   * the website's main header.
   * <strong>The lockup will only change the look. Remember to change the name of
   * your site as well. See the user guide for instructions on <a
   * your site name</a> and <a
   * branding and logo options</a>.</strong>
   */
  suLocalFootUseLoc?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Uncheck this box if you want to replace the default lock up settings with a
   * custom logo. This custom logo will appear in the top left corner of the
   * website's main header.
   */
  suLocalFootUseLogo?: Maybe<Scalars['Boolean']['output']>;
};

/** A paginated set of results for StanfordLocalFooter. */
export type StanfordLocalFooterConnection = Connection & {
  __typename?: 'StanfordLocalFooterConnection';
  edges: Array<StanfordLocalFooterEdge>;
  nodes: Array<StanfordLocalFooter>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for StanfordLocalFooter. */
export type StanfordLocalFooterEdge = Edge & {
  __typename?: 'StanfordLocalFooterEdge';
  cursor: Scalars['Cursor']['output'];
  node: StanfordLocalFooter;
};

export type StanfordNewsContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
};

export type StanfordNewsFilterInput = {
  /** Publishing Date  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Title  */
  title?: InputMaybe<Scalars['String']['input']>;
  /** News Type  */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** News Views */
export type StanfordNewsResult = View & {
  __typename?: 'StanfordNewsResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export enum StanfordNewsSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** Publishing Date (su_news_publishing_date) */
  PublishingDate = 'PUBLISHING_DATE',
  /** Title */
  Title = 'TITLE'
}

export type StanfordOpportunitiesFilterInput = {
  /** Filter  */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Result for view stanford_opportunities display graphql. */
export type StanfordOpportunitiesResult = View & {
  __typename?: 'StanfordOpportunitiesResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<UnsupportedType>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export type StanfordPersonContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
};

/** A list of people in a grid with node as the base table */
export type StanfordPersonResult = View & {
  __typename?: 'StanfordPersonResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export enum StanfordPersonSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** First Name (su_person_first_name) */
  FirstName = 'FIRST_NAME',
  /** Last Name (su_person_last_name) */
  LastName = 'LAST_NAME',
  /** Title */
  Title = 'TITLE'
}

export type StanfordSharedTagsContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Result for view stanford_shared_tags display card_grid_graphql. */
export type StanfordSharedTagsResult = View & {
  __typename?: 'StanfordSharedTagsResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export enum StanfordSharedTagsSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** Title */
  Title = 'TITLE'
}

/** Entity type config_pages. */
export type StanfordSuperFooter = ConfigPagesInterface & EdgeNode & MetaTagInterface & {
  __typename?: 'StanfordSuperFooter';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Check this box to display a site-wide super footer. This content will appear above the local footer on all site pages. */
  suSuperFootEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Intranet Link */
  suSuperFootIntranet?: Maybe<Link>;
  /** Link */
  suSuperFootLink?: Maybe<Array<Link>>;
  /** An open area for WYSIWYG text */
  suSuperFootText?: Maybe<Text>;
  /** Super Footer Title */
  suSuperFootTitle?: Maybe<Scalars['String']['output']>;
};

/** A paginated set of results for StanfordSuperFooter. */
export type StanfordSuperFooterConnection = Connection & {
  __typename?: 'StanfordSuperFooterConnection';
  edges: Array<StanfordSuperFooterEdge>;
  nodes: Array<StanfordSuperFooter>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for StanfordSuperFooter. */
export type StanfordSuperFooterEdge = Edge & {
  __typename?: 'StanfordSuperFooterEdge';
  cursor: Scalars['Cursor']['output'];
  node: StanfordSuperFooter;
};

/** Entity type su_policy_log. */
export type SuPolicyLog = SuPolicyLogInterface & {
  __typename?: 'SuPolicyLog';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The day this change log occurs. The "date" will appear above the change log notes. */
  suPolicyDate: DateTime;
  /** Notes */
  suPolicyNotes: Scalars['String']['output'];
  /** Check this box to display this change log information on the policy's detail page. */
  suPolicyPublic?: Maybe<Scalars['Boolean']['output']>;
  /** A "title" is short text that appears next to the "Date" on the detail policy page. */
  suPolicyTitle: Scalars['String']['output'];
};

/** Entity type su_policy_log. */
export type SuPolicyLogInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
};

/** Entity type su_policy_log. */
export type SuPolicyLogUnion = SuPolicyLog;

/** The schema's entry-point for subscriptions. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Placeholder for subscription extension. */
  _: Scalars['Boolean']['output'];
};

/** Result for view sul_branch_locations display branch_locations_graphql. */
export type SulBranchLocationsResult = View & {
  __typename?: 'SulBranchLocationsResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export type SulEventsContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
  term_node_taxonomy_name_depth_1?: InputMaybe<Scalars['String']['input']>;
  term_node_taxonomy_name_depth_2?: InputMaybe<Scalars['String']['input']>;
  term_node_taxonomy_name_depth_3?: InputMaybe<Scalars['String']['input']>;
};

/** Result for view sul_events display list_page_graphql. */
export type SulEventsResult = View & {
  __typename?: 'SulEventsResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export type SulEventsSharedTagsContextualFilterInput = {
  term_node_taxonomy_name_depth?: InputMaybe<Scalars['String']['input']>;
};

/** Result for view sul_events display graphql_shared_tags. */
export type SulEventsSharedTagsResult = View & {
  __typename?: 'SulEventsSharedTagsResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** Exposed filters for the view. */
  filters: Array<Maybe<ViewFilter>>;
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

export enum SulEventsSharedTagsSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** Date & Time - Start */
  StartTime = 'START_TIME',
  /** Title */
  Title = 'TITLE'
}

export enum SulEventsSortKeys {
  /** Changed */
  Changed = 'CHANGED',
  /** Authored on */
  Created = 'CREATED',
  /** Date & Time - Start */
  StartTime = 'START_TIME',
  /** Title */
  Title = 'TITLE'
}

/** Result for view sul_study_places display study_spaces_graphql. */
export type SulStudyPlacesResult = View & {
  __typename?: 'SulStudyPlacesResult';
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The results of the view. */
  results: Array<NodeUnion>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** Broad categories that specify a type of Basic Page. (i.e. Research Projects) */
export type TermBasicPageType = MetaTagInterface & TermInterface & {
  __typename?: 'TermBasicPageType';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** A curated list of groups that an Event is open to. */
export type TermEventAudience = MetaTagInterface & TermInterface & {
  __typename?: 'TermEventAudience';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermInterface = {
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermStanfordEventGroup = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordEventGroup';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermStanfordEventKeyword = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordEventKeyword';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermStanfordEventSubject = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordEventSubject';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Broad categories that specify a type of Event. (i.e. Lecture) */
export type TermStanfordEventType = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordEventType';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Broad categories that specify a type of News article. (i.e. Blog) */
export type TermStanfordNewsTopic = EdgeNode & MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordNewsTopic';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** A paginated set of results for TermStanfordNewsTopic. */
export type TermStanfordNewsTopicConnection = Connection & {
  __typename?: 'TermStanfordNewsTopicConnection';
  edges: Array<TermStanfordNewsTopicEdge>;
  nodes: Array<TermStanfordNewsTopic>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for TermStanfordNewsTopic. */
export type TermStanfordNewsTopicEdge = Edge & {
  __typename?: 'TermStanfordNewsTopicEdge';
  cursor: Scalars['Cursor']['output'];
  node: TermStanfordNewsTopic;
};

/** Terms to support grouping of People. */
export type TermStanfordPersonType = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordPersonType';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Broad categories that specify a type of Publication. (i.e. white-paper) */
export type TermStanfordPublicationTopic = MetaTagInterface & TermInterface & {
  __typename?: 'TermStanfordPublicationTopic';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermStudyPlaceCapacity = MetaTagInterface & TermInterface & {
  __typename?: 'TermStudyPlaceCapacity';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Quarters offered for courses, via ExploreCourses */
export type TermSuCourseQuarter = MetaTagInterface & TermInterface & {
  __typename?: 'TermSuCourseQuarter';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Course subjects from ExploreCourses */
export type TermSuCourseSubject = MetaTagInterface & TermInterface & {
  __typename?: 'TermSuCourseSubject';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Tags from ExploreCourses */
export type TermSuCourseTag = MetaTagInterface & TermInterface & {
  __typename?: 'TermSuCourseTag';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Terms that can be used to describe all content types (i.e. Featured) */
export type TermSuSharedTag = MetaTagInterface & TermInterface & {
  __typename?: 'TermSuSharedTag';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermSulStudyPlaceFeature = MetaTagInterface & TermInterface & {
  __typename?: 'TermSulStudyPlaceFeature';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermSulStudyPlaceType = MetaTagInterface & TermInterface & {
  __typename?: 'TermSulStudyPlaceType';
  /** The time that the term was last edited. */
  changed: DateTime;
  /** Description */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The term language code. */
  langcode: Language;
  /** The computed meta tags for the entity. */
  metatag: Array<MetaTagUnion>;
  /** Name */
  name: Scalars['String']['output'];
  /** The parents of this term. */
  parent?: Maybe<TermUnion>;
  /** URL alias */
  path?: Maybe<Scalars['String']['output']>;
  /** Published */
  status: Scalars['Boolean']['output'];
  /** The weight of this term in relation to other terms. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermUnion = TermBasicPageType | TermEventAudience | TermStanfordEventGroup | TermStanfordEventKeyword | TermStanfordEventSubject | TermStanfordEventType | TermStanfordNewsTopic | TermStanfordPersonType | TermStanfordPublicationTopic | TermStudyPlaceCapacity | TermSuCourseQuarter | TermSuCourseSubject | TermSuCourseTag | TermSuSharedTag | TermSulStudyPlaceFeature | TermSulStudyPlaceType;

/** A processed text format defined by the CMS. */
export type Text = {
  __typename?: 'Text';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** A processed text format with summary defined by the CMS. */
export type TextSummary = {
  __typename?: 'TextSummary';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The processed text summary. */
  summary?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * Unsupported entity or field type in the schema.
 * This entity may not have been enabled in the schema yet and is being referenced via entity reference.
 */
export type UnsupportedType = {
  __typename?: 'UnsupportedType';
  /** Unsupported type, always TRUE. */
  unsupported?: Maybe<Scalars['Boolean']['output']>;
};

/** Views represent collections of curated data from the CMS. */
export type View = {
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** An exposed filter option for the view. */
export type ViewFilter = {
  __typename?: 'ViewFilter';
  /** The filter element attributes. */
  attributes: Scalars['UntypedStructuredData']['output'];
  /** The filter element description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The filter identifier. */
  id: Scalars['ID']['output'];
  /** The filter element label. */
  label?: Maybe<Scalars['String']['output']>;
  /** Whether the filter allows multiple values. */
  multiple: Scalars['Boolean']['output'];
  /** The filter operator. */
  operator: Scalars['String']['output'];
  /** The filter element options if any are defined. */
  options?: Maybe<Scalars['UntypedStructuredData']['output']>;
  /** The filter plugin type. */
  plugin: Scalars['String']['output'];
  /** Whether the filter is required. */
  required: Scalars['Boolean']['output'];
  /** The filter element type. */
  type: Scalars['String']['output'];
  /** The value for the filter. Could be an array for multiple values. */
  value?: Maybe<Scalars['UntypedStructuredData']['output']>;
};

/** Information about the page in a view. */
export type ViewPageInfo = {
  __typename?: 'ViewPageInfo';
  /** Any result offset being used. */
  offset: Scalars['Int']['output'];
  /** The current page being returned. */
  page: Scalars['Int']['output'];
  /** How many results per page. */
  pageSize: Scalars['Int']['output'];
  /** How many results total. */
  total: Scalars['Int']['output'];
};

/** A reference to an embedded view */
export type ViewReference = {
  __typename?: 'ViewReference';
  /** The contextual filter values used. */
  contextualFilter?: Maybe<Array<Scalars['String']['output']>>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** How many results per page. */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** The name of the query used to fetch the data, if the view is a GraphQL display. */
  query?: Maybe<Scalars['String']['output']>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** All available view result types. */
export type ViewResultUnion = SearchResult | StanfordBasicPagesResult | StanfordNewsResult | StanfordOpportunitiesResult | StanfordPersonResult | StanfordSharedTagsResult | SulBranchLocationsResult | SulEventsResult | SulEventsSharedTagsResult | SulStudyPlacesResult;

export type NodeQueryVariables = Exact<{
  uuid: Scalars['ID']['input'];
}>;


export type NodeQuery = { __typename?: 'Query', node?: { __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, suCourseCode?: string | null, suCourseId?: number | null, suCourseInstructors?: Array<string> | null, suCourseSectionUnits?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suCourseLink: { __typename?: 'Link', url?: string | null, title?: string | null }, suCourseQuarters?: Array<{ __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, suCourseTags?: Array<{ __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventAltLoc?: string | null, suEventContactInfo?: string | null, suEventDek?: string | null, suEventEmail?: any | null, suEventSponsor?: Array<string> | null, suEventSubheadline?: string | null, suEventTelephone?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suEventAudience?: Array<{ __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventGroups?: Array<{ __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventKeywords?: Array<{ __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSchedule?: Array<{ __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSubject?: Array<{ __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, suEventSeriesSubheadline?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suEventSeriesComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventSeriesEvent?: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suEventSeriesType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsBannerMediaCaption?: string | null, suNewsByline?: string | null, suNewsDek?: string | null, suNewsHideSocial?: boolean | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suNewsComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suBasicPageType?: Array<{ __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null } | null, suPageComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, suPersonAcademicAppt?: string | null, suPersonAdminAppts?: Array<string> | null, suPersonEducation?: Array<string> | null, suPersonEmail?: any | null, suPersonFax?: string | null, suPersonFirstName: string, suPersonFullTitle?: string | null, suPersonLastName: string, suPersonLocationName?: string | null, suPersonMailCode?: string | null, suPersonMobilePhone?: string | null, suPersonPronouns?: string | null, suPersonResearchInterests?: Array<string> | null, suPersonShortTitle?: string | null, suPersonTelephone?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPersonAffiliations?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPersonLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonLocationAddress?: { __typename?: 'Text', processed?: any | null } | null, suPersonMapUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonProfileLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonScholarlyInterests?: { __typename?: 'Text', processed?: any | null } | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPolicyAuthority?: string | null, suPolicyAutoPrefix?: boolean | null, suPolicyChapter?: string | null, suPolicyPolicyNum?: string | null, suPolicySubchapter?: string | null, suPolicyTitle: string, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPolicyChangelog?: Array<{ __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPolicyEffective?: { __typename?: 'DateTime', timezone: any, time: any } | null, suPolicyRelated?: Array<{ __typename?: 'NodeStanfordPolicy', id: string, path?: string | null }> | null, suPolicyUpdated?: { __typename?: 'DateTime', timezone: any, time: any } | null } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationAuthorRef?: Array<{ __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPublicationComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPublicationCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPublicationImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null } | null };

export type NodesQueryVariables = Exact<{ [key: string]: never; }>;


export type NodesQuery = { __typename?: 'Query', nodeStanfordCourses: { __typename?: 'NodeStanfordCourseConnection', nodes: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordEventSeriesItems: { __typename?: 'NodeStanfordEventSeriesConnection', nodes: Array<{ __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordEvents: { __typename?: 'NodeStanfordEventConnection', nodes: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordNewsItems: { __typename?: 'NodeStanfordNewsConnection', nodes: Array<{ __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordPages: { __typename?: 'NodeStanfordPageConnection', nodes: Array<{ __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordPeople: { __typename?: 'NodeStanfordPersonConnection', nodes: Array<{ __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordPolicies: { __typename?: 'NodeStanfordPolicyConnection', nodes: Array<{ __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeStanfordPublications: { __typename?: 'NodeStanfordPublicationConnection', nodes: Array<{ __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> }, nodeSulLibraries: { __typename?: 'NodeSulLibraryConnection', nodes: Array<{ __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> } };

export type LibrariesQueryVariables = Exact<{ [key: string]: never; }>;


export type LibrariesQuery = { __typename?: 'Query', nodeSulLibraries: { __typename?: 'NodeSulLibraryConnection', nodes: Array<{ __typename?: 'NodeSulLibrary', id: string, title: string, path?: string | null, suLibraryHours?: string | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null }> } };

export type MediaQueryVariables = Exact<{
  uuid: Scalars['ID']['input'];
}>;


export type MediaQuery = { __typename?: 'Query', media?: { __typename: 'MediaEmbeddable', mediaEmbeddableCode?: string | null, mediaEmbeddableOembed?: string | null, id: string, name: string } | { __typename: 'MediaFile', id: string, name: string, mediaFile: { __typename?: 'File', url: string } } | { __typename: 'MediaGoogleForm', mediaGoogleForm: string, id: string, name: string } | { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null };

export type TermQueryVariables = Exact<{
  uuid: Scalars['ID']['input'];
}>;


export type TermQuery = { __typename?: 'Query', term?: { __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSuSharedTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null };

export type ConfigPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigPagesQuery = { __typename?: 'Query', stanfordBasicSiteSettings: { __typename?: 'StanfordBasicSiteSettingConnection', nodes: Array<{ __typename: 'StanfordBasicSiteSetting', suGoogleAnalytics?: string | null, suSiteAlgolia?: boolean | null, suSiteAlgoliaId?: string | null, suSiteAlgoliaIndex?: string | null, suSiteAlgoliaSearch?: string | null, suSiteDropdowns?: boolean | null, suSiteMenuLevels?: number | null, suSiteName?: string | null, suSiteNobots?: boolean | null }> }, stanfordGlobalMessages: { __typename?: 'StanfordGlobalMessageConnection', nodes: Array<{ __typename: 'StanfordGlobalMessage', suGlobalMsgEnabled?: boolean | null, suGlobalMsgHeader?: string | null, suGlobalMsgLabel?: string | null, suGlobalMsgType: string, suGlobalMsgLink?: { __typename?: 'Link', title?: string | null, url?: string | null } | null, suGlobalMsgMessage?: { __typename?: 'Text', processed?: any | null } | null }> }, stanfordLocalFooters: { __typename?: 'StanfordLocalFooterConnection', nodes: Array<{ __typename: 'StanfordLocalFooter', suFooterEnabled?: boolean | null, suLocalFootFButton?: string | null, suLocalFootFMethod: string, suLocalFootLine1?: string | null, suLocalFootLine4?: string | null, suLocalFootLine2?: string | null, suLocalFootLine3?: string | null, suLocalFootLine5?: string | null, suLocalFootLocOp?: string | null, suLocalFootPrimeH?: string | null, suLocalFootSecondH?: string | null, suLocalFootSunetT?: string | null, suLocalFootUseLoc?: boolean | null, suLocalFootUseLogo?: boolean | null, suLocalFootAction?: Array<{ __typename?: 'Link', title?: string | null, url?: string | null }> | null, suLocalFootAddress?: { __typename?: 'Address', additionalName?: string | null, addressLine1?: string | null, addressLine2?: string | null, administrativeArea?: string | null, dependentLocality?: string | null, familyName?: string | null, givenName?: string | null, langcode?: string | null, locality?: string | null, organization?: string | null, postalCode?: string | null, sortingCode?: string | null, country?: { __typename?: 'AddressCountry', code?: string | null, name?: string | null } | null } | null, suLocalFootFIntro?: { __typename?: 'Text', processed?: any | null } | null, suLocalFootFUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLocalFootLocImg?: { __typename?: 'Image', alt?: string | null, height: number, url: string, width: number } | null, suLocalFootLocLink?: { __typename?: 'Link', title?: string | null, url?: string | null } | null, suLocalFootPrCo?: { __typename?: 'Text', processed?: any | null } | null, suLocalFootPrimary?: Array<{ __typename?: 'Link', title?: string | null, url?: string | null }> | null, suLocalFootSeCo?: { __typename?: 'Text', processed?: any | null } | null, suLocalFootSecond?: Array<{ __typename?: 'Link', title?: string | null, url?: string | null }> | null, suLocalFootSocial?: Array<{ __typename?: 'Link', title?: string | null, url?: string | null }> | null, suLocalFootTr2Co?: { __typename?: 'Text', processed?: any | null } | null, suLocalFootTrCo?: { __typename?: 'Text', processed?: any | null } | null }> }, stanfordSuperFooters: { __typename?: 'StanfordSuperFooterConnection', nodes: Array<{ __typename: 'StanfordSuperFooter', suSuperFootEnabled?: boolean | null, suSuperFootTitle?: string | null, suSuperFootIntranet?: { __typename?: 'Link', title?: string | null, url?: string | null } | null, suSuperFootLink?: Array<{ __typename?: 'Link', title?: string | null, url?: string | null }> | null, suSuperFootText?: { __typename?: 'Text', processed?: any | null } | null }> }, lockupSettings: { __typename?: 'LockupSettingConnection', nodes: Array<{ __typename: 'LockupSetting', suLine1?: string | null, suLine2?: string | null, suLine3?: string | null, suLine4?: string | null, suLine5?: string | null, suLockupEnabled?: boolean | null, suLockupOptions?: string | null, suUseThemeLogo?: boolean | null, suUploadLogoImage?: { __typename?: 'Image', alt?: string | null, height: number, url: string, width: number } | null }> } };

export type NewsTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsTypesQuery = { __typename?: 'Query', termStanfordNewsTopics: { __typename?: 'TermStanfordNewsTopicConnection', nodes: Array<{ __typename?: 'TermStanfordNewsTopic', id: string, name: string }> } };

export type FragmentLinkFragment = { __typename?: 'Link', url?: string | null, title?: string | null };

export type FragmentTextSummaryFragment = { __typename?: 'TextSummary', processed?: any | null, summary?: any | null };

export type FragmentTextFragment = { __typename?: 'Text', processed?: any | null };

export type FragmentSuPolicyLogFragment = { __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentTermInterface_TermBasicPageType_Fragment = { __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermEventAudience_Fragment = { __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordEventGroup_Fragment = { __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordEventKeyword_Fragment = { __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordEventSubject_Fragment = { __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordEventType_Fragment = { __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordNewsTopic_Fragment = { __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordPersonType_Fragment = { __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStanfordPublicationTopic_Fragment = { __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermStudyPlaceCapacity_Fragment = { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSuCourseQuarter_Fragment = { __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSuCourseSubject_Fragment = { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSuCourseTag_Fragment = { __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSuSharedTag_Fragment = { __typename: 'TermSuSharedTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSulStudyPlaceFeature_Fragment = { __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

type FragmentTermInterface_TermSulStudyPlaceType_Fragment = { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null };

export type FragmentTermInterfaceFragment = FragmentTermInterface_TermBasicPageType_Fragment | FragmentTermInterface_TermEventAudience_Fragment | FragmentTermInterface_TermStanfordEventGroup_Fragment | FragmentTermInterface_TermStanfordEventKeyword_Fragment | FragmentTermInterface_TermStanfordEventSubject_Fragment | FragmentTermInterface_TermStanfordEventType_Fragment | FragmentTermInterface_TermStanfordNewsTopic_Fragment | FragmentTermInterface_TermStanfordPersonType_Fragment | FragmentTermInterface_TermStanfordPublicationTopic_Fragment | FragmentTermInterface_TermStudyPlaceCapacity_Fragment | FragmentTermInterface_TermSuCourseQuarter_Fragment | FragmentTermInterface_TermSuCourseSubject_Fragment | FragmentTermInterface_TermSuCourseTag_Fragment | FragmentTermInterface_TermSuSharedTag_Fragment | FragmentTermInterface_TermSulStudyPlaceFeature_Fragment | FragmentTermInterface_TermSulStudyPlaceType_Fragment;

type FragmentMediaInterface_MediaEmbeddable_Fragment = { __typename: 'MediaEmbeddable', id: string, name: string };

type FragmentMediaInterface_MediaFile_Fragment = { __typename: 'MediaFile', id: string, name: string };

type FragmentMediaInterface_MediaGoogleForm_Fragment = { __typename: 'MediaGoogleForm', id: string, name: string };

type FragmentMediaInterface_MediaImage_Fragment = { __typename: 'MediaImage', id: string, name: string };

type FragmentMediaInterface_MediaStanfordGalleryImage_Fragment = { __typename: 'MediaStanfordGalleryImage', id: string, name: string };

type FragmentMediaInterface_MediaVideo_Fragment = { __typename: 'MediaVideo', id: string, name: string };

export type FragmentMediaInterfaceFragment = FragmentMediaInterface_MediaEmbeddable_Fragment | FragmentMediaInterface_MediaFile_Fragment | FragmentMediaInterface_MediaGoogleForm_Fragment | FragmentMediaInterface_MediaImage_Fragment | FragmentMediaInterface_MediaStanfordGalleryImage_Fragment | FragmentMediaInterface_MediaVideo_Fragment;

export type FragmentMediaFileFragment = { __typename: 'MediaFile', id: string, name: string, mediaFile: { __typename?: 'File', url: string } };

export type FragmentMediaEmbeddableFragment = { __typename: 'MediaEmbeddable', mediaEmbeddableCode?: string | null, mediaEmbeddableOembed?: string | null, id: string, name: string };

export type FragmentMediaGoogleFormFragment = { __typename: 'MediaGoogleForm', mediaGoogleForm: string, id: string, name: string };

export type FragmentMediaImageFragment = { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } };

export type FragmentMediaStanfordGalleryImageFragment = { __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null };

export type FragmentMediaVideoFragment = { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string };

type FragmentMediaUnion_MediaEmbeddable_Fragment = { __typename: 'MediaEmbeddable', mediaEmbeddableCode?: string | null, mediaEmbeddableOembed?: string | null, id: string, name: string };

type FragmentMediaUnion_MediaFile_Fragment = { __typename: 'MediaFile', id: string, name: string, mediaFile: { __typename?: 'File', url: string } };

type FragmentMediaUnion_MediaGoogleForm_Fragment = { __typename: 'MediaGoogleForm', mediaGoogleForm: string, id: string, name: string };

type FragmentMediaUnion_MediaImage_Fragment = { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } };

type FragmentMediaUnion_MediaStanfordGalleryImage_Fragment = { __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null };

type FragmentMediaUnion_MediaVideo_Fragment = { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string };

export type FragmentMediaUnionFragment = FragmentMediaUnion_MediaEmbeddable_Fragment | FragmentMediaUnion_MediaFile_Fragment | FragmentMediaUnion_MediaGoogleForm_Fragment | FragmentMediaUnion_MediaImage_Fragment | FragmentMediaUnion_MediaStanfordGalleryImage_Fragment | FragmentMediaUnion_MediaVideo_Fragment;

export type FragmentDateTimeFragment = { __typename?: 'DateTime', timezone: any, time: any };

export type FragmentSmartDateTypeFragment = { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null };

export type FragmentAddressTypeFragment = { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null };

type FragmentNodeInterface_NodeStanfordCourse_Fragment = { __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordEvent_Fragment = { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordEventSeries_Fragment = { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordNews_Fragment = { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordPage_Fragment = { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordPerson_Fragment = { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordPolicy_Fragment = { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeStanfordPublication_Fragment = { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeSulLibrary_Fragment = { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeInterface_NodeSulStudyPlace_Fragment = { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeInterfaceFragment = FragmentNodeInterface_NodeStanfordCourse_Fragment | FragmentNodeInterface_NodeStanfordEvent_Fragment | FragmentNodeInterface_NodeStanfordEventSeries_Fragment | FragmentNodeInterface_NodeStanfordNews_Fragment | FragmentNodeInterface_NodeStanfordPage_Fragment | FragmentNodeInterface_NodeStanfordPerson_Fragment | FragmentNodeInterface_NodeStanfordPolicy_Fragment | FragmentNodeInterface_NodeStanfordPublication_Fragment | FragmentNodeInterface_NodeSulLibrary_Fragment | FragmentNodeInterface_NodeSulStudyPlace_Fragment;

export type FragmentNodeSulLibraryFragment = { __typename: 'NodeSulLibrary', suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeSulStudyPlaceFragment = { __typename: 'NodeSulStudyPlace', sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPageFragment = { __typename: 'NodeStanfordPage', suPageDescription?: string | null, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suBasicPageType?: Array<{ __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null } | null, suPageComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordCourseFragment = { __typename: 'NodeStanfordCourse', suCourseAcademicYear?: string | null, suCourseCode?: string | null, suCourseId?: number | null, suCourseInstructors?: Array<string> | null, suCourseSectionUnits?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suCourseLink: { __typename?: 'Link', url?: string | null, title?: string | null }, suCourseQuarters?: Array<{ __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, suCourseTags?: Array<{ __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordEventFragment = { __typename: 'NodeStanfordEvent', suEventAltLoc?: string | null, suEventContactInfo?: string | null, suEventDek?: string | null, suEventEmail?: any | null, suEventSponsor?: Array<string> | null, suEventSubheadline?: string | null, suEventTelephone?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suEventAudience?: Array<{ __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventGroups?: Array<{ __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventKeywords?: Array<{ __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSchedule?: Array<{ __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSubject?: Array<{ __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordEventSeriesFragment = { __typename: 'NodeStanfordEventSeries', suEventSeriesDek?: string | null, suEventSeriesSubheadline?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventSeriesEvent?: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suEventSeriesType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordNewsFragment = { __typename: 'NodeStanfordNews', suNewsBannerMediaCaption?: string | null, suNewsByline?: string | null, suNewsDek?: string | null, suNewsHideSocial?: boolean | null, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suNewsComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPersonFragment = { __typename: 'NodeStanfordPerson', sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, suPersonAcademicAppt?: string | null, suPersonAdminAppts?: Array<string> | null, suPersonEducation?: Array<string> | null, suPersonEmail?: any | null, suPersonFax?: string | null, suPersonFirstName: string, suPersonFullTitle?: string | null, suPersonLastName: string, suPersonLocationName?: string | null, suPersonMailCode?: string | null, suPersonMobilePhone?: string | null, suPersonPronouns?: string | null, suPersonResearchInterests?: Array<string> | null, suPersonShortTitle?: string | null, suPersonTelephone?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPersonAffiliations?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPersonLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonLocationAddress?: { __typename?: 'Text', processed?: any | null } | null, suPersonMapUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonProfileLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonScholarlyInterests?: { __typename?: 'Text', processed?: any | null } | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPolicyFragment = { __typename: 'NodeStanfordPolicy', suPolicyAuthority?: string | null, suPolicyAutoPrefix?: boolean | null, suPolicyChapter?: string | null, suPolicyPolicyNum?: string | null, suPolicySubchapter?: string | null, suPolicyTitle: string, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPolicyChangelog?: Array<{ __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPolicyEffective?: { __typename?: 'DateTime', timezone: any, time: any } | null, suPolicyRelated?: Array<{ __typename?: 'NodeStanfordPolicy', id: string, path?: string | null }> | null, suPolicyUpdated?: { __typename?: 'DateTime', timezone: any, time: any } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPublicationFragment = { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPublicationAuthorRef?: Array<{ __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPublicationComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPublicationCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPublicationImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeUnion_NodeStanfordCourse_Fragment = { __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, suCourseCode?: string | null, suCourseId?: number | null, suCourseInstructors?: Array<string> | null, suCourseSectionUnits?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suCourseLink: { __typename?: 'Link', url?: string | null, title?: string | null }, suCourseQuarters?: Array<{ __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, suCourseTags?: Array<{ __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeUnion_NodeStanfordEvent_Fragment = { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventAltLoc?: string | null, suEventContactInfo?: string | null, suEventDek?: string | null, suEventEmail?: any | null, suEventSponsor?: Array<string> | null, suEventSubheadline?: string | null, suEventTelephone?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suEventAudience?: Array<{ __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventGroups?: Array<{ __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventKeywords?: Array<{ __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSchedule?: Array<{ __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSubject?: Array<{ __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeUnion_NodeStanfordEventSeries_Fragment = { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, suEventSeriesSubheadline?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suEventSeriesComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventSeriesEvent?: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suEventSeriesType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeUnion_NodeStanfordNews_Fragment = { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsBannerMediaCaption?: string | null, suNewsByline?: string | null, suNewsDek?: string | null, suNewsHideSocial?: boolean | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suNewsComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null };

type FragmentNodeUnion_NodeStanfordPage_Fragment = { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suBasicPageType?: Array<{ __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null } | null, suPageComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null };

type FragmentNodeUnion_NodeStanfordPerson_Fragment = { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, suPersonAcademicAppt?: string | null, suPersonAdminAppts?: Array<string> | null, suPersonEducation?: Array<string> | null, suPersonEmail?: any | null, suPersonFax?: string | null, suPersonFirstName: string, suPersonFullTitle?: string | null, suPersonLastName: string, suPersonLocationName?: string | null, suPersonMailCode?: string | null, suPersonMobilePhone?: string | null, suPersonPronouns?: string | null, suPersonResearchInterests?: Array<string> | null, suPersonShortTitle?: string | null, suPersonTelephone?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPersonAffiliations?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPersonLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonLocationAddress?: { __typename?: 'Text', processed?: any | null } | null, suPersonMapUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonProfileLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonScholarlyInterests?: { __typename?: 'Text', processed?: any | null } | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeUnion_NodeStanfordPolicy_Fragment = { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPolicyAuthority?: string | null, suPolicyAutoPrefix?: boolean | null, suPolicyChapter?: string | null, suPolicyPolicyNum?: string | null, suPolicySubchapter?: string | null, suPolicyTitle: string, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPolicyChangelog?: Array<{ __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPolicyEffective?: { __typename?: 'DateTime', timezone: any, time: any } | null, suPolicyRelated?: Array<{ __typename?: 'NodeStanfordPolicy', id: string, path?: string | null }> | null, suPolicyUpdated?: { __typename?: 'DateTime', timezone: any, time: any } | null };

type FragmentNodeUnion_NodeStanfordPublication_Fragment = { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationAuthorRef?: Array<{ __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPublicationComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPublicationCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPublicationImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeUnion_NodeSulLibrary_Fragment = { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null };

type FragmentNodeUnion_NodeSulStudyPlace_Fragment = { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentNodeUnionFragment = FragmentNodeUnion_NodeStanfordCourse_Fragment | FragmentNodeUnion_NodeStanfordEvent_Fragment | FragmentNodeUnion_NodeStanfordEventSeries_Fragment | FragmentNodeUnion_NodeStanfordNews_Fragment | FragmentNodeUnion_NodeStanfordPage_Fragment | FragmentNodeUnion_NodeStanfordPerson_Fragment | FragmentNodeUnion_NodeStanfordPolicy_Fragment | FragmentNodeUnion_NodeStanfordPublication_Fragment | FragmentNodeUnion_NodeSulLibrary_Fragment | FragmentNodeUnion_NodeSulStudyPlace_Fragment;

export type FragmentNodeSulLibraryTeaserFragment = { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeSulStudyPlaceTeaserFragment = { __typename: 'NodeSulStudyPlace', sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordCourseTeaserFragment = { __typename: 'NodeStanfordCourse', suCourseAcademicYear?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordEventTeaserFragment = { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordEventSeriesTeaserFragment = { __typename: 'NodeStanfordEventSeries', suEventSeriesDek?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordNewsTeaserFragment = { __typename: 'NodeStanfordNews', suNewsDek?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename?: 'MediaVideo' } | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPageTeaserFragment = { __typename: 'NodeStanfordPage', suPageDescription?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename?: 'ParagraphSulHomeBanner' } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPersonTeaserFragment = { __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPolicyTeaserFragment = { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

export type FragmentNodeStanfordPublicationTeaserFragment = { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeTeaserUnion_NodeStanfordCourse_Fragment = { __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null };

type FragmentNodeTeaserUnion_NodeStanfordEvent_Fragment = { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

type FragmentNodeTeaserUnion_NodeStanfordEventSeries_Fragment = { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } };

type FragmentNodeTeaserUnion_NodeStanfordNews_Fragment = { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsDek?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename?: 'MediaVideo' } | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

type FragmentNodeTeaserUnion_NodeStanfordPage_Fragment = { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename?: 'ParagraphSulHomeBanner' } | null };

type FragmentNodeTeaserUnion_NodeStanfordPerson_Fragment = { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeTeaserUnion_NodeStanfordPolicy_Fragment = { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null };

type FragmentNodeTeaserUnion_NodeStanfordPublication_Fragment = { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null };

type FragmentNodeTeaserUnion_NodeSulLibrary_Fragment = { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

type FragmentNodeTeaserUnion_NodeSulStudyPlace_Fragment = { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null };

export type FragmentNodeTeaserUnionFragment = FragmentNodeTeaserUnion_NodeStanfordCourse_Fragment | FragmentNodeTeaserUnion_NodeStanfordEvent_Fragment | FragmentNodeTeaserUnion_NodeStanfordEventSeries_Fragment | FragmentNodeTeaserUnion_NodeStanfordNews_Fragment | FragmentNodeTeaserUnion_NodeStanfordPage_Fragment | FragmentNodeTeaserUnion_NodeStanfordPerson_Fragment | FragmentNodeTeaserUnion_NodeStanfordPolicy_Fragment | FragmentNodeTeaserUnion_NodeStanfordPublication_Fragment | FragmentNodeTeaserUnion_NodeSulLibrary_Fragment | FragmentNodeTeaserUnion_NodeSulStudyPlace_Fragment;

type FragmentParagraphInterface_ParagraphCollection_Fragment = { __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphCollectionCard_Fragment = { __typename: 'ParagraphCollectionCard', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphLayout_Fragment = { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordAccordion_Fragment = { __typename: 'ParagraphStanfordAccordion', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordBanner_Fragment = { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordCard_Fragment = { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordEntity_Fragment = { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordFaq_Fragment = { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordGallery_Fragment = { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordList_Fragment = { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordMediaCaption_Fragment = { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordPageTitleBanner_Fragment = { __typename: 'ParagraphStanfordPageTitleBanner', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordPersonCtum_Fragment = { __typename: 'ParagraphStanfordPersonCtum', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordSchedule_Fragment = { __typename: 'ParagraphStanfordSchedule', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordSpacer_Fragment = { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphStanfordWysiwyg_Fragment = { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulButton_Fragment = { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulContactCard_Fragment = { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulFeatCollection_Fragment = { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulHomeBanner_Fragment = { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulHomeImage_Fragment = { __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulLibguide_Fragment = { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphInterface_ParagraphSulLocationHour_Fragment = { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean };

export type FragmentParagraphInterfaceFragment = FragmentParagraphInterface_ParagraphCollection_Fragment | FragmentParagraphInterface_ParagraphCollectionCard_Fragment | FragmentParagraphInterface_ParagraphLayout_Fragment | FragmentParagraphInterface_ParagraphStanfordAccordion_Fragment | FragmentParagraphInterface_ParagraphStanfordBanner_Fragment | FragmentParagraphInterface_ParagraphStanfordCard_Fragment | FragmentParagraphInterface_ParagraphStanfordEntity_Fragment | FragmentParagraphInterface_ParagraphStanfordFaq_Fragment | FragmentParagraphInterface_ParagraphStanfordGallery_Fragment | FragmentParagraphInterface_ParagraphStanfordList_Fragment | FragmentParagraphInterface_ParagraphStanfordMediaCaption_Fragment | FragmentParagraphInterface_ParagraphStanfordPageTitleBanner_Fragment | FragmentParagraphInterface_ParagraphStanfordPersonCtum_Fragment | FragmentParagraphInterface_ParagraphStanfordSchedule_Fragment | FragmentParagraphInterface_ParagraphStanfordSpacer_Fragment | FragmentParagraphInterface_ParagraphStanfordWysiwyg_Fragment | FragmentParagraphInterface_ParagraphSulButton_Fragment | FragmentParagraphInterface_ParagraphSulContactCard_Fragment | FragmentParagraphInterface_ParagraphSulFeatCollection_Fragment | FragmentParagraphInterface_ParagraphSulHomeBanner_Fragment | FragmentParagraphInterface_ParagraphSulHomeImage_Fragment | FragmentParagraphInterface_ParagraphSulLibguide_Fragment | FragmentParagraphInterface_ParagraphSulLocationHour_Fragment;

export type FragmentParagraphSulHomeImageFragment = { __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphSulHomeBannerFragment = { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null };

export type FragmentParagraphSulLocationHourFragment = { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphCollectionFragment = { __typename: 'ParagraphCollection', sulCollectionHeading?: string | null, id: string, behaviors?: string | null, status: boolean, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null };

export type FragmentParagraphCollectionCardFragment = { __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null };

export type FragmentParagraphSulButtonFragment = { __typename: 'ParagraphSulButton', sulButtonHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } };

export type FragmentParagraphSulContactCardFragment = { __typename: 'ParagraphSulContactCard', sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, id: string, behaviors?: string | null, status: boolean, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

export type FragmentParagraphSulFeatCollectionFragment = { __typename: 'ParagraphSulFeatCollection', sulCollectionHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

export type FragmentParagraphSulLibguideFragment = { __typename: 'ParagraphSulLibguide', sulLibguideHeadline?: string | null, sulLibguideId: number, id: string, behaviors?: string | null, status: boolean, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphStanfordAccordionFragment = { __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } };

export type FragmentParagraphStanfordBannerFragment = { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null };

export type FragmentParagraphStanfordCardFragment = { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null };

export type FragmentParagraphStanfordEntityFragment = { __typename: 'ParagraphStanfordEntity', suEntityHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null };

export type FragmentParagraphStanfordGalleryFragment = { __typename: 'ParagraphStanfordGallery', suGalleryHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null };

export type FragmentParagraphStanfordListFragment = { __typename: 'ParagraphStanfordList', suListHeadline: string, id: string, behaviors?: string | null, status: boolean, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null };

export type FragmentParagraphStanfordMediaCaptionFragment = { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphStanfordPersonCtumFragment = { __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null };

export type FragmentParagraphStanfordScheduleFragment = { __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null };

export type FragmentParagraphLayoutFragment = { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean };

export type FragmentParagraphStanfordSpacerFragment = { __typename: 'ParagraphStanfordSpacer', suSpacerSize?: string | null, id: string, behaviors?: string | null, status: boolean };

export type FragmentParagraphStanfordWysiwygFragment = { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphStanfordPageTitleBannerFragment = { __typename: 'ParagraphStanfordPageTitleBanner', id: string, behaviors?: string | null, status: boolean, suTitleBannerImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } };

export type FragmentParagraphStanfordFaqFragment = { __typename: 'ParagraphStanfordFaq', suFaqHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null };

type FragmentParagraphUnion_ParagraphCollection_Fragment = { __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null };

type FragmentParagraphUnion_ParagraphCollectionCard_Fragment = { __typename: 'ParagraphCollectionCard', id: string, behaviors?: string | null, status: boolean, sulCardInfo: string, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null };

type FragmentParagraphUnion_ParagraphLayout_Fragment = { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphUnion_ParagraphStanfordAccordion_Fragment = { __typename: 'ParagraphStanfordAccordion', id: string, behaviors?: string | null, status: boolean, suAccordionTitle: string, suAccordionBody: { __typename?: 'Text', processed?: any | null } };

type FragmentParagraphUnion_ParagraphStanfordBanner_Fragment = { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null };

type FragmentParagraphUnion_ParagraphStanfordCard_Fragment = { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null };

type FragmentParagraphUnion_ParagraphStanfordEntity_Fragment = { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null };

type FragmentParagraphUnion_ParagraphStanfordFaq_Fragment = { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null };

type FragmentParagraphUnion_ParagraphStanfordGallery_Fragment = { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null };

type FragmentParagraphUnion_ParagraphStanfordList_Fragment = { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null };

type FragmentParagraphUnion_ParagraphStanfordMediaCaption_Fragment = { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null };

type FragmentParagraphUnion_ParagraphStanfordPageTitleBanner_Fragment = { __typename: 'ParagraphStanfordPageTitleBanner', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphUnion_ParagraphStanfordPersonCtum_Fragment = { __typename: 'ParagraphStanfordPersonCtum', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphUnion_ParagraphStanfordSchedule_Fragment = { __typename: 'ParagraphStanfordSchedule', id: string, behaviors?: string | null, status: boolean };

type FragmentParagraphUnion_ParagraphStanfordSpacer_Fragment = { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null };

type FragmentParagraphUnion_ParagraphStanfordWysiwyg_Fragment = { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null };

type FragmentParagraphUnion_ParagraphSulButton_Fragment = { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } };

type FragmentParagraphUnion_ParagraphSulContactCard_Fragment = { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

type FragmentParagraphUnion_ParagraphSulFeatCollection_Fragment = { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null };

type FragmentParagraphUnion_ParagraphSulHomeBanner_Fragment = { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null };

type FragmentParagraphUnion_ParagraphSulHomeImage_Fragment = { __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null };

type FragmentParagraphUnion_ParagraphSulLibguide_Fragment = { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null };

type FragmentParagraphUnion_ParagraphSulLocationHour_Fragment = { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null };

export type FragmentParagraphUnionFragment = FragmentParagraphUnion_ParagraphCollection_Fragment | FragmentParagraphUnion_ParagraphCollectionCard_Fragment | FragmentParagraphUnion_ParagraphLayout_Fragment | FragmentParagraphUnion_ParagraphStanfordAccordion_Fragment | FragmentParagraphUnion_ParagraphStanfordBanner_Fragment | FragmentParagraphUnion_ParagraphStanfordCard_Fragment | FragmentParagraphUnion_ParagraphStanfordEntity_Fragment | FragmentParagraphUnion_ParagraphStanfordFaq_Fragment | FragmentParagraphUnion_ParagraphStanfordGallery_Fragment | FragmentParagraphUnion_ParagraphStanfordList_Fragment | FragmentParagraphUnion_ParagraphStanfordMediaCaption_Fragment | FragmentParagraphUnion_ParagraphStanfordPageTitleBanner_Fragment | FragmentParagraphUnion_ParagraphStanfordPersonCtum_Fragment | FragmentParagraphUnion_ParagraphStanfordSchedule_Fragment | FragmentParagraphUnion_ParagraphStanfordSpacer_Fragment | FragmentParagraphUnion_ParagraphStanfordWysiwyg_Fragment | FragmentParagraphUnion_ParagraphSulButton_Fragment | FragmentParagraphUnion_ParagraphSulContactCard_Fragment | FragmentParagraphUnion_ParagraphSulFeatCollection_Fragment | FragmentParagraphUnion_ParagraphSulHomeBanner_Fragment | FragmentParagraphUnion_ParagraphSulHomeImage_Fragment | FragmentParagraphUnion_ParagraphSulLibguide_Fragment | FragmentParagraphUnion_ParagraphSulLocationHour_Fragment;

export type FragmentMenuLinkFragment = { __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean };

export type MenuQueryVariables = Exact<{
  name?: InputMaybe<MenuAvailable>;
}>;


export type MenuQuery = { __typename?: 'Query', menu?: { __typename?: 'Menu', items: Array<{ __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean, children: Array<{ __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean, children: Array<{ __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean, children: Array<{ __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean, children: Array<{ __typename?: 'MenuItem', url?: string | null, title: string, id: string, expanded: boolean }> }> }> }> }> } | null };

export type RouteQueryVariables = Exact<{
  path: Scalars['String']['input'];
  teaser?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type RouteQuery = { __typename?: 'Query', route?: { __typename: 'RouteExternal' } | { __typename: 'RouteInternal', entity?: { __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, suCourseCode?: string | null, suCourseId?: number | null, suCourseInstructors?: Array<string> | null, suCourseSectionUnits?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suCourseLink: { __typename?: 'Link', url?: string | null, title?: string | null }, suCourseQuarters?: Array<{ __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, suCourseTags?: Array<{ __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventAltLoc?: string | null, suEventContactInfo?: string | null, suEventDek?: string | null, suEventEmail?: any | null, suEventSponsor?: Array<string> | null, suEventSubheadline?: string | null, suEventTelephone?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suEventAudience?: Array<{ __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventGroups?: Array<{ __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventKeywords?: Array<{ __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSchedule?: Array<{ __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSubject?: Array<{ __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, suEventSeriesSubheadline?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suEventSeriesComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventSeriesEvent?: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suEventSeriesType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsBannerMediaCaption?: string | null, suNewsByline?: string | null, suNewsDek?: string | null, suNewsHideSocial?: boolean | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suNewsComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suBasicPageType?: Array<{ __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null } | null, suPageComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, suPersonAcademicAppt?: string | null, suPersonAdminAppts?: Array<string> | null, suPersonEducation?: Array<string> | null, suPersonEmail?: any | null, suPersonFax?: string | null, suPersonFirstName: string, suPersonFullTitle?: string | null, suPersonLastName: string, suPersonLocationName?: string | null, suPersonMailCode?: string | null, suPersonMobilePhone?: string | null, suPersonPronouns?: string | null, suPersonResearchInterests?: Array<string> | null, suPersonShortTitle?: string | null, suPersonTelephone?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPersonAffiliations?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPersonLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonLocationAddress?: { __typename?: 'Text', processed?: any | null } | null, suPersonMapUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonProfileLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonScholarlyInterests?: { __typename?: 'Text', processed?: any | null } | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPolicyAuthority?: string | null, suPolicyAutoPrefix?: boolean | null, suPolicyChapter?: string | null, suPolicyPolicyNum?: string | null, suPolicySubchapter?: string | null, suPolicyTitle: string, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPolicyChangelog?: Array<{ __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPolicyEffective?: { __typename?: 'DateTime', timezone: any, time: any } | null, suPolicyRelated?: Array<{ __typename?: 'NodeStanfordPolicy', id: string, path?: string | null }> | null, suPolicyUpdated?: { __typename?: 'DateTime', timezone: any, time: any } | null } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationAuthorRef?: Array<{ __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPublicationComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPublicationCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPublicationImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename?: 'TermBasicPageType' } | { __typename?: 'TermStanfordEventType' } | { __typename?: 'TermStanfordNewsTopic' } | { __typename?: 'TermStanfordPersonType' } | { __typename?: 'TermStanfordPublicationTopic' } | { __typename?: 'TermSuCourseSubject' } | null } | { __typename: 'RouteRedirect', url: string, internal: boolean, status: number, redirect: boolean } | null };

export type FragmentViewPageInfoFragment = { __typename?: 'ViewPageInfo', page: number, total: number };

export type SulStudyPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type SulStudyPlacesQuery = { __typename?: 'Query', sulStudyPlaces?: { __typename?: 'SulStudyPlacesResult', results: Array<{ __typename?: 'NodeStanfordCourse' } | { __typename?: 'NodeStanfordEvent' } | { __typename?: 'NodeStanfordEventSeries' } | { __typename?: 'NodeStanfordNews' } | { __typename?: 'NodeStanfordPage' } | { __typename?: 'NodeStanfordPerson' } | { __typename?: 'NodeStanfordPolicy' } | { __typename?: 'NodeStanfordPublication' } | { __typename?: 'NodeSulLibrary' } | { __typename: 'NodeSulStudyPlace', sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type SulBranchLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type SulBranchLocationsQuery = { __typename?: 'Query', sulBranchLocations?: { __typename?: 'SulBranchLocationsResult', results: Array<{ __typename?: 'NodeStanfordCourse' } | { __typename?: 'NodeStanfordEvent' } | { __typename?: 'NodeStanfordEventSeries' } | { __typename?: 'NodeStanfordNews' } | { __typename?: 'NodeStanfordPage' } | { __typename?: 'NodeStanfordPerson' } | { __typename?: 'NodeStanfordPolicy' } | { __typename?: 'NodeStanfordPublication' } | { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename?: 'NodeSulStudyPlace' }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type SulEventsQueryVariables = Exact<{
  contextualFilters?: InputMaybe<SulEventsContextualFilterInput>;
  sortDir?: InputMaybe<SortDirection>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SulEventsQuery = { __typename?: 'Query', sulEvents?: { __typename?: 'SulEventsResult', results: Array<{ __typename?: 'NodeStanfordCourse' } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename?: 'NodeStanfordEventSeries' } | { __typename?: 'NodeStanfordNews' } | { __typename?: 'NodeStanfordPage' } | { __typename?: 'NodeStanfordPerson' } | { __typename?: 'NodeStanfordPolicy' } | { __typename?: 'NodeStanfordPublication' } | { __typename?: 'NodeSulLibrary' } | { __typename?: 'NodeSulStudyPlace' }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type SulEventsSharedTagsQueryVariables = Exact<{
  contextualFilters?: InputMaybe<SulEventsSharedTagsContextualFilterInput>;
  sortDir?: InputMaybe<SortDirection>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SulEventsSharedTagsQuery = { __typename?: 'Query', sulEventsSharedTags?: { __typename?: 'SulEventsSharedTagsResult', results: Array<{ __typename?: 'NodeStanfordCourse' } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename?: 'NodeStanfordEventSeries' } | { __typename?: 'NodeStanfordNews' } | { __typename?: 'NodeStanfordPage' } | { __typename?: 'NodeStanfordPerson' } | { __typename?: 'NodeStanfordPolicy' } | { __typename?: 'NodeStanfordPublication' } | { __typename?: 'NodeSulLibrary' } | { __typename?: 'NodeSulStudyPlace' }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type StanfordBasicPagesQueryVariables = Exact<{
  contextualFilters?: InputMaybe<StanfordBasicPagesContextualFilterInput>;
  sortKey?: InputMaybe<StanfordBasicPagesSortKeys>;
  sortDir?: InputMaybe<SortDirection>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StanfordBasicPagesQuery = { __typename?: 'Query', stanfordBasicPages?: { __typename?: 'StanfordBasicPagesResult', results: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename?: 'ParagraphSulHomeBanner' } | null } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type StanfordNewsQueryVariables = Exact<{
  contextualFilters?: InputMaybe<StanfordNewsContextualFilterInput>;
  filter?: InputMaybe<StanfordNewsFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StanfordNewsQuery = { __typename?: 'Query', stanfordNews?: { __typename?: 'StanfordNewsResult', results: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsDek?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename?: 'MediaVideo' } | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type StanfordPersonQueryVariables = Exact<{
  contextualFilters?: InputMaybe<StanfordPersonContextualFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StanfordPersonQuery = { __typename?: 'Query', stanfordPerson?: { __typename?: 'StanfordPersonResult', results: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type StanfordSharedTagsQueryVariables = Exact<{
  contextualFilters?: InputMaybe<StanfordSharedTagsContextualFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StanfordSharedTagsQuery = { __typename?: 'Query', stanfordSharedTags?: { __typename?: 'StanfordSharedTagsResult', results: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsDek?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename?: 'MediaVideo' } | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename?: 'ParagraphSulHomeBanner' } | null } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'NodeSulStudyPlace', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulStudyLibcalId?: number | null, sulStudyRoomNumber?: string | null, sulStudyRoomDonorName?: string | null, sulStudyHours?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulStudyFeatures?: Array<{ __typename: 'TermSulStudyPlaceFeature', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulStudyCapacity?: { __typename: 'TermStudyPlaceCapacity', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, sulStudyType: { __typename: 'TermSulStudyPlaceType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }, sulStudyBranch: { __typename: 'NodeSulLibrary', suLibraryHours?: string | null, suLibraryPhone?: any | null, suLibraryEmail?: any | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }, sulStudyAdditionalInfo?: { __typename?: 'Text', processed?: any | null } | null, sulStudyImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };

export type SearchQueryVariables = Exact<{
  filter?: InputMaybe<SearchFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResult', results: Array<{ __typename: 'NodeStanfordCourse', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suCourseAcademicYear?: string | null, suCourseCode?: string | null, suCourseId?: number | null, suCourseInstructors?: Array<string> | null, suCourseSectionUnits?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suCourseLink: { __typename?: 'Link', url?: string | null, title?: string | null }, suCourseQuarters?: Array<{ __typename: 'TermSuCourseQuarter', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suCourseSubject?: { __typename: 'TermSuCourseSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null } | null, suCourseTags?: Array<{ __typename: 'TermSuCourseTag', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventAltLoc?: string | null, suEventContactInfo?: string | null, suEventDek?: string | null, suEventEmail?: any | null, suEventSponsor?: Array<string> | null, suEventSubheadline?: string | null, suEventTelephone?: any | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suEventAudience?: Array<{ __typename: 'TermEventAudience', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventGroups?: Array<{ __typename: 'TermStanfordEventGroup', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventKeywords?: Array<{ __typename: 'TermStanfordEventKeyword', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSchedule?: Array<{ __typename: 'ParagraphStanfordSchedule', suScheduleHeadline?: string | null, id: string, behaviors?: string | null, status: boolean, suScheduleDescription?: { __typename?: 'Text', processed?: any | null } | null, suScheduleDateTime?: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null } | null, suScheduleLocation?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suScheduleUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suScheduleSpeaker?: Array<{ __typename: 'ParagraphStanfordPersonCtum', suPersonCtaName?: string | null, suPersonCtaTitle?: string | null, id: string, behaviors?: string | null, status: boolean, suPersonCtaLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonCtaImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null }> | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventSubject?: Array<{ __typename: 'TermStanfordEventSubject', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordEventSeries', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suEventSeriesDek?: string | null, suEventSeriesSubheadline?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suEventSeriesComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suEventSeriesEvent?: Array<{ __typename: 'NodeStanfordEvent', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulEventImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suEventDateTime: { __typename?: 'SmartDateType', value: any, end_value: any, timezone?: string | null, rrule_index?: number | null, rrule?: number | null }, suEventType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suEventSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEventMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suEventSeriesType?: Array<{ __typename: 'TermStanfordEventType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordNews', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suNewsBannerMediaCaption?: string | null, suNewsByline?: string | null, suNewsDek?: string | null, suNewsHideSocial?: boolean | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suNewsBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suNewsComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suNewsFeaturedMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suNewsPublishingDate?: { __typename?: 'DateTime', timezone: any, time: any } | null, suNewsSource?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suNewsTopics?: Array<{ __typename: 'TermStanfordNewsTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPage', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPageDescription?: string | null, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, suBasicPageType?: Array<{ __typename: 'TermBasicPageType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, suPageBanner?: { __typename: 'ParagraphStanfordBanner', suBannerHeader?: string | null, suBannerSupHeader?: string | null, id: string, behaviors?: string | null, status: boolean, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphSulHomeBanner', id: string, behaviors?: string | null, status: boolean, sulHomeImages?: Array<{ __typename: 'ParagraphSulHomeImage', id: string, behaviors?: string | null, status: boolean, sulHomeImage: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } }, sulHomeImageCredits?: { __typename?: 'Text', processed?: any | null } | null }> | null } | null, suPageComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulLocationHour', id: string, behaviors?: string | null, status: boolean, sulLocHoursAlert?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPageImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null } | { __typename: 'NodeStanfordPerson', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, suPersonAcademicAppt?: string | null, suPersonAdminAppts?: Array<string> | null, suPersonEducation?: Array<string> | null, suPersonEmail?: any | null, suPersonFax?: string | null, suPersonFirstName: string, suPersonFullTitle?: string | null, suPersonLastName: string, suPersonLocationName?: string | null, suPersonMailCode?: string | null, suPersonMobilePhone?: string | null, suPersonPronouns?: string | null, suPersonResearchInterests?: Array<string> | null, suPersonShortTitle?: string | null, suPersonTelephone?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPersonAffiliations?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonComponents?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPersonLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null, suPersonLocationAddress?: { __typename?: 'Text', processed?: any | null } | null, suPersonMapUrl?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonProfileLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonScholarlyInterests?: { __typename?: 'Text', processed?: any | null } | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeStanfordPolicy', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPolicyAuthority?: string | null, suPolicyAutoPrefix?: boolean | null, suPolicyChapter?: string | null, suPolicyPolicyNum?: string | null, suPolicySubchapter?: string | null, suPolicyTitle: string, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, body?: { __typename?: 'TextSummary', processed?: any | null, summary?: any | null } | null, suPolicyChangelog?: Array<{ __typename: 'SuPolicyLog', id: string, suPolicyNotes: string, suPolicyPublic?: boolean | null, suPolicyTitle: string, suPolicyDate: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPolicyEffective?: { __typename?: 'DateTime', timezone: any, time: any } | null, suPolicyRelated?: Array<{ __typename?: 'NodeStanfordPolicy', id: string, path?: string | null }> | null, suPolicyUpdated?: { __typename?: 'DateTime', timezone: any, time: any } | null } | { __typename: 'NodeStanfordPublication', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, suPublicationAuthorRef?: Array<{ __typename: 'NodeStanfordPerson', suPersonFullTitle?: string | null, suPersonShortTitle?: string | null, suPersonEmail?: any | null, sulPersonLibguideId?: number | null, sulPersonLibcalId?: number | null, id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suPersonPhoto?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPersonResearch?: Array<{ __typename?: 'Text', processed?: any | null }> | null, suPersonTypeGroup?: Array<{ __typename: 'TermStanfordPersonType', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any } }> | null, suPublicationComponents?: Array<{ __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordFaq', id: string, behaviors?: string | null, status: boolean, suFaqHeadline?: string | null, created: { __typename?: 'DateTime', timezone: any, time: any }, suFaqDescription?: { __typename?: 'Text', processed?: any | null } | null, suFaqQuestions?: Array<{ __typename: 'ParagraphStanfordAccordion', suAccordionTitle: string, id: string, behaviors?: string | null, status: boolean, suAccordionBody: { __typename?: 'Text', processed?: any | null } }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null }> | null, suPublicationCta?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suPublicationImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suPublicationTopics?: Array<{ __typename: 'TermStanfordPublicationTopic', id: string, name: string, path?: string | null, weight: number, parent?: { __typename?: 'TermBasicPageType', id: string } | { __typename?: 'TermEventAudience', id: string } | { __typename?: 'TermStanfordEventGroup', id: string } | { __typename?: 'TermStanfordEventKeyword', id: string } | { __typename?: 'TermStanfordEventSubject', id: string } | { __typename?: 'TermStanfordEventType', id: string } | { __typename?: 'TermStanfordNewsTopic', id: string } | { __typename?: 'TermStanfordPersonType', id: string } | { __typename?: 'TermStanfordPublicationTopic', id: string } | { __typename?: 'TermStudyPlaceCapacity', id: string } | { __typename?: 'TermSuCourseQuarter', id: string } | { __typename?: 'TermSuCourseSubject', id: string } | { __typename?: 'TermSuCourseTag', id: string } | { __typename?: 'TermSuSharedTag', id: string } | { __typename?: 'TermSulStudyPlaceFeature', id: string } | { __typename?: 'TermSulStudyPlaceType', id: string } | null }> | null } | { __typename: 'NodeSulLibrary', id: string, title: string, status: boolean, path?: string | null, sticky: boolean, suLibraryEmail?: any | null, suLibraryHours?: string | null, suLibraryPhone?: any | null, sulLibraryType: string, sulRelLinksHeading?: string | null, changed: { __typename?: 'DateTime', timezone: any, time: any }, created: { __typename?: 'DateTime', timezone: any, time: any }, layoutSelection?: { __typename?: 'LayoutLibrary', id: string } | null, sulLibraryExtUrl?: { __typename?: 'Link', url?: string | null } | null, suLibraryAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, suLibraryBanner?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryContactImg?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, suLibraryMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suLibraryParagraphs?: Array<{ __typename: 'ParagraphCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeading?: string | null, sulCollectionCard?: Array<{ __typename: 'ParagraphCollectionCard', sulCardInfo: string, id: string, behaviors?: string | null, status: boolean, sulCard?: { __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | null }> | null } | { __typename: 'ParagraphLayout', id: string, behaviors?: string | null, status: boolean } | { __typename: 'ParagraphStanfordBanner', id: string, behaviors?: string | null, status: boolean, suBannerHeader?: string | null, suBannerSupHeader?: string | null, suBannerBody?: { __typename?: 'Text', processed?: any | null } | null, suBannerButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suBannerImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null } | { __typename: 'ParagraphStanfordCard', id: string, behaviors?: string | null, status: boolean, suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null } | { __typename: 'ParagraphStanfordEntity', id: string, behaviors?: string | null, status: boolean, suEntityHeadline?: string | null, suEntityDescription?: { __typename?: 'Text', processed?: any | null } | null, suEntityButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suEntityItem?: Array<{ __typename?: 'NodeStanfordCourse', id: string, path?: string | null } | { __typename?: 'NodeStanfordEvent', id: string, path?: string | null } | { __typename?: 'NodeStanfordEventSeries', id: string, path?: string | null } | { __typename?: 'NodeStanfordNews', id: string, path?: string | null } | { __typename?: 'NodeStanfordPage', id: string, path?: string | null } | { __typename?: 'NodeStanfordPerson', id: string, path?: string | null } | { __typename?: 'NodeStanfordPolicy', id: string, path?: string | null } | { __typename?: 'NodeStanfordPublication', id: string, path?: string | null }> | null } | { __typename: 'ParagraphStanfordGallery', id: string, behaviors?: string | null, status: boolean, suGalleryHeadline?: string | null, suGalleryDescription?: { __typename?: 'Text', processed?: any | null } | null, suGalleryButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suGalleryImages?: Array<{ __typename: 'MediaStanfordGalleryImage', suGalleryCaption?: string | null, id: string, name: string, suGalleryImage?: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } | null }> | null } | { __typename: 'ParagraphStanfordList', id: string, behaviors?: string | null, status: boolean, suListHeadline: string, suListDescription?: { __typename?: 'Text', processed?: any | null } | null, suListButton?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suListView?: { __typename?: 'ViewReference', view: string, display: string, contextualFilter?: Array<string> | null, pageSize?: number | null } | null } | { __typename: 'ParagraphStanfordMediaCaption', id: string, behaviors?: string | null, status: boolean, suMediaCaptionMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null, suMediaCaptionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suMediaCaptionCaption?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphStanfordSpacer', id: string, behaviors?: string | null, status: boolean, suSpacerSize?: string | null } | { __typename: 'ParagraphStanfordWysiwyg', id: string, behaviors?: string | null, status: boolean, suWysiwygText?: { __typename?: 'Text', processed?: any | null } | null } | { __typename: 'ParagraphSulButton', id: string, behaviors?: string | null, status: boolean, sulButtonHeadline?: string | null, sulButtonLink: { __typename?: 'Link', url?: string | null, title?: string | null } } | { __typename: 'ParagraphSulContactCard', id: string, behaviors?: string | null, status: boolean, sulContactEmail?: any | null, sulContactHours?: string | null, sulContactPhone?: any | null, sulContactTitle?: string | null, sulContactAddress?: { __typename?: 'Address', langcode?: string | null, givenName?: string | null, additionalName?: string | null, familyName?: string | null, organization?: string | null, addressLine1?: string | null, addressLine2?: string | null, postalCode?: string | null, sortingCode?: string | null, dependentLocality?: string | null, locality?: string | null, administrativeArea?: string | null, country?: { __typename?: 'AddressCountry', name?: string | null, code?: string | null } | null } | null, sulContactBranch?: { __typename?: 'NodeSulLibrary', id: string, path?: string | null } | null, sulContactImage?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | null, sulContactLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, sulContactMapLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulFeatCollection', id: string, behaviors?: string | null, status: boolean, sulCollectionHeadline?: string | null, sulCollectionCards: Array<{ __typename: 'ParagraphStanfordCard', suCardHeader?: string | null, suCardSuperHeader?: string | null, sulCardImageCaption?: string | null, id: string, behaviors?: string | null, status: boolean, suCardBody?: { __typename?: 'Text', processed?: any | null } | null, suCardLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null, suCardMedia?: { __typename: 'MediaImage', sulImageCredit?: string | null, id: string, name: string, mediaImage: { __typename?: 'Image', url: string, alt?: string | null, height: number, width: number } } | { __typename: 'MediaVideo', mediaOembedVideo: string, id: string, name: string } | null }>, sulCollectionLink?: { __typename?: 'Link', url?: string | null, title?: string | null } | null } | { __typename: 'ParagraphSulLibguide', id: string, behaviors?: string | null, status: boolean, sulLibguideHeadline?: string | null, sulLibguideId: number, sulLibguideDesc?: { __typename?: 'Text', processed?: any | null } | null }> | null, sulLibraryA11y?: { __typename?: 'Text', processed?: any | null } | null, sulRelLinks?: Array<{ __typename?: 'Link', url?: string | null, title?: string | null }> | null }>, pageInfo: { __typename?: 'ViewPageInfo', page: number, total: number } } | null };
