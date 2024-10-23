import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Rabbit Hole",
  description: "A simple wiki",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* charset */}
        <meta charSet="UTF-8" />
      </head>
      <body className={` w-screen flex flex-col items-center  `}>
        <div className="max-w-[1800px] w-full  h-full p-8">{children}</div>
      </body>
    </html>
  );
}
