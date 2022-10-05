import {HTMLReactParserOptions, domToReact} from "html-react-parser"
import parse from "html-react-parser"
import {Element} from "domhandler/lib/node"

import {DrupalLink, DrupalLinkBigButton, DrupalLinkButton, DrupalLinkSecondaryButton} from "@/components/simple/link";
import {DrupalImage} from "@/components/simple/image";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      let {class: classes, href, src, alt, width, height} = domNode.attribs;
      if (!classes) {
        classes = '';
      }

      classes = ` ${classes} `;
      classes = classes.replace(' align-center ', ' su-center ')
        .replace(' align-left ', ' su-block su-float-left ')
        .replace(' align-right ', ' su-block su-float-right ')
        .replace(' text-align-center ', ' su-text-center ')
        .replace(' su-intro-text ', ' su-text-[30px] ')
        .replace(' su-drop-cap ', ' first-letter:su-text-[35px] first-letter:su-font-bold ')
        .replace(' su-font-splash ', ' su-text-[46px] su-font-bold ')
        .replace(' su-quote-text ', ` before:su-content-['"'] after:su-content-['"'] su-text-[37px] su-italic `)
        .replace(' su-related-text ', ' su-shadow-lg su-p-30 ')
        .replace(' su-subheading ', ' su-text-[25px] ')
        .replace(' su-callout-text ', ' su-font-bold ')
        .replace(/ plain-text | caption /, ' ')
        .trim();

      classes = classes.split(' ')
        .filter(className => className.length >= 1)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(' ');

      switch (domNode.name) {
        case "a":
          if (!href) {
            href = '#';
          }
          if (classes?.indexOf('su-button--big') > -1) {
            return (
              <DrupalLinkBigButton href={href} className={classes}>
                {domToReact(domNode.children, options)}
              </DrupalLinkBigButton>
            )
          }

          if (classes?.indexOf('su-button--secondary') > -1) {
            return (
              <DrupalLinkSecondaryButton href={href} className={classes}>
                {domToReact(domNode.children, options)}
              </DrupalLinkSecondaryButton>
            )
          }

          if (classes?.indexOf('su-button') > -1) {
            return <DrupalLinkButton href={href}
                                     className={classes}>{domToReact(domNode.children, options)}</DrupalLinkButton>
          }

          return (
            <DrupalLink href={href} className={classes}>
              {domToReact(domNode.children, options)}
            </DrupalLink>
          )

        case "img":
          return <DrupalImage src={src} alt={alt} width={width ?? 100} height={height ?? 100}/>

        case 'div':
          if (classes.includes('media')) {
            return <>{domToReact(domNode.children, options)}</>;
          }
          return <div className={classes}>{domToReact(domNode.children, options)}</div>

        case 'picture':
        case 'source':
          return <>{domToReact(domNode.children, options)}</>;

        case 'p':
          classes = classes + ' su-max-w-[100ch]';
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'span':
          let NodeName = domNode.name
          return <NodeName className={classes}>{domToReact(domNode.children, options)}</NodeName>
      }
    }
  },
}

const formatHtml = (html) => parse(html ?? '', options);
export default formatHtml;