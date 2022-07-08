import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { NextComponentType } from "next";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </Hydrate>
    </QueryClientProvider>
  );
};
export default MyApp;
