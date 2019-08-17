import React from "react";
import { FacebookLogin } from "../components/view/FacebookLogin";
import { MyContext } from "../interfaces/MyContext";

const Facebook = (props: any) => {
  const url = `${props.env.BACK_END_URL}/auth/facebook`;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <a href={url}>
          <FacebookLogin />
        </a>
      </div>
    </div>
  );
};
Facebook.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  return { env: process.env };
};

export default Facebook;
