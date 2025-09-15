"use client"
import Image from "next/image"
import {usePathname} from "next/navigation"

const HomePageSquirrel = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  if (!isHomePage) return null

  return (
    <div className="absolute bottom-50 right-[-5rem] block @3xl:right-[-3rem] @5xl:bottom-0 @5xl:right-[2rem] @8xl:right-[8rem]">
      <div className="relative h-[18.5rem] w-180 @5xl:h-[20.5rem] @5xl:w-200 @8xl:h-[23.6rem] @8xl:w-[23rem]">
        <Image
          src="/footer-nerd-squirrel.png"
          alt=""
          className="object-contain"
          fill
          sizes="(max-width: 300px) 100vw, 300px"
        />
      </div>
    </div>
  )
}

export default HomePageSquirrel
