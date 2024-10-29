"use client"

import {ArrowPathIcon} from "@heroicons/react/20/solid"
import Embed, {defaultProviders} from "react-tiny-oembed"
import {HTMLAttributes} from "react"
import {useIntersectionObserver} from "usehooks-ts"

type Props = HTMLAttributes<HTMLDivElement> & {
  url: string
}

const Oembed = ({url, ...props}: Props) => {
  const {isIntersecting, ref} = useIntersectionObserver({freezeOnceVisible: true})
  const oembedProviders = [
    ...defaultProviders,
    {
      provider_name: "Stanford Digital Repository",
      provider_url: "https://purl.stanford.edu/",
      endpoints: [
        {
          schemes: ["https://purl.stanford.edu/*"],
          url: "https://purl.stanford.edu/embed.{format}",
          discovery: true,
        },
      ],
    },
  ]

  return (
    <div ref={ref} {...props}>
      {isIntersecting && <Embed url={url} LoadingFallbackElement={<Loading />} providers={oembedProviders} />}
    </div>
  )
}

const Loading = () => {
  return (
    <div className="flex h-full w-full items-baseline">
      <ArrowPathIcon className="mx-auto animate-spin self-center" width={30} height={30} />
    </div>
  )
}

export default Oembed
