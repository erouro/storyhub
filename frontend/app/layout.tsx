import '../styles/globals.css'
import Nav from '../components/Nav'

export const metadata = {
  title: 'Story App',
  description: 'Safe story app - placeholder content'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
