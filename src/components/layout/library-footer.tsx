import Link from "@/components/patterns/elements/drupal-link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import Lockup from "@/components/patterns/lockup"
import {DrupalLinkButton} from "@/components/patterns/link"
import FacebookIcon from "@/components/patterns/icons/FacebookIcon"
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon"
import TwitterIcon from "@/components/patterns/icons/TwitterIcon"
import InstagramIcon from "@/components/patterns/icons/InstagramIcon"
import YoutubeIcon from "@/components/patterns/icons/YoutubeIcon"
import {ReactNode} from "react"

const LibraryFooter = () => {
  return (
    <div className="bg-black-true pb-30 text-white">
      <div className="bg-footer-sprinkles bg-repeat">
        <svg viewBox="0 0 1500 100" aria-hidden={true} className="bg-gradient-to-t from-black-true to-transparent">
          <path d="M1500,0 L1500,100 1200,100 1200,0" className="fill-black-true"></path>
          <path d="M0,0 Q500,10 700,45 Q1200,130 1500,0" stroke="#fff" className="fill-white"></path>
        </svg>
      </div>
      <div className="centered mx-auto mb-50">
        <div className="mx-auto">
          <Lockup whiteText />
        </div>
      </div>

      <div className="centered grid w-full gap-2xl text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
        <div>
          <address className="mb-30">
            557 Escondido Mall
            <br />
            Stanford, CA 94305
          </address>

          <ul className="list-unstyled">
            <li>
              <Link
                className="type-0 text-white no-underline hocus:text-white hocus:underline"
                href="/all-locations-and-hours"
              >
                All locations and hours
                <ArrowRightIcon className="ml-10 inline-block" width={15} />
              </Link>
            </li>
            <li>
              <Link className="type-0 text-white no-underline hocus:text-white hocus:underline" href="/contact-us">
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
        <div>
          <h2 className="type-1 mb-20">Support Stanford Libraries</h2>
          <div className="inline-block md:block">
            <DrupalLinkButton href="/support-stanford-libraries">Donate</DrupalLinkButton>
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
        <FacebookIcon className="text-white transition-all hocus:text-cool-grey" />
        <span className="sr-only">Facebook</span>
      </FooterLink>
      <FooterLink href="#">
        <LinkedInIcon className="text-white transition-all hocus:text-cool-grey" />
        <span className="sr-only">LinkedIn</span>
      </FooterLink>
      <FooterLink href="#">
        <TwitterIcon className="text-white transition-all hocus:text-cool-grey" />
        <span className="sr-only">Twitter</span>
      </FooterLink>
      <FooterLink href="#">
        <InstagramIcon className="text-white transition-all hocus:text-cool-grey" height={30} />
        <span className="sr-only">Instagram</span>
      </FooterLink>
      <FooterLink href="#">
        <YoutubeIcon className="text-white transition-all hocus:text-cool-grey" height={30} />
        <span className="sr-only">Youtube</span>
      </FooterLink>
    </div>
  )
}

const FooterLink = ({href, children}: {href: string; children: ReactNode}) => {
  return (
    <Link className="text-19 font-normal text-white hocus:text-white hocus:no-underline" href={href}>
      {children}
    </Link>
  )
}

export default LibraryFooter
