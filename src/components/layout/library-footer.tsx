import Link from "@/components/patterns/elements/drupal-link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import Lockup from "@/components/patterns/elements/lockup/lockup"
import FacebookIcon from "@/components/patterns/icons/FacebookIcon"
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon"
import TwitterIcon from "@/components/patterns/icons/TwitterIcon"
import InstagramIcon from "@/components/patterns/icons/InstagramIcon"
import YoutubeIcon from "@/components/patterns/icons/YoutubeIcon"
import {ReactNode} from "react"
import Image from "next/image"

const LibraryFooter = () => {
  return (
    <div className="rs-mt-6 bg-fog-light pb-30 text-black xl:mt-0">
      <div>
        <svg viewBox="0 0 1500 100" aria-hidden={true} className="bg-gradient-to-t from-fog-light to-transparent">
          <path d="M1500,0 L1500,100 1200,100 1200,0" className="fill-fog-light"></path>
          <path d="M0,0 Q500,10 700,45 Q1200,130 1500,0" stroke="#fff" className="fill-white"></path>
        </svg>
      </div>
      <div className="centered relative mb-50 mt-50 flex flex-row justify-between gap-2xl md:mt-0">
        <div>
          <Lockup />
        </div>
        <div className="absolute bottom-40 right-[-5rem] block sm:bottom-0 md:right-[2rem] lg:right-[8rem] xl:hidden">
          <div className="relative h-[18.8rem] w-180 sm:h-[18.5rem] md:h-[20.5rem] md:w-200 lg:h-[28.4rem] lg:w-[27.7rem]">
            <Image src="/footer-nerd-squirrel.png" alt="" fill />
          </div>
        </div>
      </div>

      <div className="centered relative grid w-full gap-2xl text-center md:grid-cols-3 md:text-left xl:grid-cols-4">
        <div>
          <address className="mb-30">
            557 Escondido Mall
            <br />
            Stanford, CA 94305
          </address>

          <ul className="list-unstyled">
            <li>
              <Link
                className="type-0 text-black no-underline hocus:text-black hocus:underline"
                href="/all-locations-and-hours"
              >
                All locations and hours
                <ArrowRightIcon className="ml-10 inline-block" width={15} />
              </Link>
            </li>
            <li>
              <Link className="type-0 text-black no-underline hocus:text-black hocus:underline" href="/contact-us">
                Contact us
                <ArrowRightIcon className="ml-10 inline-block" width={15} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="type-1 mb-20">Who we are</h2>
          <ul className="list-unstyled">
            <li>
              <FooterLink href="/about-us">About us</FooterLink>
            </li>
            <li>
              <FooterLink href="/staff-directory">Staff directory</FooterLink>
            </li>
            <li>
              <FooterLink href="/department-directory">Department directory</FooterLink>
            </li>
            <li>
              <FooterLink href="https://searchworks.stanford.edu/catalog?f%5Bcollection%5D%5B%5D=hn730ks3626">
                Staff publications and research
              </FooterLink>
            </li>
            <li>
              <FooterLink href="https://stanford.joinhandshake.com/login">Student job openings</FooterLink>
            </li>
            <li>
              <FooterLink href="/careers">Careers</FooterLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="type-1 mb-20">Administration</h2>
          <ul className="list-unstyled">
            <li>
              <FooterLink href="/general-policies">General policies</FooterLink>
            </li>
            <li>
              <FooterLink href="/copyright-notice">Copyright notice</FooterLink>
            </li>
            <li>
              <FooterLink href="https://library-status.stanford.edu/">System status</FooterLink>
            </li>
          </ul>
        </div>
        <div className="hidden xl:block">
          <div className="relative h-[28.4rem] w-[27.7rem]">
            <Image src="/footer-nerd-squirrel.png" alt="" fill />
          </div>
        </div>
      </div>
    </div>
  )
}

// Keep in case it decides to be added back.
const _SocialLinks = () => {
  return (
    <div className="mt-50 flex flex-wrap justify-around gap-lg md:flex-nowrap">
      <FooterLink href="#">
        <FacebookIcon className="text-black transition-all hocus:text-cool-grey" />
        <span className="sr-only">Facebook</span>
      </FooterLink>
      <FooterLink href="#">
        <LinkedInIcon className="text-black transition-all hocus:text-cool-grey" />
        <span className="sr-only">LinkedIn</span>
      </FooterLink>
      <FooterLink href="#">
        <TwitterIcon className="text-black transition-all hocus:text-cool-grey" />
        <span className="sr-only">Twitter</span>
      </FooterLink>
      <FooterLink href="#">
        <InstagramIcon className="text-black transition-all hocus:text-cool-grey" height={30} />
        <span className="sr-only">Instagram</span>
      </FooterLink>
      <FooterLink href="#">
        <YoutubeIcon className="text-black transition-all hocus:text-cool-grey" height={30} />
        <span className="sr-only">Youtube</span>
      </FooterLink>
    </div>
  )
}

const FooterLink = ({href, children}: {href: string; children: ReactNode}) => {
  return (
    <Link className="text-19 font-normal text-black hocus:text-black hocus:no-underline" href={href}>
      {children}
    </Link>
  )
}

export default LibraryFooter
