import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../src/store";
import Layout from "../components/layout/layout";
function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
