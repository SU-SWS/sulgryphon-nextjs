import Link from "@/components/patterns/elements/drupal-link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import Lockup from "@/components/patterns/lockup";
import {DrupalLinkButton} from "@/components/patterns/link";
import FacebookIcon from "@/components/patterns/icons/FacebookIcon";
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon";
import TwitterIcon from "@/components/patterns/icons/TwitterIcon";
import InstagramIcon from "@/components/patterns/icons/InstagramIcon";
import YoutubeIcon from "@/components/patterns/icons/YoutubeIcon";
import {ReactNode} from "react";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";

const LibraryFooter = () => {
  return (
    <div className="bg-black-true text-white pb-30">
      <div className="bg-footer-sprinkles bg-repeat">
        <svg viewBox="0 0 1500 100" aria-hidden={true} className="bg-gradient-to-t from-black-true to-transparent">
          <path d="M1500,0 L1500,100 1200,100 1200,0" className="fill-black-true"></path>
          <path d="M0,0 Q500,10 700,45 Q1200,130 1500,0" stroke="#fff" className="fill-white"></path>
        </svg>
      </div>
      <div className="centered mb-50 mx-auto">
        <div className="mx-auto"><Lockup whiteText/></div>
      </div>

      <div
        className="centered grid md:grid-cols-2 lg:grid-cols-4 w-full gap-2xl text-center md:text-left">
        <div>
          <address className="mb-30">
            557 Escondido Mall<br/>
            Stanford, CA 94305
          </address>

          <ul className="list-unstyled">
            <li><Link className="text-m0 text-white hocus:text-white no-underline hocus:underline"
                      href="/all-locations-and-hours">All locations and hours<ArrowRightIcon className="inline-block ml-10" width={15}/></Link>
            </li>
            <li><Link className="text-m0 text-white hocus:text-white no-underline hocus:underline"
                      href="/contact-us">Contact us<ArrowRightIcon className="inline-block ml-10" width={15}/></Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-m0 mb-20">Who we are</h2>
          <ul className="list-unstyled">
            <li><FooterLink href="/about-us">About us</FooterLink></li>
            <li><FooterLink href="/staff-directory">Staff directory</FooterLink></li>
            <li><FooterLink href="/department-directory">Department directory</FooterLink></li>
            <li><FooterLink href="https://searchworks.stanford.edu/catalog?f%5Bcollection%5D%5B%5D=hn730ks3626">Staff publications and research</FooterLink></li>
            <li><FooterLink href="https://stanford.joinhandshake.com/login">Student job openings</FooterLink></li>
            <li><FooterLink href="https://stanford.referrals.selectminds.com/page/university-libraries-855">Careers</FooterLink></li>
          </ul>
        </div>
        <div>
          <h2 className="text-m1 mb-20">Administration</h2>
          <ul className="list-unstyled">
            <li><FooterLink href="/general-policies">General policies</FooterLink></li>
            <li><FooterLink href="/copyright-notice">Copyright notice</FooterLink></li>
            <li><FooterLink href="https://library-status.stanford.edu/">System status</FooterLink></li>
          </ul>
        </div>
        <div>
          <h2 className="text-m1 mb-20">Support Stanford Libraries</h2>
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
    <div className="flex flex-wrap md:flex-nowrap mt-50 gap-lg justify-around">
      <FooterLink href="#">
        <FacebookIcon className="transition-all text-white hocus:text-cool-grey"/>
        <span className="sr-only">Facebook</span>
      </FooterLink>
      <FooterLink href="#">
        <LinkedInIcon className="transition-all text-white hocus:text-cool-grey"/>
        <span className="sr-only">LinkedIn</span>
      </FooterLink>
      <FooterLink href="#">
        <TwitterIcon className="transition-all text-white hocus:text-cool-grey"/>
        <span className="sr-only">Twitter</span>
      </FooterLink>
      <FooterLink href="#">
        <InstagramIcon className="transition-all text-white hocus:text-cool-grey" height={30}/>
        <span className="sr-only">Instagram</span>
      </FooterLink>
      <FooterLink href="#">
        <YoutubeIcon className="transition-all text-white hocus:text-cool-grey" height={30}/>
        <span className="sr-only">Youtube</span>
      </FooterLink>

      {isDraftMode() &&
        <Link className="sr-only" href="/api/draft/disable" prefetch>
          Disable Draft Mode
        </Link>
      }
    </div>
  )
}

const FooterLink = ({href, children}: { href: string, children: ReactNode }) => {
  return (
    <Link className="font-normal -text-m1 text-white hocus:text-white hocus:no-underline" href={href}>
      {children}
    </Link>
  )
}

export default LibraryFooter;
