import Layout from "@/components/layout";
// ACA Agregar tmabien los scss
import "@/styles/globals.css";
import "@/styles/ProductBar.scss";
import "@/styles/LiTicketForAProduct.scss";
import "@/styles/buttonAgregarTicket.scss";
import "@/styles/FormTicket.scss";

import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";

//Este es el main desde aca llamamos TODO
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
