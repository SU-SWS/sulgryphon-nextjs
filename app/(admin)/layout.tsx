import "../(public)/styles/globals.css"

const RootLayout = async ({children}: { children: React.ReactNode }) => {

  return (
    <html>
    <head/>
    <body>
    {children}
    </body>
    </html>
  )
}
export default RootLayout;
