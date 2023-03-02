import LibraryFooter from "./components/layout/library-footer";
import GlobalFooter from "./components/layout/global-footer";
import Header from "./components/layout/header";
import "./styles/globals.css"

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html>
    <head/>
    <body>

    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        <a className="su-skiplink" href="#main-content">Skip to main content</a>
        <Header/>

        <div>
          {children}
        </div>
      </div>

      <footer className="su-row-start-2 su-row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>
    </body>
    </html>
  )
}
