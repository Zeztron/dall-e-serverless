import '../styles/globals.css';
import { Header, PromptInput, ClientProvider } from '@/components';

export const metadata = {
  title: 'AI Image Generator',
  description: 'Built with Next.js 13.2, Dall-E 2, and Chat GPT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>
          {/* Header */}
          <Header />

          {/* Prompt Input */}
          <PromptInput />

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
