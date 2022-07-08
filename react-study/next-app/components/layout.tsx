import Head from "next/head";
import styled from "styled-components";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="Layouts Example" />
      </Head>
      <StMain>{children}</StMain>
    </>
  );
}

const StMain = styled.main`
  display: flex;
  height: calc(100vh-64px);
  background-color: #fff;

  & > section {
    padding: 32px;
  }
`;
