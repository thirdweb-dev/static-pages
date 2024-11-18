import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { PropsWithChildren } from "react";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Thirdweb",
    template: "%s | Thirdweb",
  },
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en" className="h-full bg-background text-foreground">
      <body className="flex flex-col h-full">
        <div className="fixed left-1/2 w-600 h-350 -translate-1/2 bg-gradient-radial pointer-events-none" />
        {children}
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
