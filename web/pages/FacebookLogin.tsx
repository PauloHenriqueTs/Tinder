import React from "react";
import Layout from "../components/Layout";
import { FacebookLogin } from "../components/view/FacebookLogin";

const Facebook = () => {
  return (
    <Layout title="FacebookLogin page">
      <a href="http://localhost:4000/auth/facebook">
        <FacebookLogin />
      </a>
    </Layout>
  );
};

export default Facebook;
