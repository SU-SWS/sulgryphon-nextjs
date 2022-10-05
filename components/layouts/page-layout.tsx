import {PreviewAlert} from "@/components/preview-alert"
import {IdentityBar} from "@/components/patterns/identity-bar";
import {Header} from "@/components/header";
import {GlobalFooter} from "@/components/patterns/global-footer";


export const PageLayout = ({...props}) => {

  return (
    <>
      <PreviewAlert/>
      <div>
        <IdentityBar/>
        <Header/>
        {props.children}
        <GlobalFooter/>
      </div>
    </>
  )

}
