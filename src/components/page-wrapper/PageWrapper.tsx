import Head from "next/head";

import EmptyPage from "../empty-page/EmptyPage";
import Footer from "../footer/Footer";

import { Wrapper, ContentWrapper } from "./PageWrapper.styles";
import type { PropTypes } from "./PageWrapper.types";

export default function PageWrapper(props: React.PropsWithChildren<PropTypes>) {
  const { title = "LetsGetChecked Challenge" } = props;

  return (
    <Wrapper>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ContentWrapper>{props.children ?? <EmptyPage />}</ContentWrapper>
      </main>
      <Footer />
    </Wrapper>
  );
}
