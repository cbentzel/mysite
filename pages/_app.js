import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Script
        id="cloudflare-web-analytics"
        strategy="afterInteractive"
        type="module"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "72db2e576feb4174823cbddce4861144"}'
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
