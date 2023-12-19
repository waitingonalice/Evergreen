import type { AppContext, AppProps } from "next/app";
import "../app.css";

export default function App({ Component, pageProps }: AppContext & AppProps) {
  return <Component {...pageProps} />;
}
