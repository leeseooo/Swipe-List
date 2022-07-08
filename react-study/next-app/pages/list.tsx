import { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import styled from "styled-components";
import SwipeableList from "../components/SwipeableList";

export default function List() {
  return (
    <StWrapper>
      <SwipeableList />
    </StWrapper>
  );
}

List.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* <Sidebar /> */}
      {page}
    </Layout>
  );
};
const StWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
`;
