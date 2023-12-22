import clsx from "clsx";
import type { AppContext, AppProps } from "next/app";
import { Inter } from "next/font/google";
import { App as Providers } from "~/components/app-context";
import "../styles/app.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppContext & AppProps) => (
  <Providers>
    <main className={clsx(inter.className)}>
      <Component {...pageProps} />
    </main>
  </Providers>
);
export default App;
