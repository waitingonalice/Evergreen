import { QueryClient, QueryClientProvider } from "react-query";
import clsx from "clsx";
import type { AppContext, AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { App as Providers } from "~/components/app-context";
import "../styles/app.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const inter = Inter({ subsets: ["latin"] });
const App = ({ Component, pageProps }: AppContext & AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=1280, initial-scale=1.0" />
      <title>Code Editor</title>
      <link rel="icon" href="/code-bracket.svg" />
    </Head>
    <QueryClientProvider client={queryClient}>
      <Providers>
        <main className={clsx(inter.className)}>
          <Component {...pageProps} />
        </main>
      </Providers>
    </QueryClientProvider>
  </>
);
export default App;
