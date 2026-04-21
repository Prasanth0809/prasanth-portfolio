import 'css/tailwind.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prasanth Panneer Selvam – Azure Cloud Engineer',
  description:
    'Azure Cloud Engineer based in Bengaluru. Building secure, monitored, and well-governed cloud environments. Microsoft AZ-900 Certified.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0, background: '#090909' }}>
        {children}
      </body>
    </html>
  )
}