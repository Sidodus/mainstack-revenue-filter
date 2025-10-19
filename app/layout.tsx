import "./styles/bootstrap.scss";
import "./styles/globals.scss";
import config from "./config";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ReduxProvider from "./redux/ReduxProvider";
import DataProvider from "./Components/DataProvider";

const degular = localFont({
  src: "../public/assets/fonts/DegularVariable.ttf",
  variable: "--font-degular",
});

export const metadata: Metadata = {
  title: {
    default: "Mainstack Revenue Filter",
    template: "%s | Mainstack Revenue Filter",
  },
  description:
    "This is a revenue filter app for Mainstack that helps you filter out the revenue from your data.",
  keywords: [
    "Mainstack",
    "Revenue Filter",
    "Revenue Filter App",
    "Data Filtering",
    "Mainstack App",
    "Business Tools",
    "Data Analysis",
    "Revenue Management",
    "Financial Tools",
    "Mainstack Services",
  ],
  authors: [
    {
      name: "Saheed Odulaja",
      url: "https://mainstack-revenue-filter-nine.vercel.app/",
    },
  ],
  creator: "Saheed Odulaja",
  publisher: "Saheed Odulaja",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "es-ES": "/es-ES",
    },
  },
  category: "business",
  classification: "Business Services",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest",
  // icons: {
  //   icon: [
  //     { url: "/favicon/favicon.ico", sizes: "any" },
  //     { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //     {
  //       url: "/favicon/android-chrome-192x192.png",
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/android-chrome-512x512.png",
  //       sizes: "512x512",
  //       type: "image/png",
  //     },
  //   ],
  //   apple: [
  //     {
  //       url: "/favicon/apple-touch-icon.png",
  //       sizes: "180x180",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-152x152.png",
  //       sizes: "152x152",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-144x144.png",
  //       sizes: "144x144",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-120x120.png",
  //       sizes: "120x120",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-114x114.png",
  //       sizes: "114x114",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-76x76.png",
  //       sizes: "76x76",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-72x72.png",
  //       sizes: "72x72",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-60x60.png",
  //       sizes: "60x60",
  //       type: "image/png",
  //     },
  //     {
  //       url: "/favicon/apple-touch-icon-57x57.png",
  //       sizes: "57x57",
  //       type: "image/png",
  //     },
  //   ],
  //   other: [
  //     {
  //       rel: "mask-icon",
  //       url: "/favicon/safari-pinned-tab.svg",
  //       color: "#000000",
  //     },
  //     {
  //       rel: "shortcut icon",
  //       url: "/favicon/favicon.ico",
  //     },
  //   ],
  // },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mainstack Revenue Filter",
  },
  applicationName: "Mainstack Revenue Filter",
  appLinks: {
    web: {
      url: `${config.appUrl}`,
      should_fallback: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

import Header from "./Components/Layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${degular.variable}`}>
        <ReduxProvider>
          <DataProvider />
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
