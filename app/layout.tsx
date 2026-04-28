import type {Metadata} from 'next';
import { Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Plantify | Potted Elegance',
  description: 'Premium potted plants for your space.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#0c0c0e] text-[#EFEFEF] overflow-x-hidden min-h-[100dvh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
