import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps} from "html-react-parser"

import {DrupalLink, DrupalLinkBigButton, DrupalLinkButton, DrupalLinkSecondaryButton} from "@/components/simple/link";
import {DrupalImage} from "@/components/simple/image";
import Oembed from "@/components/simple/oembed";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs);
      nodeProps.className = fixClasses(nodeProps.className ?? '');

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

          return (
            <DrupalLink href={nodeProps.href} {...nodeProps}>
              {domToReact(domNode.children, options)}
            </DrupalLink>
          )
        case 'article':
          return cleanMediaMarkup(domNode);

        case 'pre':
          nodeProps.className += ' su-whitespace-normal';
          return <pre {...nodeProps}>{domToReact(domNode.children, options)}</pre>

        case 'figure':
          nodeProps.className += ' su-table su-mb-20';
          return (
            <figure {...nodeProps}>{domToReact(domNode.children, options)}</figure>
          )
        case 'figcaption':
          nodeProps.className += ' su-table-caption su-text-center';
          return <figcaption {...nodeProps}
                             style={{captionSide: 'bottom'}}>{domToReact(domNode.children, options)}</figcaption>
        case 'iframe':
          nodeProps.className += ' su-w-full';
          return <iframe {...nodeProps}/>

        case 'p':
          nodeProps.className += ' su-max-w-[100ch]';
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'span':
        case 'div':
        case 'table':
        case 'tr':
        case 'th':
        case 'td':
        case 'ul':
        case 'ol':
        case 'li':
          let NodeName = domNode.name
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>
      }
    }
  }
}

const fixClasses = (classes) => {
  classes = ` ${classes} `;
  classes = classes.replace(' align-center ', ' su-center ')
    .replace(' align-left ', ' su-block su-float-left su-mr-20 ')
    .replace(' align-right ', ' su-block su-float-right su-ml-20 ')
    .replace(' text-align-center ', ' su-text-center ')
    .replace(' text-align-right ', ' su-text-right ')
    .replace(' su-intro-text ', ' su-text-[30px] ')
    .replace(' su-drop-cap ', ' first-letter:su-text-[35px] first-letter:su-font-bold ')
    .replace(' su-font-splash ', ' su-text-[46px] su-font-bold ')
    .replace(' su-quote-text ', ` before:su-content-['"'] after:su-content-['"'] su-text-[37px] su-italic `)
    .replace(' su-related-text ', ' su-shadow-lg su-p-30 ')
    .replace(' su-subheading ', ' su-text-[25px] ')
    .replace(' su-callout-text ', ' su-font-bold ')
    .replace(' visually-hidden ', ' su-sr-only ')
    .replace(/ plain-text | caption /g, ' ')
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

    return (
      <span className={fixClasses(classes)}>
        <DrupalImage
          className="su-block"
          src={src}
          alt={alt}
          height={height}
          width={width}
          layout="intrinsic"
        />
      </span>
    )
  }

  return <>{domToReact(node.children, options)}</>
}

const formatHtml = (html) => parse(html ?? '', options);
export default formatHtml;