import { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import profilePic from "../public/memoticon.png";

export default function About() {
  return (
    <section>
      <h1>About Me 🥳</h1>
      <div style={{ width: "200px", height: "200px" }}>
        <Image src={profilePic} alt="Profile of SY" layout="responsive" />
      </div>
    </section>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
