import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'KRISHINODE: PLATFORM FOR FARMERS , VETS AND GOVERNMENT ORGANISERS',
  description: 'An application for Livestock Health, Digital Animal Passports, AMR Surveillance, MRL Compliance, and Farm-to-Fork Traceability.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background min-h-screen font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
