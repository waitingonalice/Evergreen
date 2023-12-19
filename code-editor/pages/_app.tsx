import type { AppContext, AppProps } from "next/app";
import { App as Providers } from "~/components/app-context";
import "../styles/app.css";

const App = ({ Component, pageProps }: AppContext & AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);
export default App;
