// app/layout.tsx
import type { Metadata } from "next";
import './globals.css';
import Header from "@/components/Header"; // Import the Header component

export const metadata: Metadata = {
  title: "StoryBit Streaming Dashboard Clone",
  description: "A Next.js 14 App Router movie dashboard clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen pt-[64px]">
        {/* Fixed Header */}
        <Header />

        {/* Main content area */}
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
