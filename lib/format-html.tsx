import Link from "next/link";
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps} from "html-react-parser"
import Conditional from "@/components/utils/conditional";
import Image from "next/image";
import {
  DrupalActionLink,
  DrupalLinkBigButton,
  DrupalLinkButton,
  DrupalLinkSecondaryButton
} from "@/components/patterns/link";
import Oembed from "@/components/patterns/oembed";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs);
      nodeProps.className = fixClasses(nodeProps.className ?? '');
      let NodeName: string = domNode.name

      switch (domNode.name) {
        case "a":
          // Error handle for <a> tags without an href.
          if (!nodeProps.href) {
            nodeProps.href = '#';
          }

          if (nodeProps.className.indexOf('su-button--big') > -1) {
            return (
              <DrupalLinkBigButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkBigButton>
            )
          }

          if (nodeProps.className.indexOf('su-button--secondary') > -1) {
            return (
              <DrupalLinkSecondaryButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkSecondaryButton>
            )
          }

          if (nodeProps.className.indexOf('su-button') > -1) {
            return (
              <DrupalLinkButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkButton>
            )
          }

          if (nodeProps.className.indexOf('su-link--action') > -1) {
            return (
              <DrupalActionLink href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalActionLink>
            )
          }

          nodeProps.className += ' hocus:su-underline su-transition-colors hover:su-text-brick-dark hover:su-bg-black-10 focus:su-bg-none focus:su-text-cardinal-red active:su-text-cardinal-red';

          if (nodeProps.href.startsWith('#')) {
            return (
              <a {...nodeProps}>
                {domToReact(domNode.children, options)}
              </a>
            )
          }
          return (
            <Link scroll href={nodeProps.href} {...nodeProps}>
              {domToReact(domNode.children, options)}
            </Link>
          )
        case 'article':
          return cleanMediaMarkup(domNode);

        case 'pre':
          nodeProps.className += ' su-whitespace-normal';
          return <pre {...nodeProps}>{domToReact(domNode.children, options)}</pre>

        case 'figure':
          nodeProps.className += ' su-table su-mb-20';
          delete nodeProps.role;
          return (
            <figure {...nodeProps}>{domToReact(domNode.children, options)}</figure>
          )
        case 'figcaption':
          nodeProps.className += ' su-table-caption su-caption-bottom su-text-center su-leading su-text-19';
          return <figcaption {...nodeProps}
                             style={{captionSide: 'bottom'}}>{domToReact(domNode.children, options)}</figcaption>
        case 'iframe':
          nodeProps.className += ' su-w-full';
          return <iframe {...nodeProps}/>

        case 'blockquote':
          nodeProps.className += ' su-pl-40 su-relative before:su-block before:su-absolute before:su-left-0 before:su-top-0 before:su-content-[\'\'] before:su-h-full before:su-w-5 before:su-bg-black-20';
          return <blockquote {...nodeProps}>{domToReact(domNode.children, options)}</blockquote>

        case 'table':
          nodeProps.className += ' su-mb-20 ';
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>

        case 'p':
          nodeProps.className += ' su-max-w-[100ch]';
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'span':
        case 'div':
        case 'tr':
        case 'th':
        case 'td':
        case 'ul':
        case 'ol':
        case 'li':
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>
      }
    }
  }
}

const fixClasses = (classes) => {
  classes = ` ${classes} `;
  classes = classes.replace(' align-center ', ' su-center ')
    .replace(' align-left ', ' su-block su-float-left su-mr-20 su-mb-20 ')
    .replace(' align-right ', ' su-block su-float-right su-ml-20 su-mb-20 ')
    .replace(' text-align-center ', ' su-text-center ')
    .replace(' text-align-right ', ' su-text-right ')
    .replace(' su-intro-text ', ' su-text-m2 ')
    .replace(' su-drop-cap ', ' first-letter:su-text-m2 first-letter:su-font-bold ')
    .replace(' su-font-splash ', ' su-text-m4 su-font-bold ')
    .replace(' su-quote-text ', ` before:su-content-['"'] after:su-content-['"'] su-text-m3 su-italic `)
    .replace(' su-related-text ', ' su-shadow-lg su-p-30 ')
    .replace(' su-subheading ', ' su-text-m1 ')
    .replace(' su-callout-text ', ' su-font-bold ')
    .replace(' visually-hidden ', ' su-sr-only ')
    .replace(/ plain-text | caption /g, ' ')
    .replace(' media-entity-wrapper ', ' su-block su-mb-20 ')
    .replace(/tablesaw.*? /g, ' ')
    .replace(/ +/g, ' ')
    .trim();

  classes = classes.split(' ')
    .filter(className => className.length >= 1)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
  return classes;
}

const cleanMediaMarkup = (node: Element) => {
  const wrapperDiv = node.children.find(child => child instanceof Element && child.name === 'div')
  const picture = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'picture')
  let image = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'img')

  // Special handling of video media type.
  if (node.attribs.class.indexOf('media--type-video') >= 0) {
    const iframe = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'iframe')
    // @ts-ignore
    let {src: iframeSrc} = iframe instanceof Element && iframe.attribs;

    iframeSrc = decodeURIComponent(iframeSrc).replace(/^.*url=(.*)?&.*$/, '$1');
    return (
      <div className="su-clear-both su-overflow-hidden su-aspect-[16/9] su-relative">
        <Oembed className="su-h-full su-w-full" url={iframeSrc}/>
      </div>
    );
  }

  if (picture instanceof Element) {
    image = picture.children.find(child => child instanceof Element && child.name === 'img')
  }

  if (image instanceof Element) {
    let {src, alt, width, height} = image.attribs;
    let {class: classes} = node.attribs;

    if (src.substring(0, 1) === '/') {
      src = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + src;
    }

    return (
      <>
        <Conditional showWhen={width && height}>
          <Image
            className={fixClasses(classes)}
            src={src.trim()}
            alt={alt ? alt.trim(): ""}
            height={parseInt(height)}
            width={parseInt(width)}
          />
        </Conditional>

        <Conditional showWhen={!width || !height}>
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
            <Image
              className="su-object-cover su-object-center"
              src={src.trim()}
              alt={alt ? alt.trim(): ""}
              fill={true}
            />
          </div>
        </Conditional>
      </>
    )
  }

  return <>{domToReact(node.children, options)}</>
}

const formatHtml = (html) => parse(html ?? '', options);
export default formatHtml;