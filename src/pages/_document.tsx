import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="bg-stone-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
