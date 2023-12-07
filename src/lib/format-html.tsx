import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps} from "html-react-parser"
import Conditional from "@/components/utils/conditional";
import Image from "next/image";
import {
  DrupalActionLink,
  DrupalLinkBigButton,
  DrupalLinkButton,
  DrupalLinkSecondaryButton
} from "@/components/patterns/link";
import Oembed from "@/components/patterns/elements/oembed";
import {twMerge} from "tailwind-merge";
import {ElementType} from "react";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs);
      nodeProps.className = fixClasses(nodeProps.className ?? '');
      let NodeName: ElementType = domNode.name as ElementType

      switch (domNode.name) {
        case "a":
          // Error handle for <a> tags without a href.
          if (!nodeProps.href) {
            nodeProps.href = '#';
          }
          nodeProps.href = nodeProps.href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '', '');

          if (nodeProps.className.indexOf('button--big') > -1) {
            return (
              <DrupalLinkBigButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkBigButton>
            )
          }

          if (nodeProps.className.indexOf('button--secondary') > -1) {
            return (
              <DrupalLinkSecondaryButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkSecondaryButton>
            )
          }

          if (nodeProps.className.indexOf('button') > -1) {
            return (
              <DrupalLinkButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalLinkButton>
            )
          }

          if (nodeProps.className.indexOf('link--action') > -1) {
            return (
              <DrupalActionLink href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children, options)}
              </DrupalActionLink>
            )
          }

          nodeProps.className = twMerge('hocus:underline transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red', nodeProps.className);
          return (
            <a {...nodeProps}>
              {domToReact(domNode.children, options)}
            </a>
          )
        case 'article':
          return cleanMediaMarkup(domNode);

        case 'pre':
          nodeProps.className += ' whitespace-normal';
          return <pre {...nodeProps}>{domToReact(domNode.children, options)}</pre>

        case 'figure':
          nodeProps.className += ' table mb-20';
          delete nodeProps.role;
          return (
            <figure {...nodeProps}>{domToReact(domNode.children, options)}</figure>
          )
        case 'figcaption':
          nodeProps.className += ' table-caption caption-bottom text-center leading text-19';
          return <figcaption {...nodeProps}
                             style={{captionSide: 'bottom'}}>{domToReact(domNode.children, options)}</figcaption>
        case 'iframe':
          nodeProps.className += ' w-full';
          return <iframe {...nodeProps}/>

        case 'blockquote':
          nodeProps.className += ' pl-40 relative before:block before:absolute before:left-0 before:top-0 before:content-[\'\'] before:h-full before:w-5 before:bg-black-20';
          return <blockquote {...nodeProps}>{domToReact(domNode.children, options)}</blockquote>

        case 'table':
          nodeProps.className += ' mb-20 ';
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>

        case 'p':
          nodeProps.className += ' max-w-[100ch]';
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
  classes = classes.replace(' align-center ', ' center ')
    .replace(' align-left ', ' block float-left mr-20 mb-20 ')
    .replace(' align-right ', ' block float-right ml-20 mb-20 ')
    .replace(' text-align-center ', ' text-center ')
    .replace(' text-align-right ', ' text-right ')
    .replace(' su-intro-text ', ' text-m2 ')
    .replace(' su-drop-cap ', ' first-letter:text-m2 first-letter:font-bold ')
    .replace(' su-font-splash ', ' text-m4 font-bold ')
    .replace(' su-quote-text ', ` before:content-['"'] after:content-['"'] text-m3 italic `)
    .replace(' su-related-text ', ' shadow-lg p-30 ')
    .replace(' su-subheading ', ' text-m1 ')
    .replace(' su-callout-text ', ' font-bold ')
    .replace(' visually-hidden ', ' sr-only ')
    .replace(/ plain-text | caption /g, ' ')
    .replace(' media-entity-wrapper ', ' block mb-20 ')
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

  const findIframeInMedia = (item: Element) => {
    const iframe = item.children.find(child => child instanceof Element && child.name === 'iframe')
    if (iframe) return iframe;
    for (let i = 0; i <= item.children.length; i++) {
      const childIframe = findIframeInMedia(item.children[i])
      if (childIframe) return childIframe;
    }
  }

  const wrapperDiv = node.children.find(child => child instanceof Element && child.name === 'div')
  const picture = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'picture')
  let image = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'img')

  // Special handling of video media type.
  if (node.attribs.class.indexOf('media--type-video') >= 0) {
    // const iframe = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'iframe')
    const iframe = findIframeInMedia(node);

    // @ts-ignore
    let {"data-src": iframeSrc} = iframe && iframe.attribs;
    iframeSrc = decodeURIComponent(iframeSrc).replace(/^.*url=(.*)?&.*$/, '$1');
    return (
      <div className="clear-both overflow-hidden aspect-[16/9] relative">
        <Oembed className="h-full w-full" url={iframeSrc}/>
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
            alt={alt ? alt.trim() : ""}
            height={parseInt(height)}
            width={parseInt(width)}
          />
        </Conditional>

        <Conditional showWhen={!width || !height}>
          <div className="overflow-hidden aspect-[16/9] relative">
            <Image
              className="object-cover object-center"
              src={src.trim()}
              alt={alt ? alt.trim() : ""}
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