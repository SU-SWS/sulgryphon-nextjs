import "../styles/globals.css"

import Editori11y from "@/components/editori11y";
import {ReactNode} from "react";

const RootLayout = ({children, modal}: { children: ReactNode, modal: ReactNode }) => {

  return (
    <html lang="en">
    <Editori11y/>
    <body>
    <nav>
      <a className="su-skiplink" href="#main-content">Skip to main content</a>
    </nav>
    {children}
    {modal}
    </body>
    </html>
  )
}
export default RootLayout;
