import PreviewAlert from "@/components/preview-alert"
import IdentityBar from "@/components/patterns/identity-bar";
import Header from "@/components/header";
import GlobalFooter from "@/components/patterns/global-footer";
import LibraryFooter from "@/components/patterns/library-footer";

export const PageLayout = ({...props}) => {

  return (
    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        <a className="su-skiplink" href="#main-content">Skip to main content</a>
        <PreviewAlert/>
        <IdentityBar/>
        <Header/>

        <div>
          {props.children}
        </div>
      </div>

      <footer className="su-row-start-2 su-row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>
  )
}
