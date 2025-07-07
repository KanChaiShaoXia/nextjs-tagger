export const metadata = {
  title: 'NextJS Tagger Example',
  description: 'Example demonstrating the nextjs-tagger plugin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress all hydration warnings in development
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                const originalWarn = console.warn;
                
                console.error = function(message, ...args) {
                  if (typeof message === 'string' && 
                      (message.includes('Hydration failed') ||
                       message.includes('hydrated but some attributes') ||
                       message.includes('data-wb-id') ||
                       message.includes('data-atm-ext') ||
                       message.includes('chrome-extension'))) {
                    return;
                  }
                  originalError.call(console, message, ...args);
                };
                
                console.warn = function(message, ...args) {
                  if (typeof message === 'string' && 
                      (message.includes('Hydration') ||
                       message.includes('data-wb-id'))) {
                    return;
                  }
                  originalWarn.call(console, message, ...args);
                };
              }
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}