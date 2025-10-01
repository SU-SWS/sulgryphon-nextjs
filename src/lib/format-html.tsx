import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps} from "html-react-parser"
import Image from "next/image"
import {
  DrupalActionLink,
  DrupalLinkBigButton,
  DrupalLinkButton,
  DrupalLinkSecondaryButton,
  DrupalLocationLink,
} from "@/components/patterns/link"
import Oembed from "@/components/patterns/elements/oembed"
import {twMerge} from "tailwind-merge"
import {ElementType} from "react"
import type {DOMNode} from "html-dom-parser"

const options: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs)
      nodeProps.className = fixClasses(nodeProps.className ?? "")
      const NodeName: ElementType = domNode.name as ElementType

      switch (domNode.name) {
        case "a":
          // Error handle for <a> tags without a href.
          if (!nodeProps.href || nodeProps.href === true) {
            nodeProps.href = "#"
          }
          nodeProps.href = nodeProps.href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? "", "")

          if (nodeProps.className?.includes("button--big")) {
            return (
              <DrupalLinkBigButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children as DOMNode[], options)}
              </DrupalLinkBigButton>
            )
          }

          if (nodeProps.className?.includes("button--secondary")) {
            return (
              <DrupalLinkSecondaryButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children as DOMNode[], options)}
              </DrupalLinkSecondaryButton>
            )
          }

          if (nodeProps.className?.includes("button")) {
            return (
              <DrupalLinkButton href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children as DOMNode[], options)}
              </DrupalLinkButton>
            )
          }

          if (nodeProps.className?.includes("link--action")) {
            return (
              <DrupalActionLink href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children as DOMNode[], options)}
              </DrupalActionLink>
            )
          }

          if (nodeProps.className?.includes("link--location")) {
            return (
              <DrupalLocationLink href={nodeProps.href} {...nodeProps}>
                {domToReact(domNode.children as DOMNode[], options)}
              </DrupalLocationLink>
            )
          }

          nodeProps.className = twMerge(
            "hocus:underline transition-colors hocus:bg-black-10 focus:bg-none hocus:text-cardinal-red active:text-cardinal-red",
            nodeProps.className
          )
          return <a {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</a>
        case "div":
        case "article":
          return cleanMediaMarkup(domNode)

        case "pre":
          nodeProps.className += " whitespace-normal"
          return <pre {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</pre>

        case "figure":
          nodeProps.className = twMerge(
            nodeProps.className,
            "table mb-20",
            nodeProps.className.includes("center") && "*:mx-auto",
            !nodeProps.className.includes("float") && "w-full"
          )
          delete nodeProps.role
          return <figure {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</figure>
        case "figcaption":
          nodeProps.className += " table-caption caption-bottom text-center text-16 font-normal"
          return (
            <figcaption {...nodeProps} style={{captionSide: "bottom"}}>
              {domToReact(domNode.children as DOMNode[], options)}
            </figcaption>
          )
        case "iframe":
          nodeProps.className += " w-full"
          return <iframe {...nodeProps} />

        case "blockquote":
          nodeProps.className +=
            " pl-40 relative before:block before:absolute before:left-0 before:top-0 before:content-[''] before:h-full before:w-5 before:bg-black-20"
          return <blockquote {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</blockquote>

        case "table":
          nodeProps.className += " mb-20 "
          return <NodeName {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</NodeName>

        case "p":
          nodeProps.className += " max-w-[100ch]"
        case "li":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "span":
        case "tr":
        case "th":
        case "td":
        case "ul":
        case "ol":
          return <NodeName {...nodeProps}>{domToReact(domNode.children as DOMNode[], options)}</NodeName>
      }
    }
  },
}

const fixClasses = (classes: string | boolean): string => {
  classes = !classes || classes === true ? "" : classes
  classes = ` ${classes} `
  classes = classes
    .replaceAll(" align-center ", " center ")
    .replaceAll(" align-left ", " block float-left mr-20 mb-20 ")
    .replaceAll(" align-right ", " block float-right ml-20 mb-20 ")
    .replaceAll(" text-align-center ", " text-center ")
    .replaceAll(" text-align-right ", " text-right ")
    .replaceAll(" su-intro-text ", " type-2 ")
    .replaceAll(" su-drop-cap ", " first-letter:type-2 first-letter:font-bold ")
    .replaceAll(" su-font-splash ", " type-4 font-bold ")
    .replaceAll(" su-quote-text ", ` before:content-['"'] after:content-['"'] type-3 italic `)
    .replaceAll(" su-related-text ", " shadow-lg p-30 ")
    .replaceAll(" su-subheading ", " type-1 ")
    .replaceAll(" su-callout-text ", " font-bold ")
    .replaceAll(" visually-hidden ", " sr-only ")
    .replace(/ plain-text | caption /g, " ")
    .replaceAll(" media-entity-wrapper ", " block mb-20 ")
    .replace(/tablesaw.*? /g, " ")
    .replace(/ +/g, " ")
    .trim()

  classes = classes
    .split(" ")
    .filter(className => className.length >= 1)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(" ")
  return classes
}

const cleanMediaMarkup = (node: Element) => {
  const getOembedUrl = (node: Element): string | undefined => {
    const src = node.attribs?.src || node.attribs["data-src"]
    if (src?.includes("/media/oembed")) {
      return decodeURIComponent(src.replace(/^.*url=(.*)$/, "$1")).replace(/&.*$/, "")
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          const url: string | undefined = getOembedUrl(child)
          if (url) return url
        }
      }
    }
  }

  // Special handling of Oembeds
  const oembedUrl = getOembedUrl(node)
  if (oembedUrl) {
    return <Oembed url={oembedUrl} />
  }

  const findIframeInMedia = (item: Element): Element | undefined => {
    const iframe = item.children?.find(child => child instanceof Element && child.name === "iframe")
    if (iframe) return iframe as Element
    for (let i = 0; i <= item.children?.length; i++) {
      const childIframe = findIframeInMedia(item.children[i] as Element)
      if (childIframe) return childIframe
    }
  }

  const wrapperDiv = node.children?.find(child => child instanceof Element && child.name === "div")
  const picture =
    wrapperDiv instanceof Element &&
    wrapperDiv.children?.find(child => child instanceof Element && child.name === "picture")
  let image =
    wrapperDiv instanceof Element &&
    wrapperDiv.children?.find(child => child instanceof Element && child.name === "img")

  // Special handling of video media type.
  if (node.attribs.className?.includes("media--type-video")) {
    // const iframe = wrapperDiv instanceof Element && wrapperDiv.children.find(child => child instanceof Element && child.name === 'iframe')
    const iframe = findIframeInMedia(node)

    // @ts-expect-error Ignore this because it's a special attribute for lazy loading oembed videos.
    let {"data-src": iframeSrc} = iframe && iframe.attribs
    iframeSrc = decodeURIComponent(iframeSrc).replace(/^.*url=(.*)?&.*$/, "$1")
    return (
      <div className="relative clear-both aspect-[16/9] overflow-hidden">
        <Oembed className="h-full w-full" url={iframeSrc} />
      </div>
    )
  }

  if (picture instanceof Element) {
    image = picture.children?.find(child => child instanceof Element && child.name === "img")
  }

  if (image instanceof Element) {
    let {src} = image.attribs
    const {alt, width, height} = image.attribs
    const {class: classes} = node.attribs

    if (src.substring(0, 1) === "/") {
      src = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + src
    }

    return (
      <>
        {width && height && (
          <Image
            className={fixClasses(classes)}
            src={src.trim()}
            alt={alt ? alt.trim() : ""}
            height={parseInt(height)}
            width={parseInt(width)}
          />
        )}

        {(!width || !height) && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              className="object-cover object-center"
              src={src.trim()}
              alt={alt ? alt.trim() : ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
            />
          </div>
        )}
      </>
    )
  }

  return <>{domToReact(node.children as DOMNode[], options)}</>
}

const formatHtml = (html?: string) => parse(html ?? "", options)
export default formatHtml
