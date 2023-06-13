import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import Lockup from "@/components/patterns/lockup";
import {DrupalLinkButton} from "@/components/patterns/link";
import FacebookIcon from "@/components/patterns/icons/FacebookIcon";
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon";
import TwitterIcon from "@/components/patterns/icons/TwitterIcon";
import InstagramIcon from "@/components/patterns/icons/InstagramIcon";
import YoutubeIcon from "@/components/patterns/icons/YoutubeIcon";
import {ReactNode} from "react";

const LibraryFooter = () => {
  return (
    <div className="su-bg-black-true su-text-white su-pb-30">
      <div className="su-bg-footer-sprinkles su-bg-repeat">
        <svg viewBox="0 0 1500 100" aria-hidden={true}
             className="su-bg-gradient-to-t su-from-black-true su-to-transparent">
          <path d="M1500,0 L1500,100 1200,100 1200,0" className="su-fill-black-true"></path>
          <path d="M0,0 Q500,10 700,45 Q1200,130 1500,0" stroke="#fff" className="su-fill-white"></path>
        </svg>
      </div>
      <div className="su-centered su-mb-50 su-mx-auto">
        <div className="su-mx-auto"><Lockup whiteText/></div>
      </div>

      <div
        className="su-centered su-grid md:su-grid-cols-2 lg:su-grid-cols-4 su-w-full su-gap-2xl su-text-center md:su-text-left">
        <div>
          <address className="su-mb-30">
            557 Escondido Mall<br/>
            Stanford, CA 94305
          </address>

          <ul className="su-list-unstyled">
            <li><Link className="su-text-m0 su-text-white hover:su-text-white su-no-underline hover:su-underline"
                      href="/library-hours-and-locations">All locations and hours<ArrowRightIcon className="su-inline-block su-ml-10" width={15}/></Link>
            </li>
            <li><Link className="su-text-m0 su-text-white hover:su-text-white su-no-underline hover:su-underline"
                      href="/contact-us">Contact us<ArrowRightIcon className="su-inline-block su-ml-10" width={15}/></Link></li>
          </ul>
        </div>
        <div>
          <h2 className="su-text-m0 su-mb-20">Who we are</h2>
          <ul className="su-list-unstyled">
            <li><FooterLink href="/about-us">About Us</FooterLink></li>
            <li><FooterLink href="/department-directory">Department directory</FooterLink></li>
            <li><FooterLink href="https://searchworks.stanford.edu/catalog?f%5Bcollection%5D%5B%5D=hn730ks3626">Staff publications and research</FooterLink></li>
            <li><FooterLink href="https://stanford.joinhandshake.com/login">Student job openings</FooterLink></li>
            <li><FooterLink href="/career-search">Careers</FooterLink></li>
          </ul>
        </div>
        <div>
          <h2 className="su-text-m1 su-mb-20">Administration</h2>
          <ul className="su-list-unstyled">
            <li><FooterLink href="/general-policies">General Policies</FooterLink></li>
            <li><FooterLink href="copyright-notice">Copyright notice</FooterLink></li>
            <li><FooterLink href="https://library-status.stanford.edu/">System status</FooterLink></li>
          </ul>
        </div>
        <div>
          <h2 className="su-text-m1 su-mb-20">Support Stanford Libraries</h2>
          <div className="su-inline-block md:su-block">
            <DrupalLinkButton href="/support-stanford-libraries">Donate</DrupalLinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const SocialLinks = () => {
  return (
    <div className="su-flex su-flex-wrap md:su-flex-nowrap su-mt-50 su-gap-lg su-justify-around">
      <FooterLink href="#">
        <FacebookIcon className="su-transition-all su-text-white hocus:su-text-cool-grey"/>
        <span className="su-sr-only">Facebook</span>
      </FooterLink>
      <FooterLink href="#">
        <LinkedInIcon className="su-transition-all su-text-white hocus:su-text-cool-grey"/>
        <span className="su-sr-only">LinkedIn</span>
      </FooterLink>
      <FooterLink href="#">
        <TwitterIcon className="su-transition-all su-text-white hocus:su-text-cool-grey"/>
        <span className="su-sr-only">Twitter</span>
      </FooterLink>
      <FooterLink href="#">
        <InstagramIcon className="su-transition-all su-text-white hocus:su-text-cool-grey" height={30}/>
        <span className="su-sr-only">Instagram</span>
      </FooterLink>
      <FooterLink href="#">
        <YoutubeIcon className="su-transition-all su-text-white hocus:su-text-cool-grey" height={30}/>
        <span className="su-sr-only">Youtube</span>
      </FooterLink>
    </div>
  )
}

const FooterLink = ({href, children}: { href: string, children: ReactNode }) => {
  return (
    <Link className="su-font-normal su--text-m1 su-text-white hover:su-text-white hocus:su-no-underline" href={href}>
      {children}
    </Link>
  )
}

export default LibraryFooter;