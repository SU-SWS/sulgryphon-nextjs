import {PreviewAlert} from "@/components/preview-alert"
import {IdentityBar} from "@/components/patterns/identity-bar";
import {Header} from "@/components/header";
import {GlobalFooter} from "@/components/patterns/global-footer";
import {DrupalLink} from "@/components/simple/link";

export const PageLayout = ({...props}) => {

  return (
    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        <DrupalLink className="su-skiplink" href="#main-content">Skip to main content</DrupalLink>
        <PreviewAlert/>
        <IdentityBar/>
        <Header/>
        {props.children}
      </div>

      <div className="su-row-start-2 su-row-end-3">
        <GlobalFooter/>
      </div>
    </div>

  )

}
