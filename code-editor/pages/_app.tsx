import { QueryClient, QueryClientProvider } from "react-query";
import clsx from "clsx";
import type { AppContext, AppProps } from "next/app";
import { Inter } from "next/font/google";
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
  <QueryClientProvider client={queryClient}>
    <Providers>
      <main className={clsx(inter.className)}>
        <Component {...pageProps} />
      </main>
    </Providers>
  </QueryClientProvider>
);
export default App;
